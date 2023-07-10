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
      localStorage.setItem('killCount', 0);
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
      this.physics.add.collider(this.enemies, this.enemies);
   }

   spawnSpider() {
      //this.enemies.create(400, 400);
      this.enemies.create(400, 1500);
      //this.enemies.create(1500, 2000);
      // this.enemies.create(400, 2000);
   }

   update() {
      this.killCounter.setText('KILLS: ' + localStorage.getItem('killCount'));
      this.player.update();
      this.spawnSpider();
   }
}

export default PlayGame;
