import Player from '../entities/player.mjs';
import Enemy from '../entities/enemy.mjs';
import Bullet from '../entities/Bullet.mjs';
import MuzzleFlash from '../entities/muzzleFlash.mjs';
import HitBlast from '../entities/hitBlast.mjs';

function createAudio(scene) {
   // Music
   scene.music = scene.sound.add('music');
   // shotgun blast
   scene.shotgun_shoot1 = scene.sound.add('shotgun_shoot1');
   scene.shotgun_shoot2 = scene.sound.add('shotgun_shoot2');
   scene.shotgun_shoot3 = scene.sound.add('shotgun_shoot3');

   // reloading shotgun
   scene.shotgun_reload1 = scene.sound.add('shotgun_reload1');
   scene.shotgun_reload2 = scene.sound.add('shotgun_reload2');

   // hit sounds
   scene.fall_ground = scene.sound.add('fall_ground');
   scene.hit_sound1 = scene.sound.add('hit_sound1');
   scene.hit_sound2 = scene.sound.add('hit_sound2');
}

function createAnimations(scene) {
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

   //muzzleflash frames
   scene.anims.create({
      key: 'shoot',
      frames: scene.anims.generateFrameNumbers('muzzleFlash', {
         start: 0,
         end: 11,
      }),
      frameRate: 15,
      repeat: 0,
   });

   //hit blast frames
   scene.anims.create({
      key: 'hit',
      frames: scene.anims.generateFrameNumbers('hitBlast', {
         start: 0,
         end: 15,
      }),
      frameRate: 50,
      repeat: 0,
   });

   //hit blast frames
   scene.anims.create({
      key: 'hotBullet',
      frames: scene.anims.generateFrameNumbers('bullet', {
         start: 0,
         end: 3,
      }),
      frameRate: 20,
      repeat: 0,
   });
}

function createCounter(scene) {
   /*-------------------------------------*
    *                TO-DO                 *
    *                                      *
    * This needs to be made it's own class *
    *        (like the healthbar)          *
    *-------------------------------------*/

   //  CODE FOR DISPLAYING COUNTER
   scene.initialTime = 300;

   let timer;
   let countDownEvent;

   timer = scene.add
      .text(200, 150, 'Time Remaining: ' + formatTime(scene.initialTime), {
         fontSize: '24px',
      })
      .setScrollFactor(0);

   // Each 1000 ms call onEvent
   countDownEvent = scene.time.addEvent({
      delay: 1000,
      callback: sub1second,
      callbackScope: scene,
      loop: true,
   });

   function sub1second() {
      scene.initialTime -= 1; // One second
      timer.setText('Time Remaining: ' + formatTime(scene.initialTime));
      if (scene.initialTime <= 0) {
         console.log('OUT OF TIME');
         this.scene.start('gameOver');
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
   killCounter = scene.add
      .text(200, 175, 'KILLS: ' + localStorage.getItem('killCount'), {
         fontSize: '24px',
      })
      .setScrollFactor(0);
   scene.killCounter = killCounter;
}

function createLevel(scene) {
   const map = scene.make.tilemap({ key: 'tilemap' });

   const wall_tiles = map.addTilesetImage('wall_tiles', 'walls_sheet');
   const bg_tiles = map.addTilesetImage('bg_tiles', 'bg_sheet');
   const object_tiles = map.addTilesetImage('object_tiles', 'objects_sheet');

   scene.bg = map.createLayer('background', bg_tiles).setScale(2);
   scene.extra = map.createLayer('extra-background', bg_tiles).setScale(2);
   scene.walls = map.createLayer('walls', wall_tiles).setScale(2);
   scene.intObjects = map.createLayer('objects', object_tiles).setScale(2);

   scene.animatedTiles.init(map);

   scene.walls.setCollisionByProperty({ collides: true });
   scene.intObjects.setCollisionByProperty({ collides: true });

   //const objectsadd = scene.physics.add.existing(scene.intObjects)
   // objectsadd.setScale(.5)
   //console.log(scene.intObjects.tileset[0].tileData)
   // scene.intObjects.forEach(element => {
   //   console.log('hi')
   // });
   //const objects = scene.physics.add.image(scene.intObject)
   //scene.objects = scene.physics.add.image(scene.intObject)
   //console.log(objects)
   //scene.physics.add.collider(objectsadd, scene.walls, ()=>{console.log('hi')});
}

function createPlayer(scene) {
   scene.player = new Player(scene, 200, 1550);
   scene.player.body = scene.physics.add.body(scene.player);
}

function createGroups(scene) {
   scene.enemies = scene.add.group({
      classType: Enemy,
      maxSize: 200,
      runChildUpdate: true,
   });
   scene.bullets = scene.add.group({
      classType: Bullet,
      maxSize: 10,
      runChildUpdate: true,
   });
   scene.muzzleFlash = scene.add.group({
      classType: MuzzleFlash,
      maxSize: 10,
      runChildUpdate: true,
   });
   scene.hitBlast = scene.add.group({
      classType: HitBlast,
      maxSize: 10,
      runChildUpdate: true,
   });
}

function createCamera(scene) {
   scene.cameras.main.setBounds(0, 0, 3840, 1920);
   scene.cameras.main.setZoom(1.3);
   //scene.cameras.main.postFX.addVignette(0.5, 0.5);
}

export {
   createAudio,
   createAnimations,
   createCounter,
   createLevel,
   createPlayer,
   createGroups,
   createCamera,
};
