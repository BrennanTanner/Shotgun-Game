class Bullet extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y, 'bullet');
      
      this.bullet = this.scene.physics.add.existing(this).setCircle(10);

      // render bullet
      this.bullet.setCollideWorldBounds(true);
      this.bullet.setBounce(1);
      this.bullet.body.setAllowGravity(false);
      this.bullet.mass = .2;
      this.bullet.radius = 5;
      this.bullet.growth = .5;
      this.bullet.range = 20;
      //this.bullet.setOrigin(-2, 2);

      // add collison detection
      //scene.physics.add.collider(this.bullet, scene.platforms);

      scene.physics.add.collider(
         this.bullet,
         scene.enemies,
         this.enemyCollision.bind(this)
      );
   }

   update() {
      this.bullet.radius += this.bullet.growth;
      this.bullet.setCircle(this.bullet.radius);
         //console.log(this.bullet);

      this.bullet.range--;

      //decay velocity when touching the ground
      if (this.bullet.body.touching.up) {
         this.bullet.destroy()
         console.log("touch");
      }

      if(this.bullet.range <= 0){
         this.bullet.destroy();
      }
   }

   enemyCollision() {

   console.log("hit");
   }
}

export default Bullet;
