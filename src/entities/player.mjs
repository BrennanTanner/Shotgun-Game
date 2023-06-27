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

      //load player arm
      this.arm.anims.play('arm');

      //load player chair
      this.chair.anims.play('chair');
      this.chair.setVelocityY(0);
      this.chair.body.x = this.arm.body.x;
      this.chair.body.y = this.arm.body.y;



      
      var hastouchedtheground = false
      
      if (this.arm.body.touching.down) {
         // playes sound when touches the ground 
         if (hastouchedtheground == false) {
            this.scene.fall_ground.play({volume: 0.2});
            hastouchedtheground = true
         }
         else {
            hastouchedtheground = false
          }
         
      } 

      //decay velocity when touching the ground
      //console.log(this.chair.angle)
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
            this.chair.rotation = 0;
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
         
         // audio for shooting shotgun  
         this.time = 0;

          var shotgun_random = Math.floor(Math.random()*3);
         if (shotgun_random == 0) {
            this.scene.shotgun_shoot1.play({volume: 0.2});
         } else if (shotgun_random == 1) {

            this.scene.shotgun_shoot2.play({volume: 0.2});
         } 
         else if (shotgun_random == 2){
   
          this.scene.shotgun_shoot3.play({volume: 0.2});
         }
         
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

export default Player;
