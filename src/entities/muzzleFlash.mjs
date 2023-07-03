class MuzzleFlash extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y, 'muzzleFlash');
      
      this.scene = scene;
      this.muzzleFlash = this.scene.add.existing(this);

      scene.anims.create({
         key: 'shoot',
         frames: scene.anims.generateFrameNumbers('muzzleFlash', {
            start: 0,
            end: 11,
         }),
         frameRate: 15,
         repeat: 0,
      });
   }

   update() {
      this.muzzleFlash.anims.play('shoot', true);
      this.muzzleFlash.on('animationcomplete', ()=>{this.destroy()});
   }

}

export default MuzzleFlash;
