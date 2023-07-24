import { loadAudio } from '../util/preloadFunctions.mjs';
import { createAudio } from '../util/createFunctions.mjs';

class MainMenu extends Phaser.Scene {
   constructor() {
      super('mainMenu');
      // declare objects
   }

   preload() {
      //get canvas
      this.canvas = this.sys.game.canvas;
      this.loadingBar();
      this.load.video({
         key: 'menu-vid',
         url: '/images/splash-screen-3.mp4',
         asBlob: false,
         noAudio: true
     });
      //this.load.image('bubble', '/images/bubble.png');
      this.load.image('button', '/images/button.png');
      this.load.image('hover', '/images/button-hover.png');
      this.load.image('click', '/images/button-click.png');

      loadAudio(this);
      this.optionCount = 1;
      //loadAudio(this);
   }

   create() {
      this.music = this.scene.scene.sound.add("track-1",{
         volume: 0.4,
         loop: true,
     });

      this.input.setDefaultCursor('url(/cursors/crosair_white.cur), pointer');
      this.sys.game.events.off('hidden', this.sys.game.onHidden, this.sys.game);
      this.sys.game.events.off(
         'visible',
         this.sys.game.onVisible, 
         this.sys.game
      );
      createAudio(this);


      const video = this.add.video(640, 360);

      video.loadURL('/images/splash-screen-3.mp4', true);

      video.play(true); 

      // this.add
      //    .sprite(
      //       this.physics.world.bounds.centerX,
      //       this.physics.world.bounds.centerY,
      //       'menu-bg'
      //    )
      //    .setScale(0.4);

      this.addMenuOption('New Game', function () {
         this.scene.scene.start('playGame');
      });
      this.addMenuOption('Options', function () {
         console.log('You clicked Options!');
      });
      this.addMenuOption('Credits', function () {
         console.log('You clicked Credits!');
      });

      
   //    const emitter = this.add.particles(this.canvas.height, this.canvas.height, 'bubble', {
   //       scale: { min: 0.05, max: 0.1 },
   //       speed: { min: 10, max: 40 },
   //       alpha: 1,
   //       lifespan: 10000,
   //       frequency: 500,
   //       gravityY: -50,
   //       particleBringToTop: false
   //   });

   //   const shape1 = new Phaser.Geom.Rectangle(0, 0, this.canvas.width, this.canvas.height-550);
   //      emitter.addEmitZone({ type: 'random', source: shape1 });

      //background
      this.music.play({ volume: 0.4 });
   }

   update() {
      
   }

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
      button.on('pointerdown', callback);
      button.on('pointerover', () => {
         button.setTexture('hover');
      });
      button.on('pointerout', () => {
         button.setTexture('button');
      });

      this.optionCount++;
   }

   loadingBar() {
      var progressBar = this.add.graphics();
      var progressBox = this.add.graphics();
      var width = this.cameras.main.width / 2;
      var height = this.cameras.main.height / 2;

      progressBox.fillStyle(0x222222, 0.8);
      progressBox.fillRect(width - 160, height-10, 320, 50);
      
      var loadingText = this.make.text({
          x: width,
          y: height - 30,
          text: 'Loading...',
          style: {
              font: '20px monospace',
              fill: '#ffffff'
          }
      });
      loadingText.setOrigin(0.5, 0.5);
      
      var percentText = this.make.text({
          x: width,
          y: height +15,
          text: '0%',
          style: {
              font: '18px monospace',
              fill: '#ffffff'
          }
      });
      percentText.setOrigin(0.5, 0.5);
      
      var assetText = this.make.text({
          x: width,
          y: height + 60,
          text: '',
          style: {
              font: '18px monospace',
              fill: '#ffffff'
          }
      });
      assetText.setOrigin(0.5, 0.5);
      
      this.load.on('progress', function (value) {
          percentText.setText(parseInt(value * 100) + '%');
          progressBar.clear();
          progressBar.fillStyle(0xffffff, 1);
          progressBar.fillRect(width - 150, height, 300 * value, 30);
      });
      
      this.load.on('fileprogress', function (file) {
          assetText.setText('Loading asset: ' + file.key);
      });
      this.load.on('complete', function () {
          progressBar.destroy();
          progressBox.destroy();
          loadingText.destroy();
          percentText.destroy();
          assetText.destroy();
      });
   }
}

export default MainMenu;
