class Enemy extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y, 'chicken');
      this.mass = .3;
      this.enemy = this.scene.physics.add.existing(this).setSize(20, 30);
      this.enemy.setOffset(5, 5);
      
      // render enemy
      this.enemy.setCollideWorldBounds(true);
      this.enemy.setBounce(0.5);

      //define enemy animations
      scene.anims.create({
         key: 'idle',
         frames: scene.anims.generateFrameNumbers('chicken', {
            start: 0,
            end: 12,
         }),
         frameRate: 15,
         repeat: -1,
      });

      // add collison detection
      scene.physics.add.collider(this.enemy, scene.platforms);
      scene.physics.add.collider(
         this.enemy,
         scene.player.arm,
         this.playerCollision.bind(this)
      );
   }

   update() {
      this.enemy.anims.play('idle', true);

      //decay velocity when touching the ground
      if (this.enemy.body.touching.down) {
         const friction =this.mass*10;
         if (this.enemy.body.velocity.x > friction) {
            this.enemy.setVelocityX(this.enemy.body.velocity.x - friction);
            this.enemy.setAngularVelocity(this.enemy.body.velocity.x - 10);
          } else if (this.enemy.body.velocity.x < -friction) {
            this.enemy.setVelocityX(this.enemy.body.velocity.x + friction);
            this.enemy.setAngularVelocity(this.enemy.body.velocity.x + 10);
          } else if (this.enemy.body.velocity.x < friction && this.enemy.body.velocity.x > -friction){
            this.enemy.setVelocityX(0);
            this.enemy.setAngularVelocity(0);
          } 
      }
   }

   playerCollision() {

      this.enemy.setVelocity((this.scene.player.mass / (this.scene.player.mass + this.mass))*this.enemy.body.velocity.x,(this.scene.player.mass / (this.scene.player.mass + this.mass))*this.enemy.body.velocity.y );

      this.enemy.body.setAngularVelocity((this.enemy.body.velocity.y * this.enemy.body.velocity.x)/ 100);
      this.time = 0;
   }
}

export default Enemy;
