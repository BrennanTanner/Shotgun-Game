import { loadAudio } from "../util/preloadFunctions.mjs";
import { createAudio } from "../util/createFunctions.mjs";

class MainMenu extends Phaser.Scene {
  constructor() {
    super("mainMenu");
    // declare objects
  }

   preload() {
      //get canvas
      this.canvas = this.sys.game.canvas;
      this.load.image('menu-bg', '/images/splash-1.png');
      this.load.image('button', '/images/button.png');
      this.load.image('hover', '/images/button-hover.png');
      this.load.image('click', '/images/button-click.png');

      this.titleText = this.add
         .text(this.physics.world.bounds.centerX, 100, 'SHOTGUN DAVE', {
            font: '100pt Teko',
            fill: 'white',
            align: 'center',
         })
         .setOrigin(0.5);
      this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
loadAudio(this);
      this.optionCount = 1;
   }

   create() {
      this.input.setDefaultCursor('url(/cursors/crosair_white.cur), pointer');
      this.sys.game.events.off('hidden', this.sys.game.onHidden, this.sys.game);
      this.sys.game.events.off(
         'visible',
         this.sys.game.onVisible,
         this.sys.game
      );
      createAudio(this);

      this.add.sprite(this.physics.world.bounds.centerX, this.physics.world.bounds.centerY, 'menu-bg').setScale(.4)

      this.add.existing(this.titleText).setDepth(10);

      this.addMenuOption('New Game', function () {
         this.scene.scene.start("playGame");
      });
      this.addMenuOption('Options', function () {
         console.log('You clicked Options!');
      });
      this.addMenuOption('Credits', function () {
         console.log('You clicked Credits!');
      });
      //background
   }

   update() {}

   addMenuOption(text, callback) {
      const button = this.add
         .sprite(
            this.physics.world.bounds.centerX,
            this.optionCount * 80 + 200,
            'button'
         )
         .setOrigin(0.5)
         .setScale(0.5);
      this.add
         .text(
            this.physics.world.bounds.centerX,
            this.optionCount * 80 + 200,
            text
         )
         .setOrigin(0.5);
      button.setInteractive();
      button.on('pointerdown', (callback));
      button.on('pointerover', () => {
         button.setTexture('hover');
      });
      button.on('pointerout', () => {
         button.setTexture('button');
      });

      this.optionCount++;
   }
}

export default MainMenu;
