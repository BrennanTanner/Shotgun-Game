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

      // loadimages
      loadImages(this);
      loadSpriteSheets(this);

      // load the JSON file
      this.load.tilemapTiledJSON('tilemap', '/json/level1.json');
   }

   create() {
      this.input.setDefaultCursor('url(/cursors/crosair_white.cur), pointer');
      this.sys.game.events.off('hidden', this.sys.game.onHidden, this.sys.game);
      this.sys.game.events.off(
         'visible',
         this.sys.game.onVisible,
         this.sys.game
      );
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
     
      this.spawnSpider();
   }

   spawnSpider() {
      this.enemies.create(150, 350);
      this.enemies.create(200, 1500);
      this.enemies.create(3650, 350);
      this.enemies.create(2000, 1750);
   }

   update() {
      // adding music
      //this.music.play({ volume: 0.4 });
      this.killCounter.setText('KILLS: ' + localStorage.getItem('killCount'));
      this.player.update();
      
   }
}

export default PlayGame;
