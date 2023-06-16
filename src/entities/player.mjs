import HealthBar from './HealthBar.mjs';

class Player extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y, 'dude');
      this.time = 0;
      this.invincible = false;

      //set the scene
      this.scene = scene;
     
      this.chair = scene.physics.add.sprite(x, y, 'dude');
      this.arm = scene.physics.add.sprite(x, y, 'dude').setCircle(20)

      //set camera
      scene.cameras.main.startFollow(this.arm, true);

      // render player arm (offsets it so it rotates correctly on the body)
      this.arm.setCollideWorldBounds(true);
     
      this.arm.setBounce(0.4);
      this.arm.setOffset(-3, 5);

      this.arm.setOrigin(0.3, 0.5);
      this.arm.mass = 1;

      this.chair.setOffset(-5, 5);
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

      // add collision detection
      this.physics = scene.physics.add.collider(this.arm, scene.platforms);
      this.cursors = scene.input.keyboard.createCursorKeys();
      this.activePointer = scene.input.activePointer;

      //scene.cameras.
      // Create the health bar
      this.healthBar = new HealthBar(scene, 200, 130, 300, 1, 0);

      this.healthBar.create();
   }

   update() {
      // define keyboard controls
      this.pointerMove(this.activePointer);
      this.healthBar.updateHealthBar();

      //load player arm
      this.arm.anims.play('arm');

      //load player chair
      this.chair.anims.play('chair');
      this.chair.setVelocityY(0);
      this.chair.body.x = this.arm.body.x;
      this.chair.body.y = this.arm.body.y;

      //decay velocity when touching the ground
      if (this.arm.body.touching.down) {
         const friction = this.arm.mass * 10;
         if (this.arm.body.velocity.x > friction) {
            this.arm.setVelocityX(this.arm.body.velocity.x - friction);
            this.chair.setAngularVelocity(this.arm.body.velocity.x - 10);
         } else if (this.arm.body.velocity.x < -friction) {
            this.arm.setVelocityX(this.arm.body.velocity.x + friction);
            this.chair.setAngularVelocity(this.arm.body.velocity.x + 10);
         } else if (
            this.arm.body.velocity.x < friction &&
            this.arm.body.velocity.x > -friction
         ) {
            this.arm.setVelocityX(0);
            this.chair.setAngularVelocity(0);
         }
      }
   }

   setInvincible(time = 500) {
      this.invincible = true;
      this.scene.time.delayedCall(
         time,
         () => {
            this.invincible = false;
         },
         [],
         this
      );
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

      var shotgun_random = Math.floor(Math.random() * 3);

      // shooting shotgun
      if (this.activePointer.isDown && this.time > 30) {
         const angle = this.scene.physics.velocityFromRotation(angleToPointer);
         this.arm.setVelocity(
            angle.x * 5 * -1 + this.arm.body.velocity.x,
            angle.y * 5 * -1 + this.arm.body.velocity.y
         );

         this.chair.body.setAngularVelocity(
            (this.arm.body.velocity.y * this.arm.body.velocity.x) / 100
         );

         this.scene.bullets.create(this.arm.body.x+24, this.arm.body.y+24).setVelocity(
            angle.x *31 + this.arm.body.velocity.x,
            angle.y *31 + this.arm.body.velocity.y
         )
         
         this.time = 0;

         // audio
         if (shotgun_random == 0) {
            this.scene.shotgun_shoot1.play();
         } else if (shotgun_random == 1) {
            this.scene.shotgun_shoot2.play();
         } else {
         }
         this.scene.shotgun_shoot3.play();
      }
   }

   hitEnemy() {
      // Decrease the player's health (you can adjust the amount based on your game's rules)
      this.healthBar.update(this.healthBar.initialValue - 10);
   
      // Check if the player's health has reached zero or below
      if (this.healthBar.value <= 0) {
         // Implement your logic for player death
      }
   }
}

class HealthBar {
   constructor(scene, x, y, width, height, initialValue) {
     this.scene = scene;
     this.x = 10;
     this.y = 10;
     this.width = width;
     this.height = height;
     this.initialValue = initialValue;
     this.value = initialValue;
 
     this.graphics = scene.add.graphics();
     this.drawBackground();
     this.createText();
 
     scene.add.existing(this.graphics);
     scene.add.existing(this.text);
   }
 
   drawBackground() {
     this.graphics.fillStyle(0x000000);
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
      this.value = value;
      this.drawHealthBar(value);
      this.text.setText(percentage + '%');
   }
   updateHealthBar() {
      const camera = this.scene.cameras.main;
    
      // Calculate the position relative to the camera viewport
      const x = camera.worldView.x + this.x;
      const y = camera.worldView.y + this.y;
    
      // Draw the health bar
      const barWidth = (this.value / this.initialValue) * this.width;
      this.graphics.clear();
      this.graphics.fillStyle(0x000000, 0.5);
      this.graphics.fillRect(x, y, this.width, this.height);
      this.graphics.fillStyle(0xff0000);
      this.graphics.fillRect(x, y, barWidth, this.height);
    
      // Calculate the health percentage
      const percentage = Math.round((this.value / this.initialValue) * 90);
    
      // Update the text
      this.text.setText(percentage + '%');
    
      // Set the text position
      this.text.x = x + 10;
      this.text.y = y + (this.height / 2) - (this.text.height / 2);
    }
    drawBackground() {
      this.graphics.fillStyle(0x000000);
      this.graphics.fillRect(this.x, this.y, this.width, this.height);
    }
    
     
   
   
}

export default Player;
