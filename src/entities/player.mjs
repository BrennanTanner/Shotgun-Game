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
      if (this.activePointer.isDown && this.time > 20) {
         const angle = this.scene.physics.velocityFromRotation(angleToPointer);
         this.arm.setVelocity((angle.x * 5 * -1) + this.arm.body.velocity.x, (angle.y * 5 * -1) + this.arm.body.velocity.y);
         this.time = 0;
      }
      class HealthBar {
         constructor(scene, x, y, width, height, initialValue) {
           this.scene = scene;
           this.x = x;
           this.y = y;
           this.width = width;
           this.height = height;
           this.initialValue = initialValue;
       
           this.graphics = scene.add.graphics();
           this.drawBackground();
           this.drawHealthBar(initialValue);
           this.createText();
         }
       
         drawBackground() {
           this.graphics.fillStyle(0x000000, 0.5);
           this.graphics.fillRect(this.x, this.y, this.width, this.height);
         }
       
         drawHealthBar(value) {
           const barWidth = (value / this.initialValue) * this.width;
           this.graphics.clear();
           this.drawBackground();
           this.graphics.fillStyle(0xff0000);
           this.graphics.fillRect(this.x, this.y, barWidth, this.height);
         }
       
         createText() {
            this.text = this.scene.add.text(
              this.x,
              this.y,
              '100%',
              { fontFamily: 'Arial', fontSize: '16px', color: '#ffffff' }
            );
          }
       
         update(value) {
           this.drawHealthBar(value);
           const percentage = Math.round((value / this.initialValue) * 100);
           this.text.setText(percentage + '%');
         }
       }
       
   }
}

export default Player;
