class Player extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y, 'dude');
      this.time = 0;

      //the player is made up of 2 seperate entities, the arm and the chair
      this.arm = scene.physics.add.sprite(x, y, 'dude').setSize(48, 48);
      this.chair = scene.physics.add.sprite(x, y, 'dude');
   
      scene.cameras.main.startFollow(this.arm, true);
      //set the scene
      this.scene = scene;

      // render player arm (offests it so it rotates correctly on the body)
      this.arm.setCollideWorldBounds(true);
      this.arm.setBounce(.5);
      this.arm.setOffset(5, 10);
      this.arm.setOrigin(0.3, 0.5);

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
      this.physics = scene.physics.add.collider(this.arm, scene.platforms);
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

      // playes sound when touches the ground 
      var hastouchedtheground = false
      if (this.arm.body.touching.down) {
         if (hastouchedtheground == false) {
            this.scene.fall_ground.play();
            hastouchedtheground = true
         }
         else {
            hastouchedtheground = false
          }
      } 

      //decay velocity when touching the ground
      if (this.arm.body.touching.down) {
         if (this.arm.body.velocity.x > 10) {
            this.arm.setVelocityX(this.arm.body.velocity.x - 10);
          } else if (this.arm.body.velocity.x < -10) {
            this.arm.setVelocityX(this.arm.body.velocity.x + 10);
          } else if (this.arm.body.velocity.x < 10 && this.arm.body.velocity.x > -10){
            this.arm.setVelocityX(0);
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

   var shotgun_random = Math.floor (Math.random()*3); 

      // shooting shotgun
      if (this.activePointer.isDown && this.time > 20) {
         const angle = this.scene.physics.velocityFromRotation(angleToPointer);
         this.arm.setVelocity((angle.x * 5 * -1) + this.arm.body.velocity.x, (angle.y * 5 * -1) + this.arm.body.velocity.y);
         this.time = 0;

         
         // audio for shooting shotgun  
         if (shotgun_random == 0) {
         this.scene.shotgun_shoot1.play();
         }
         if (shotgun_random == 1) {
         this.scene.shotgun_shoot2.play();
         }
         if (shotgun_random == 2) {
         }this.scene.shotgun_shoot3.play();

      }
   }
}

export default Player;