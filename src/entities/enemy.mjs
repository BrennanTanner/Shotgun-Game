class Enemy extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y, 'dude'); 

     this.enemy =  scene.physics.add.sprite(x, y, 'dude').setSize(20, 28);

      // render enemy
     this.enemy.setCollideWorldBounds(true);

      //define enemy animations
     scene.anims.create({
         key: 'left',
         frames:scene.anims.generateFrameNumbers('dude', { start: 0, end: 7 }),
         frameRate: 10,
         repeat: -1,
      });
      
     scene.anims.create({
         key: 'right',
         frames:scene.anims.generateFrameNumbers('dude', { start: 0, end: 7 }),
         frameRate: 10,
         repeat: -1,
      });
     scene.anims.create({
         key: 'idle',
         frames:scene.anims.generateFrameNumbers('dude', {
            start: 10,
            end: 19,
         }),
         frameRate: 10,
         repeat: -1,
      });

     scene.anims.create({
         key: 'jump',
         frames:scene.anims.generateFrameNumbers('dude', { start: 20 }),
      });
     scene.anims.create({
         key: 'hover',
         frames:scene.anims.generateFrameNumbers('dude', { start: 21 }),
      });
     scene.anims.create({
         key: 'fall',
         frames:scene.anims.generateFrameNumbers('dude', { start: 22 }),
      });

     scene.anims.create({
         key: 'wallslide',
         frames:scene.anims.generateFrameNumbers('dude', {
            start: 10,
            end: 19,
         }),
         frameRate: 10,
         repeat: -1,
      });

      // add collison detection
    this.physics = scene.physics.add.collider(this.enemy, scene.platforms);

    this.cursors = scene.input.keyboard.createCursorKeys();
   }

   update() {
      // define keyboard controls
      // left
      if (this.cursors.left.isDown) {
        this.enemy.setVelocityX(-160);
        this.enemy.flipX = true;
        this.enemy.anims.play('left', true);

         //right
      } else if (this.cursors.right.isDown) {
        this.enemy.setVelocityX(160);
        this.enemy.flipX = false;
        this.enemy.anims.play('right', true);

         // reset sprite direction
      } else {
         if (this.enemy.body.velocity.x > 0) {
           this.enemy.setVelocityX(this.enemy.body.velocity.x - 20);
         } else if (this.enemy.body.velocity.x < 0) {
           this.enemy.setVelocityX(this.enemy.body.velocity.x + 20);
         }

        this.enemy.anims.play('idle', true);
      }

      // up -> jump
      if (this.cursors.space.isDown &&this.jumpsLeft > 0) {
        this.jumpsLeft -= 1;
        this.enemy.setVelocityY(-330);
      } else if (this.enemy.body.velocity.y < -50) {
        this.enemy.anims.play('jump');
      } else if (this.enemy.body.velocity.y > 50) {
        this.enemy.anims.play('fall');
      } else if (!this.enemy.body.touching.down) {
        this.enemy.anims.play('hover');
      }

      if (this.enemy.body.touching.down) {
        this.jumpsLeft = 2;
        this.enemy.setVelocityY(this.enemy.body.velocity.y + 2);
      }
   }
}

export default Enemy;
