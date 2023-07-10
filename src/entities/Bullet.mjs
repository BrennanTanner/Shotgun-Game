class Bullet extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y);

      this.bullet = this.scene.physics.add.existing(this).setCircle(10);

      // render bullet
      this.bullet.setCollideWorldBounds(true);
      this.bullet.setBounce(1).setOffset(-2.5, -2);
      this.bullet.body.setAllowGravity(false);
      this.bullet.mass = 0.2;
      this.bullet.radius = 10;
      this.bullet.growth = 1;
      this.bullet.range = 20;
      //this.bullet.setOrigin(-2, 2);

      // add collison detection
      scene.physics.add.collider(this.bullet, scene.walls);
      this.scene = scene;

   }

   update() {
      this.bullet.anims.play('hotBullet', true);

      this.bullet.setCircle(this.bullet.radius);
      //console.log(this.bullet);

      this.bullet.range--;

      if (this.bullet.range <= 0) {
         this.destroy();
      }
   }
   
   bulletKill(){
      this.destroy();
   }
}

export default Bullet;
