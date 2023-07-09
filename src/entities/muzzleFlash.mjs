class MuzzleFlash extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y);

      this.scene = scene;
      this.muzzleFlash = this.scene.add.existing(this);
   }

   update() {
      this.muzzleFlash.anims.play('shoot', true);
      this.muzzleFlash.on('animationcomplete', () => {
         this.destroy();
      });
   }
}

export default MuzzleFlash;
