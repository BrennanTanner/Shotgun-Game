class Enemy extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y, 'chicken'); 

     this.enemy = scene.physics.add.sprite(x, y, 'chicken').setSize(20, 28);

      // render enemy
     this.enemy.setCollideWorldBounds(true);

      //define enemy animations
     scene.anims.create({
         key: 'idle',
         frames:scene.anims.generateFrameNumbers('chicken', {
            start: 0,
            end: 12,
         }),
         frameRate: 10,
         repeat: -1,
      });


      // add collison detection
    this.physics = scene.physics.add.collider(this.enemy, scene.platforms);
   }

   update() {
      this.enemy.anims.play('idle', true);

   }
}

export default Enemy;
