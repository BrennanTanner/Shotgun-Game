class Player extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y, 'dude');
      this.time = 0;
      this.chair = scene.physics.add.sprite(x, y, 'dude').setSize(48, 48);
      this.player = scene.physics.add.sprite(x, y, 'dude').setSize(48, 48);
      this.scene = scene;

      // render player
      this.player.setCollideWorldBounds(true);

      //define player animations
      scene.anims.create({
         key: 'arm',
         frames: scene.anims.generateFrameNumbers('dude', { start: 1 }),
      });


      // add collison detection
      this.physics = scene.physics.add.collider(this.player, scene.platforms);

      this.cursors = scene.input.keyboard.createCursorKeys();
      this.activePointer = scene.input.activePointer;
   }

   update() {
      // define keyboard controls
      this.pointerMove(this.activePointer);
      this.player.anims.play('arm');
      this.chair.x = this.player.x;
      this.chair.y = this.player.y;
      this.chair.setVelocity(0, 0);

      if (this.player.body.touching.down) {
         if (this.player.body.velocity.x > 10) {
            this.player.setVelocityX(this.player.body.velocity.x - 10);
          } else if (this.player.body.velocity.x < -10) {
            this.player.setVelocityX(this.player.body.velocity.x + 10);
          } else if (this.player.body.velocity.x < 10 && this.player.body.velocity.x > -10){
            this.player.setVelocityX(0);
          }
          
      }
   }

   pointerMove(pointer) {
      var angleToPointer = Phaser.Math.Angle.Between(
         this.player.x,
         this.player.y,
         pointer.worldX,
         pointer.worldY
      );
      this.player.rotation = angleToPointer;
      this.time++;
      if (this.activePointer.isDown && this.time > 60) {
         const angle = this.scene.physics.velocityFromRotation(angleToPointer);
         this.player.setVelocity(angle.x * 5 * -1, angle.y * 5 * -1);
         this.time = 0;
      }
   }
}

export default Player;
