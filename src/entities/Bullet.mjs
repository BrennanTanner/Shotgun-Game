class Bullet extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y);

      this.bullet = this.scene.physics.add.existing(this).setCircle(10);

      // render bullet
      this.bullet.setCollideWorldBounds(true);
      this.bullet.setBounce(1);
      this.bullet.body.setAllowGravity(false);
      this.bullet.mass = 0.2;
      this.bullet.radius = 5;
      this.bullet.growth = 0.5;
      this.bullet.range = 20;
      //this.bullet.setOrigin(-2, 2);

      // add collison detection
      //scene.physics.add.collider(this.bullet, scene.walls);
      this.scene = scene;
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

      if (this.bullet.range <= 0) {
         this.destroy();
      }
   }

   enemyCollision() {}
   
   bulletKill(){
      this.destroy();
   }
}

export default Bullet;
