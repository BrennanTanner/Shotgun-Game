import {
   loadAudio,
   loadImages,
   loadSpriteSheets,
} from '../util/preloadFunctions.mjs';
import {
   createAnimations,
   createAudio,
   createCamera,
   createGroups,
   createLevel,
   createPlayer,
   createCounter,
} from '../util/createFunctions.mjs';

class PlayGame extends Phaser.Scene {
   constructor() {
      super('playGame');
      // declare objects
      this.player;
      this.platforms;
      this.enemies;
   }

   preload() {
      //get canvas
      this.canvas = this.sys.game.canvas;

      //load audio
      loadAudio(this);
      loadImages(this);
      loadSpriteSheets(this);

      // load the JSON file
      this.load.tilemapTiledJSON('tilemap', '/json/level1.json');
   }

   create() {
      this.input.setDefaultCursor('url(/cursors/crosair_white.cur), pointer');

      //set w and h from canvas
      let { width, height } = this.canvas;
      this.physics.world.setBounds(0, 0, width * 3, height * 3);

      createAudio(this);
      createAnimations(this);
      createCamera(this);
      createLevel(this);
      createCounter(this);
      createPlayer(this);
      createGroups(this);

      this.timedEvent = this.time.delayedCall(1000, this.spawnSpider, [], this);
      this.timedEvent = this.time.delayedCall(2000, this.spawnSpider, [], this);
      this.timedEvent = this.time.delayedCall(3000, this.spawnSpider, [], this);
   }

   spawnSpider() {
      this.enemies.create(200, 1000);
   }

   update() {
      this.killCounter.setText('KILLS: ' + localStorage.getItem('killCount'));
      this.player.update();
   }
}

export default PlayGame;
