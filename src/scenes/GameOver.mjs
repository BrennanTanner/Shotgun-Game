class GameOver extends Phaser.Scene {
   constructor() {
      super('gameOver');
      // declare objects
   }

   preload() {
      //get canvas
      this.canvas = this.sys.game.canvas;
   }

   create() {
      this.input.setDefaultCursor('url(/cursors/crosair_white.cur), pointer');

      //background
   }

   update() {
      this.player.update();
   }
}

export default PlayGame;
