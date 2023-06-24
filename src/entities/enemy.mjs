import HealthBar from './HealthBar.mjs';

class Enemy extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y, 'chicken');
      this.enemy = this.scene.physics.add.existing(this).setSize(20, 30).setInteractive({ cursor: 'url(../../res/cursors/crosair_red.cur), pointer' });
      this.enemy.setOffset(5, 5);

      // render enemy
      this.enemy.setCollideWorldBounds(true);
      this.enemy.setBounce(0.5);
      this.enemy.mass = .3;

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
         scene.player.player,
         this.playerCollision.bind(this)
      );

   }

   update() {
      this.enemy.anims.play('idle', true);

      
      //decay velocity when touching the ground
      if (this.enemy.body.touching.down) {
         const friction = this.enemy.mass * 10;
         if (this.enemy.body.velocity.x > friction) {
            this.enemy.setVelocityX(this.enemy.body.velocity.x - friction);
            this.enemy.setAngularVelocity(this.enemy.body.velocity.x - 10);
         } else if (this.enemy.body.velocity.x < -friction) {
            this.enemy.setVelocityX(this.enemy.body.velocity.x + friction);
            this.enemy.setAngularVelocity(this.enemy.body.velocity.x + 10);
         } else if (
            this.enemy.body.velocity.x < friction &&
            this.enemy.body.velocity.x > -friction
         ) {
            this.enemy.setVelocityX(0);
            this.enemy.setAngularVelocity(0);
         }
      }
   }

   playerCollision() {
      if ((this.scene.player.invincible == false)) {
         this.scene.player.healthBar.damage(-5);
         this.scene.player.setInvincible();
      }
   }
}

export default Enemy;
