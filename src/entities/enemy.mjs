import HealthBar from './HealthBar.mjs';

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'spider-brown');
    this.enemy = this.scene.physics.add
      .existing(this)
      .setSize(20, 20)
      .setInteractive({
        cursor: 'url(../../res/cursors/crosair_red.cur), pointer',
      });
    this.enemy.setOffset(15, 30).setOrigin(0.5, 0.8);

    // render enemy
    this.enemy.setCollideWorldBounds(true);
    this.enemy.setBounce(0);
    this.enemy.mass = 0.3;

    //0 = none, 1 = floor, 2 = right, 3 = cieling, 4 = left
    this.wall = 0;
    this.flippedWall = false;

    this.patience = 5;
    this.agro = true;
    this.direction = 1;

    this.jumpAngle0 = 0;
    this.jumpAngle1 = 0;
    this.upRotation = 0;

    //define enemy animations
    scene.anims.create({
      key: 'run',
      frames: scene.anims.generateFrameNumbers('spider-brown', {
        start: 3,
        end: 8,
      }),
      frameRate: 25,
      repeat: -1,
    });
    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('spider-brown', {
        start: 2,
        end: 2,
      }),
    });
    scene.anims.create({
      key: 'up',
      frames: scene.anims.generateFrameNumbers('spider-brown', {
        start: 1,
        end: 1,
      }),
    });
    scene.anims.create({
      key: 'down',
      frames: scene.anims.generateFrameNumbers('spider-brown', {
        start: 0,
        end: 0,
      }),
    });

    // add collison detection
    scene.physics.add.collider(this.enemy, scene.platforms);
    scene.physics.add.collider(
      this.enemy,
      scene.bullets,
      this.bulletCollision.bind(this)
    );
    scene.physics.add.collider(
      this.enemy,
      scene.player.player,
      this.playerCollision.bind(this)
    );
  }

  update() {
    this.enemyMovement();
  }

  getAngleToPoint(pointX, pointY) {
    return Phaser.Math.Angle.Between(
      pointX,
      pointY,
      this.enemy.x,
      this.enemy.y
    );
  }

  getDistanceToPoint(pointX, pointY) {
    return Phaser.Math.Distance.Between(
      pointX,
      pointY,
      this.enemy.x,
      this.enemy.y
    );
  }

  toggleAgro() {
    this.agro = !this.agro;
    this.patience = 5;
    this.direction = -this.direction;
  }

  lungeAtPlayer() {
    const angleToPlayer = this.getAngleToPoint(
      this.scene.player.physics.object1.x,
      this.scene.player.physics.object1.y
    );

    this.patience--;

    this.enemy.anims.play('up', true);
    if (this.enemy.body.touching.down) {
      const angle = this.scene.physics.velocityFromRotation(angleToPlayer);
      this.enemy.body.setVelocity(
        angle.x * 5 * -1 + this.enemy.body.velocity.x,
        angle.y * 5 * -1 + this.enemy.body.velocity.y
      );
    }
  }

  switchWall() {
    switch (this.wall) {
      case 1:
        this.jumpAngle0 = 1;
        this.jumpAngle1 = 2;
        this.upRotation = 0;
        this.enemy.body.setGravity(0, 300);
        break;
      case 2:
        this.jumpAngle0 = 2.5;
        this.jumpAngle1 = -2.5;
        this.upRotation = -1.5;
        this.enemy.body.setGravity(300, -300);
        break;
      case 3:
        this.jumpAngle0 = -2;
        this.jumpAngle1 = -1;
        this.upRotation = 3;
        this.enemy.body.setGravity(0, -600);

        break;
      case 4:
        this.jumpAngle0 = 0.5;
        this.jumpAngle1 = -0.5;
        this.upRotation = 1.5;
        this.enemy.body.setGravity(-300, -300);
        break;

      default:
        this.jumpAngle0 = 1;
        this.jumpAngle1 = 2;
        this.upRotation = 0;
        this.enemy.body.setGravity(0, 300);
        break;
    }
  }

  isTouchingTwoWalls() {
    let wallsTouching = 0;
    if (this.enemy.body.touching.down) {
      wallsTouching++;
      if (!this.flippedWall) this.wall = 1;
      if (this.direction == -1) this.direction = 1;
    }
    if (this.enemy.body.touching.right) {
      wallsTouching++;
      if (!this.flippedWall) this.wall = 2;
      if (this.direction == -1) this.direction = 1;
    }
    if (this.enemy.body.touching.up) {
      wallsTouching++;
      if (!this.flippedWall) this.wall = 3;
      if (this.direction == 1) this.direction = -1;
    }
    if (this.enemy.body.touching.left) {
      wallsTouching++;
      if (!this.flippedWall) this.wall = 4;
      if (this.direction == -1) this.direction = 1;
    }

    if (wallsTouching > 1) {
      return true;
    } else if (wallsTouching == 1) {
      this.flippedWall == false;
      this.switchWall();
      return false;
    } else {
      this.flippedWall == false;
      this.wall = 0;
      this.switchWall();
      return false;
    }
  }

  rotateEnemy() {
    if (this.upRotation == 3) {
      if (
        this.enemy.rotation > -this.upRotation - 0.3 &&
        this.enemy.rotation > this.upRotation - 0.3
      ) {
        this.enemy.rotation += 0.2;
      } else if (
        this.enemy.rotation < -this.upRotation - 0.3 &&
        this.enemy.rotation < this.upRotation - 0.3
      ) {
        this.enemy.rotation -= 0.2;
      } else {
        this.enemy.rotation = this.upRotation;
      }
    } else {
      if (
        this.enemy.rotation > this.upRotation + 0.2 &&
        this.enemy.rotation > this.upRotation - 0.2
      ) {
        this.enemy.rotation -= 0.1;
      } else if (
        this.enemy.rotation < this.upRotation + 0.2 &&
        this.enemy.rotation < this.upRotation - 0.2
      ) {
        this.enemy.rotation += 0.1;
      } else {
        this.enemy.rotation = this.upRotation;
      }
    }
  }

  enemyRun(negativeChanger) {
    this.enemy.anims.play('run', true);

    if (this.wall == 1 || this.wall == 3) {
      if (
        this.enemy.body.velocity.x < 200 &&
        this.enemy.body.velocity.x > -200
      ) {
        this.enemy.setVelocityX(
          (this.enemy.body.velocity.x += 10 * this.direction * negativeChanger)
        );
      }
    } else {
      if (this.enemy.body.velocity.y > -200 && this.enemy.body.velocity.y < 200)
        this.enemy.setVelocityY(
          (this.enemy.body.velocity.y -= 10 * this.direction * negativeChanger)
        );
    }
  }

  enemyMovement() {
    const angleToPlayer = this.getAngleToPoint(
      this.scene.player.physics.object1.x,
      this.scene.player.physics.object1.y
    );
    // console.log(this.scene);
    if (this.isTouchingTwoWalls()) {
      this.switchWall();
      this.flippedWall == true;
    }

    if (this.enemy.body.velocity.x < 0 || this.enemy.body.velocity.y < 0) {
      this.enemy.flipX = true;
    } else {
      this.enemy.flipX = false;
    }

    if (this.patience <= 0) {
      const distanceToPlayer = this.getDistanceToPoint(
        this.scene.player.physics.object1.x,
        this.scene.player.physics.object1.y
      );
      if (distanceToPlayer <= 150) {
        this.patience = 5;
      }
    }

    if (this.wall != 0) {
      if (
        angleToPlayer > this.jumpAngle1 &&
        this.enemy.rotation == this.upRotation
      ) {
        this.enemyRun(1);
      } else if (
        angleToPlayer < this.jumpAngle0 &&
        this.enemy.rotation == this.upRotation
      ) {
        this.enemyRun(-1);
      } else if (this.enemy.rotation == this.upRotation) {
        if (this.patience > 0) {
          this.lungeAtPlayer();
        } else {
          const angleToCenter = this.getAngleToPoint(
            this.scene.physics.world.bounds.centerX,
            this.scene.physics.world.bounds.centerY
          );
          if (this.jumpAngle1) {
            if (
              angleToCenter < this.jumpAngle0 &&
              this.enemy.rotation == this.upRotation
            ) {
              this.enemyRun(-1);
            } else if (
              angleToCenter > this.jumpAngle1 &&
              this.enemy.rotation == this.upRotation
            ) {
              this.enemyRun(1);
            }
          }
        }
      } else {
        if (this.wall == 1 || this.wall == 3) {
          //decay velocity when touching the ground
          const friction = this.enemy.mass * 10;
          if (this.enemy.body.velocity.x > friction) {
            this.enemy.setVelocityX(this.enemy.body.velocity.x - friction);
          } else if (this.enemy.body.velocity.x < -friction) {
            this.enemy.setVelocityX(this.enemy.body.velocity.x + friction);
          } else if (
            this.enemy.body.velocity.x < friction &&
            this.enemy.body.velocity.x > -friction
          ) {
            this.rotateEnemy();
            this.enemy.anims.play('idle', true);
            this.enemy.setVelocityX(0);
            this.enemy.setAngularVelocity(0);
          }
        } else {
          //decay velocity when touching the walls
          const friction = this.enemy.mass * 10;
          if (this.enemy.body.velocity.y > friction) {
            this.enemy.setVelocityY(this.enemy.body.velocity.y - friction);
          } else if (this.enemy.body.velocity.y < -friction) {
            this.enemy.setVelocityY(this.enemy.body.velocity.y + friction);
          } else if (
            this.enemy.body.velocity.y < friction &&
            this.enemy.body.velocity.y > -friction
          ) {
            this.rotateEnemy();
            this.enemy.anims.play('idle', true);
            this.enemy.setVelocityY(0);
            this.enemy.setAngularVelocity(0);
          }
        }
      }
    } else {
      this.rotateEnemy();

      if (this.enemy.body.velocity.y > 20) {
        this.enemy.anims.play('down', true);
      } else if (this.enemy.body.velocity.y > 20) {
        this.enemy.anims.play('up', true);
      } else {
        this.enemy.anims.play('run', true);
      }

      //this.enemy.setVelocityX(0);
    }
  }

  playerCollision() {
    this.patience = 5;
    if (this.scene.player.invincible == false) {
      this.scene.player.healthBar.damage(-5);
      this.scene.player.setInvincible();
    }
  }

  bulletCollision() {
    this.enemy.anims.play('down', true);
  }
}

export default Enemy;
