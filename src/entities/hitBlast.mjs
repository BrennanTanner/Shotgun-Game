class HitBlast extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y);

      this.scene = scene;
      this.hitBlast = this.scene.add.existing(this).setScale(.5);

   }

   update() {
      this.hitBlast.anims.play('hit', true);
      this.hitBlast.on('animationcomplete', () => {
         this.destroy();
      });
   }
}

export default HitBlast;
