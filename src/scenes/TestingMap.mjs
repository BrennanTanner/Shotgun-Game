import Player from '../entities/player.mjs';
import Enemy from '../entities/enemy.mjs';
import Bullet from '../entities/Bullet.mjs';
import MuzzleFlash from '../entities/muzzleFlash.mjs';
import map from '.../.../res/maps/map.json'

class PlayGame extends Phaser.Scene {
   constructor() {
      super('playGame');
      // declare objects
      this.player;
      this.platforms;
      this.enemies;
   }

   preload() {
      //get canvas
      this.canvas = this.sys.game.canvas;

      // load assets
      this.load.image('left-cap', '/healthbar/barHorizontal_green_left.png');
      this.load.image('middle', '/healthbar/barHorizontal_green_mid.png');
      this.load.image('right-cap', '/healthbar/barHorizontal_green_right.png');

      this.load.image(
         'left-cap-shadow',
         '/healthbar/barHorizontal_shadow_left.png'
      );
      this.load.image(
         'middle-shadow',
         '/healthbar/barHorizontal_shadow_mid.png'
      );
      this.load.image(
         'right-cap-shadow',
         '/healthbar/barHorizontal_shadow_right.png'
      );

      //this.load.image('cursor', '/images/crossair_white.png');

      //loading audio
      // shot-gun sounds
      this.load.audio('shotgun_shoot1', '/audio/shotgun_shot_13.mp3');
      this.load.audio('shotgun_shoot2', '/audio/shotgun_shot_12.mp3');
      this.load.audio('shotgun_shoot3', '/audio/shotgun_shot_09.mp3');

      // shotgun reloading
      this.load.audio('shotgun_reload1', '/audio/shotgun_reload1.mp3');
      this.load.audio('shotgun_reload2', '/audio/shotgun_reload2.mp3');

      // flamthrower sounds
      // this.load.audio('flamethrowerburst', '/audio/flamethrower1.mp3');
      // this.load.audio(
      //    'flamethrower_start',
      //    '/audio/flamethrower-start.mp3'
      // );
      // this.load.audio(
      //    'flamethrower_ongoing',
      //    '/audio/flamethrower-ongoing.mp3'
      // );
      // this.load.audio(
      //    'flamethrower_finish',
      //    '/audio/flamethrower-finish.mp3'
      // );

      // wheel chair sounds
      this.load.audio('fall_ground', '/audio/fall_ground.mp3');

      // this.load.audio(
      //    'wheelchair_start',
      //    '/audio/wheel_chair_start1.mp3'
      // );
      // this.load.audio(
      //    'wheelchair_ongoing',
      //    '/audio/wheel_chair_ongoing.mp3'
      // );
      // this.load.audio(
      //    'wheelchair_finish',
      //    '/audio/wheel_chair_end.mp3'
      // );

      // hit sounds
      // this.load.audio('player_hit', '/audio/body_hit_thud1.mp3');
      // this.load.audio('player_hit', '/audio/glass_breaking.mp3');
      this.load.audio('hit_sound1', '/audio/body_hit1.mp3');
      this.load.audio('hit_sound2', '/audio/body_hit2.mp3');

      //tiles
      this.load.spritesheet({
         key: 'city',
         url: '/images/city-tiles.png',
         frameConfig: {
            frameWidth: 16,
            frameHeight: 16,
         },
      
      });
      this.load.spritesheet({
         url: 'res/maps/Terrain (32x32).png',
         frameConfig: {
            frameWidth: 32,
            frameHeight: 32,
         }
      })
      this.load.spritesheet({
         url: 'res/maps/Decorations (32x32)',
         frameConfig: {
            frameWidth: 32,
            frameHeight: 32,
         }})

      // tileMap
      this.load.tilemapTiledJSON('map', 'res/maps/mockup.json')

      //player
      this.load.spritesheet('chair', '/player/chair-SS-200.png', {
         frameWidth: 200,
         frameHeight: 200,
      });
      this.load.spritesheet('arm', '/player/arm-SS-200.png', {
         frameWidth: 200,
         frameHeight: 200,
      });
      this.load.spritesheet('head', '/player/head-SS-200.png', {
         frameWidth: 200,
         frameHeight: 200,
      });
      //enemy
      this.load.spritesheet('spider-brown', '/enemy/spider/spider-brown.png', {
         frameWidth: 50,
         frameHeight: 50,
      });
      //bullet
      this.load.image('bullet', '/bullets/pellet.png', {
         frameWidth: 5,
         frameHeight: 5,
      });
      this.load.spritesheet('muzzleFlash', '/bullets/firing.png', {
         frameWidth: 132,
         frameHeight: 69,
      });
      this.load.spritesheet('hitExplosion', '/bullets/explosion.jpg', {
         frameWidth: 5,
         frameHeight: 5,
      });
   }

   create() {

      // creating map
      this.make.tilemap({key: "map", tileWidth: 25, tileHeight: 19});
      map.addTilesetImage();

      // audio
      this.shotgun_shoot1 = this.sound.add('shotgun_shoot1');
      this.shotgun_shoot2 = this.sound.add('shotgun_shoot2');
      this.shotgun_shoot3 = this.sound.add('shotgun_shoot3');
      // reloading shotgun
      this.shotgun_reload1 = this.sound.add('shotgun_reload1');
      this.shotgun_reload2 = this.sound.add('shotgun_reload2');
      // flamethrower
      //this.flamethrowerburst = this.sound.add("flamethrowerburst")
      // this.flamethrower_start = this.sound.add("flamethrower_start")
      // this.flamethrower_ongoing = this.sound.add("flamethrower_ongoing")
      // this.flamethrower_finish = this.sound.add("flamethrower_finish")
      // hit sounds
      this.fall_ground = this.sound.add('fall_ground');
      this.hit_sound1 = this.sound.add('hit_sound1');
      this.hit_sound2 = this.sound.add('hit_sound2');

      //  CODE FOR DISPLAYING COUNTER
      this.initialTime = 50;

      let timer;
      let countDownEvent;

      timer = this.add.text(
         32,
         32,
         'Time Remaining: ' + formatTime(this.initialTime),
         { fontSize: '48px' }
      );

      // Each 1000 ms call onEvent
      countDownEvent = this.time.addEvent({
         delay: 1000,
         callback: sub1second,
         callbackScope: this,
         loop: true,
      });

      function sub1second() {
         this.initialTime -= 1; // One second
         timer.setText('Time Remaining: ' + formatTime(this.initialTime));
         if (this.initialTime <= 0) {
            console.log('OUT OF TIME');
         }
      }

      function formatTime(seconds) {
         // Minutes
         var minutes = Math.floor(seconds / 60);
         // Seconds
         var partInSeconds = seconds % 60;
         // Adds left zeros to seconds
         partInSeconds = partInSeconds.toString().padStart(2, '0');
         // Returns formated time
         return `${minutes}:${partInSeconds}`;
      }

      //  CODE FOR DISPLAYING KILL COUNT
      let killCounter;
      killCounter = this.add.text(
         132,
         132,
         'KILLS: ' + localStorage.getItem('killCount'),
         { fontSize: '48px' }
      );
      this.killCounter = killCounter;

      this.input.setDefaultCursor('url(/cursors/crosair_white.cur), pointer');

      //set w and h from canvas
      let { width, height } = this.canvas;

      // camera
      this.cameras.main.setBounds(0, 0, height * 2, width * 2);

      //background

      //create groups
      this.platforms = this.physics.add.staticGroup();

      this.player = new Player(this, 100, 450);
      this.player.body = this.physics.add.body(this.player);

      this.enemies = this.add.group({
         classType: Enemy,
         maxSize: 10,
         runChildUpdate: true,
      });
      this.bullets = this.add.group({
         classType: Bullet,
         maxSize: 10,
         runChildUpdate: true,
      });
      this.muzzleFlash = this.add.group({
         classType: MuzzleFlash,
         maxSize: 10,
         runChildUpdate: true,
      });

      this.cameras.main.setZoom(1.3);
      

      //render level 
      for (let i = 8; i < width; i += 16) {
         this.platforms.create(i, height - 24, 'city', '46');
      }

      this.platforms.create(400, 696, 'city', '28');
      this.platforms.create(400, 680, 'city', '28');
      this.platforms.create(400, 664, 'city', '26');
      this.platforms.create(400, 648, 'city', '27');
      this.platforms.create(400, 632, 'city', '28');

      this.platforms.create(400, 200, 'city', '26');
      this.platforms.create(416, 200, 'city', '27');
      this.platforms.create(432, 200, 'city', '28');

      this.platforms.create(400, 500, 'city', '26');
      this.platforms.create(416, 500, 'city', '27');
      this.platforms.create(432, 500, 'city', '28');

      this.platforms.create(300, 400, 'city', '26');
      this.platforms.create(316, 400, 'city', '27');
      this.platforms.create(332, 400, 'city', '28');

      this.platforms.create(50, 250, 'city', '26');
      this.platforms.create(66, 250, 'city', '27');
      this.platforms.create(82, 250, 'city', '28');

      this.platforms.create(750, 220, 'city', '26');
      this.platforms.create(766, 220, 'city', '27');
      this.platforms.create(782, 220, 'city', '28');

      this.timedEvent = this.time.delayedCall(1000, this.spawnSpider, [], this);
      
   }

   spawnSpider() {
      this.enemies.create(100, 100);
   }

   update() {
      this.killCounter.setText('KILLS: ' + localStorage.getItem('killCount'));
      this.player.update();
   }
}

export default PlayGame;
