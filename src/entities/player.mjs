class Player extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y, 'dude');
      this.time = 0;
      this.mass = 1;
      //the player is made up of 2 seperate entities, the arm and the chair
      this.chair = scene.physics.add.sprite(x, y, 'dude');
      this.arm = scene.physics.add.sprite(x, y, 'dude').setSize(48, 48);
      
      scene.cameras.main.startFollow(this.arm, true);
      //set the scene
      this.scene = scene;

      // render player arm (offests it so it rotates correctly on the body)
      this.arm.setCollideWorldBounds(true);
      this.arm.setBounce(.4);
      this.arm.setOffset(0, 0);
      this.arm.setOrigin(0.3, 0.5);

      //this.chair.setOffset(5, 10);
      this.chair.setOrigin(0.3, 0.5);

      //define player animations
      scene.anims.create({
         key: 'arm',
         frames: scene.anims.generateFrameNumbers('dude', { start: 1 }),
      });

      scene.anims.create({
         key: 'chair',
         frames: scene.anims.generateFrameNumbers('dude', { start: 0 }),
      });

      // add collison detection
      scene.physics.add.collider(this.arm, scene.platforms);

      this.cursors = scene.input.keyboard.createCursorKeys();
      this.activePointer = scene.input.activePointer;
   }

   update() {
      // define keyboard controls
      this.pointerMove(this.activePointer);

      //load player arm
      this.arm.anims.play('arm');

      //load player chair
      this.chair.anims.play('chair');
      this.chair.setVelocityY(0);
      this.chair.body.x = this.arm.body.x;
      this.chair.body.y = this.arm.body.y;

      //decay velocity when touching the ground
      if (this.arm.body.touching.down) {
         const friction =this.mass*10;
         if (this.arm.body.velocity.x > friction) {
            this.arm.setVelocityX(this.arm.body.velocity.x - friction);
            this.chair.setAngularVelocity(this.arm.body.velocity.x - 10);
          } else if (this.arm.body.velocity.x < -friction) {
            this.arm.setVelocityX(this.arm.body.velocity.x + friction);
            this.chair.setAngularVelocity(this.arm.body.velocity.x + 10);
          } else if (this.arm.body.velocity.x < friction && this.arm.body.velocity.x > -friction){
            this.arm.setVelocityX(0);
            this.chair.setAngularVelocity(0);
          } 
      }
   }

   //set arm to pointer, when clicked set velocity to angle
   pointerMove(pointer) {
      var angleToPointer = Phaser.Math.Angle.Between(
         this.arm.x,
         this.arm.y,
         pointer.worldX,
         pointer.worldY
      );
      this.arm.rotation = angleToPointer;
      this.time++;
      if (this.activePointer.isDown && this.time > 20) {
         const angle = this.scene.physics.velocityFromRotation(angleToPointer);
         this.arm.setVelocity((angle.x * 5 * -1) + this.arm.body.velocity.x, (angle.y * 5 * -1) + this.arm.body.velocity.y);

         this.chair.body.setAngularVelocity((this.arm.body.velocity.y * this.arm.body.velocity.x)/ 100);
         this.time = 0;
         
      }
   }

}

export default Player;
