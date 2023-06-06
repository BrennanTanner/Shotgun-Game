class Enemy extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y, 'chicken');

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
         this.playerCollision
      );
   }

   update() {
      this.enemy.anims.play('idle', true);
   }

   playerCollision() {
      console.log('hit');
   }
}

export default Enemy;
