class Player extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y, 'dude'); 

     this.player =  scene.physics.add.sprite(x, y, 'dude').setSize(20, 28);

      // render player
     this.player.setCollideWorldBounds(true);

      //define player animations
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
    this.physics = scene.physics.add.collider(this.player, scene.platforms);

    this.cursors = scene.input.keyboard.createCursorKeys();
   }

   update() {
      // define keyboard controls
      // left
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.flipX = true;
        this.player.anims.play('left', true);

         //right
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.flipX = false;
        this.player.anims.play('right', true);

         // reset sprite direction
      } else {
         if (this.player.body.velocity.x > 0) {
           this.player.setVelocityX(this.player.body.velocity.x - 20);
         } else if (this.player.body.velocity.x < 0) {
           this.player.setVelocityX(this.player.body.velocity.x + 20);
         }

        this.player.anims.play('idle', true);
      }

      // up -> jump
      if (this.cursors.space.isDown &&this.jumpsLeft > 0) {
        this.jumpsLeft -= 1;
        this.player.setVelocityY(-330);
      } else if (this.player.body.velocity.y < -50) {
        this.player.anims.play('jump');
      } else if (this.player.body.velocity.y > 50) {
        this.player.anims.play('fall');
      } else if (!this.player.body.touching.down) {
        this.player.anims.play('hover');
      }

      if (this.player.body.touching.down) {
        this.jumpsLeft = 2;
        this.player.setVelocityY(this.player.body.velocity.y + 2);
      }
   }
}

export default Player;
