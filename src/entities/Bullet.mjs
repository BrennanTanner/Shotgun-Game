class Bullet extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y, 'bullet');
      
      this.bullet = this.scene.physics.add.existing(this).setCircle(2.5);

      // render bullet
      this.bullet.setCollideWorldBounds(true);
      this.bullet.setBounce(0.5);
      this.bullet.body;
      this.bullet.mass = .2;
      //this.bullet.setOrigin(-2, 2);

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
      }
   }

   enemyCollision() {
console.log("hit")
   }
}

export default Bullet;
