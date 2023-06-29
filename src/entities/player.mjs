import HealthBar from './HealthBar.mjs';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'chair');
    this.time = 0;
    this.invincible = false;

    //set the scene
    this.scene = scene;

    //  Our container
    this.player = scene.add.container(x, y + 193);

    //  Create some sprites - positions are relative to the Container x/y
    this.chair = scene.add.sprite(0, 0, 'chair').setScale(0.4);
    this.head = scene.add
      .sprite(9, -25, 'head')
      .setScale(0.4)
      .setOrigin(0.4, 0.71);
    this.arm = scene.add
      .sprite(-2, -27, 'arm')
      .setScale(0.4)
      .setOrigin(0.25, 0.2);
    this.player.add([this.chair, this.head, this.arm]);

    scene.physics.world.enable(this.player);
    //scene.physics.world.enable(this.head);
    //this.head.body.setAllowGravity(false).setCircle(40);

    //set camera
    scene.cameras.main.startFollow(this.player, true);

    // render player arm (offsets it so it rotates correctly on the body)
    this.player.body
      .setCollideWorldBounds(true)
      .setBounce(0.4)
      .setOffset(-35, -35);

    this.player.body.mass = 1;

    //define player animations
    scene.anims.create({
      key: 'arm',
      frames: scene.anims.generateFrameNumbers('arm', { start: 1 }),
    });
    scene.anims.create({
      key: 'armHand',
      frames: scene.anims.generateFrameNumbers('arm', { start: 0 }),
    });

    scene.anims.create({
      key: 'restFace',
      frames: scene.anims.generateFrameNumbers('head', { start: 0 }),
    });
    scene.anims.create({
      key: 'glareFace',
      frames: scene.anims.generateFrameNumbers('head', { start: 1 }),
    });
    scene.anims.create({
      key: 'happyFace',
      frames: scene.anims.generateFrameNumbers('head', { start: 2 }),
    });
    scene.anims.create({
      key: 'angryFace',
      frames: scene.anims.generateFrameNumbers('head', { start: 3 }),
    });
    scene.anims.create({
      key: 'oofFace',
      frames: scene.anims.generateFrameNumbers('head', { start: 4 }),
    });

    scene.anims.create({
      key: 'chair',
      frames: scene.anims.generateFrameNumbers('chair', { start: 0 }),
    });

    // add collision detection
    this.physics = scene.physics.add.collider(
      this.player.body,
      scene.platforms
    );
    scene.physics.add.collider(this.head, scene.platforms, this.rollHead);
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
    this.chair.anims.play('chair');

    //load player chair
    if (this.invincible) {
      this.head.anims.play('oofFace');
    } else {
      this.head.anims.play('angryFace');
    }

    // plays sound when touches the ground
    var hastouchedtheground = false;
    if (this.player.body.touching.down) {
      if (hastouchedtheground == false) {
        this.scene.fall_ground.play({ volume: 0.2 });
        hastouchedtheground = true;
      } else {
        hastouchedtheground = false;
      }
    }

    //decay velocity when touching the ground
    if (this.player.body.touching.down) {
      const friction = this.player.body.mass * 10;
      if (this.player.body.velocity.x > friction) {
        this.player.body.setVelocityX(this.player.body.velocity.x - friction);
        this.player.body.setAngularVelocity(this.player.body.velocity.x - 10);
      } else if (this.player.body.velocity.x < -friction) {
        this.player.body.setVelocityX(this.player.body.velocity.x + friction);
        this.player.body.setAngularVelocity(this.player.body.velocity.x + 10);
      } else if (
        this.player.body.velocity.x < friction &&
        this.player.body.velocity.x > -friction
      ) {
        if (this.player.rotation > 0.2 && this.player.rotation > -0.2) {
          this.player.rotation -= 0.1;
        } else if (this.player.rotation < 0.2 && this.player.rotation < -0.2) {
          this.player.rotation += 0.1;
        }
        this.player.body.setVelocityX(0);
        this.player.body.setAngularVelocity(0);
        this.head.anims.play('restFace');
      }
    }
  }

  setInvincible(time = 1000) {
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
      this.player.x,
      this.player.y,
      pointer.worldX,
      pointer.worldY
    );

    this.time++;
    if (angleToPointer > 0) {
      this.arm.anims.play('arm');
      this.arm.rotation =
        angleToPointer - this.player.rotation - (angleToPointer * 2) / 10;
    } else {
      this.arm.anims.play('armHand');
      this.arm.rotation =
        angleToPointer - this.player.rotation + (angleToPointer * 2) / 10;
    }

    var shotgun_random = Math.floor(Math.random() * 3);

    // shooting shotgun
    if (this.activePointer.isDown && this.time > 30) {
      const angle = this.scene.physics.velocityFromRotation(angleToPointer);
      this.player.body.setVelocity(
        angle.x * 5 * -1 + this.player.body.velocity.x,
        angle.y * 5 * -1 + this.player.body.velocity.y
      );

      this.player.body.setAngularVelocity(
        (this.player.body.velocity.y * this.player.body.velocity.x) / 100
      );

      this.scene.bullets
        .create(this.player.body.x + 48, this.player.body.y + 48)
        .setVelocity(
          angle.x * 30.5 + this.player.body.velocity.x - (angle.x + angle.y),
          angle.y * 30.5 + this.player.body.velocity.y + (angle.x - angle.y)
        );

      this.scene.bullets
        .create(this.player.body.x + 48, this.player.body.y + 48)
        .setVelocity(
          angle.x * 30 + this.player.body.velocity.x,
          angle.y * 30 + this.player.body.velocity.y
        );

      this.scene.bullets
        .create(this.player.body.x + 48, this.player.body.y + 48)
        .setVelocity(
          angle.x * 30.5 + this.player.body.velocity.x + (angle.y - angle.x),
          angle.y * 30.5 + this.player.body.velocity.y - (angle.y + angle.x)
        );

      // audio for shooting shotgun
      this.time = 0;

      var shotgun_random = Math.floor(Math.random() * 3);
      if (shotgun_random == 0) {
        this.scene.shotgun_shoot1.play({ volume: 0.2 });
      } else if (shotgun_random == 1) {
        this.scene.shotgun_shoot2.play({ volume: 0.2 });
      } else if (shotgun_random == 2) {
      }
      this.scene.shotgun_shoot3.play({ volume: 0.2 });
    }
  }
  rollHead() {}

  hitEnemy() {
    // Decrease the player's health (you can adjust the amount based on your game's rules)
    this.healthBar.update(this.healthBar.initialValue - 10);
    this.head.anims.play('glareFace');
    // Check if the player's health has reached zero or below
    if (this.healthBar.value <= 0) {
      // Implement your logic for player death
    }
  }
}

export default Player;
