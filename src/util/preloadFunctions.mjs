function loadAudio(scene) {
   // music
   scene.load.audio('music','/audio/no-fear.mp3');
   // shot-gun sounds
   scene.load.audio('shotgun_shoot1', '/audio/shotgun_shot_13.mp3');
   scene.load.audio('shotgun_shoot2', '/audio/shotgun_shot_12.mp3');
   scene.load.audio('shotgun_shoot3', '/audio/shotgun_shot_09.mp3');

   // shotgun reloading
   scene.load.audio('shotgun_reload1', '/audio/shotgun_reload1.mp3');
   scene.load.audio('shotgun_reload2', '/audio/shotgun_reload2.mp3');

   // wheel chair sounds
   scene.load.audio('fall_ground', '/audio/fall_ground.mp3');

   // hit sounds
   scene.load.audio('hit_sound1', '/audio/body_hit1.mp3');
   scene.load.audio('hit_sound2', '/audio/body_hit2.mp3');
}

function loadImages(scene) {
   // health bar
   scene.load.image('left-cap', '/healthbar/barHorizontal_green_left.png');
   scene.load.image('middle', '/healthbar/barHorizontal_green_mid.png');
   scene.load.image('right-cap', '/healthbar/barHorizontal_green_right.png');
   scene.load.image(
      'left-cap-shadow',
      '/healthbar/barHorizontal_shadow_left.png'
   );
   scene.load.image('middle-shadow', '/healthbar/barHorizontal_shadow_mid.png');
   scene.load.image(
      'right-cap-shadow',
      '/healthbar/barHorizontal_shadow_right.png'
   );

   // map tiles
   scene.load.image('walls_sheet', '/images/walls_sheet.png');
   scene.load.image('bg_sheet', '/images/bg_sheet.png');
   scene.load.image('objects_sheet', '/images/objects_sheet.png');

}

function loadSpriteSheets(scene) {
   // player
   scene.load.spritesheet('chair', '/player/chair-SS-200.png', {
      frameWidth: 200,
      frameHeight: 200,
   });
   scene.load.spritesheet('arm', '/player/arm-SS-200.png', {
      frameWidth: 200,
      frameHeight: 200,
   });
   scene.load.spritesheet('head', '/player/head-SS-200.png', {
      frameWidth: 200,
      frameHeight: 200,
   });

   // enemy
   scene.load.spritesheet('spider-brown', '/enemy/spider/spider-brown.png', {
      frameWidth: 50,
      frameHeight: 50,
   });

   // bullet FX
   scene.load.spritesheet('muzzleFlash', '/bullets/firing.png', {
      frameWidth: 132,
      frameHeight: 69,
   });
   scene.load.spritesheet('hitBlast', '/bullets/explosion.png', {
      frameWidth: 139,
      frameHeight: 153,
   });
   scene.load.spritesheet('bullet', '/bullets/pellet.png', {
      frameWidth: 16,
      frameHeight: 16,
   });
}

export { loadAudio, loadImages, loadSpriteSheets };
