class Bullet extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y, 'bullet');
      
      this.bullet = this.scene.physics.add.existing(this).setCircle(2.5);

      // render bullet
      this.bullet.setCollideWorldBounds(true);
      this.bullet.setBounce(0.5);
      this.bullet.body.setAllowGravity(false);
      this.bullet.mass = .2;

      // add collison detection
      scene.physics.add.collider(this.bullet, scene.platforms);

      scene.physics.add.collider(
         this.bullet,
         scene.enemies,
         this.enemyCollision.bind(this)
      );
      
   }

   update() {

      //decay velocity when touching the ground
      if (!this.bullet.body.touching.none) {

         this.bullet.destroy()
         console.log("touch")
         // const friction = this.mass * 10;
         // if (this.bullet.body.velocity.x > friction) {
         //    this.bullet.setVelocityX(this.bullet.body.velocity.x - friction);
         //    this.bullet.setAngularVelocity(this.bullet.body.velocity.x - 10);
         // } else if (this.bullet.body.velocity.x < -friction) {
         //    this.bullet.setVelocityX(this.bullet.body.velocity.x + friction);
         //    this.bullet.setAngularVelocity(this.bullet.body.velocity.x + 10);
         // } else if (
         //    this.bullet.body.velocity.x < friction &&
         //    this.bullet.body.velocity.x > -friction
         // ) {
         //    this.bullet.setVelocityX(0);
         //    this.bullet.setAngularVelocity(0);
         // }
      }
   }

   enemyCollision() {
console.log("hit")
      // this.bullet.setVelocity(
      //    (this.scene.enemies.mass / (this.scene.enemies.mass + this.mass)) *
      //       this.bullet.body.velocity.x,
      //    (this.scene.enemies.mass / (this.scene.enemies.mass + this.mass)) *
      //       this.bullet.body.velocity.y
      // );
   }
}

export default Bullet;
