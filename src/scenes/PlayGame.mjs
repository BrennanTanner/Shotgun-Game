import Player from "../entities/player.mjs";
import Enemy from "../entities/enemy.mjs";

class PlayGame extends Phaser.Scene {
  constructor() {
    super("playGame");
    // declare objects
    this.player;
    this.platforms;
    this.enemies;
    // this.timedEvent = this.time.delayedCall(3000, this.onEvent, [], this);
  }

  preload() {
    //get canvas
    this.canvas = this.sys.game.canvas;

    // load assets

    //tiles
    this.load.spritesheet({
      key: "city",
      url: "../../res/images/city-tiles.png",
      frameConfig: {
        frameWidth: 16,
        frameHeight: 16,
      },
    });
    //player
    this.load.spritesheet("dude", "../../res/player/Wheelchair-02.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    //enemy
    this.load.spritesheet(
      "chicken",
      "../../res/enemy/Chicken/Idle (32x34).png",
      {
        frameWidth: 32,
        frameHeight: 34,
      }
    );
    // bullets
    this.load.spritesheet(
      "bullet",
      "../../res/bullet/All_Fire_Bullet_Pixel_16x16.png",
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    );
  }

  create() {
    //set w and h from canvas
    let { width, height } = this.canvas;

    // camera
    this.cameras.main.setBounds(0, 0, height * 2, width * 2);

    //background

    //create groups
    this.platforms = this.physics.add.staticGroup();

    this.player = new Player(this, 100, 450);
    console.log(this.player);
    this.player.body = this.physics.add.body(this.player);

    this.enemies = this.add.group({
      classType: Enemy,
      maxSize: 10,
      runChildUpdate: true,
    });

    this.cameras.main.setZoom(1.3);

    //render level
    for (let i = 8; i < width; i += 16) {
      this.platforms.create(i, height - 24, "city", "46");
    }

    this.platforms.create(600, 400, "city", "26");
    this.platforms.create(616, 400, "city", "27");
    this.platforms.create(632, 400, "city", "28");

    this.platforms.create(400, 200, "city", "26");
    this.platforms.create(416, 200, "city", "27");
    this.platforms.create(432, 200, "city", "28");

    this.platforms.create(400, 500, "city", "26");
    this.platforms.create(416, 500, "city", "27");
    this.platforms.create(432, 500, "city", "28");

    this.platforms.create(300, 400, "city", "26");
    this.platforms.create(316, 400, "city", "27");
    this.platforms.create(332, 400, "city", "28");

    this.platforms.create(50, 250, "city", "26");
    this.platforms.create(66, 250, "city", "27");
    this.platforms.create(82, 250, "city", "28");

    this.platforms.create(750, 220, "city", "26");
    this.platforms.create(766, 220, "city", "27");
    this.platforms.create(782, 220, "city", "28");

    this.timedEvent = this.time.delayedCall(3000, this.spawnChicken, [], this);
    this.timedEvent = this.time.delayedCall(1000, this.spawnChicken, [], this);
  }

  spawnChicken() {
    this.enemies.create(500, 420);
  }

  update() {
    this.player.update();
  }
}

export default PlayGame;
