import Phaser from 'phaser';
import PlayGame from './src/scenes/PlayGame.mjs';

var config = {
   type: Phaser.AUTO,
   width: 800,
   height: 600,
   physics: {
      default: 'arcade',
      arcade: {
         debug: true,
         gravity: { y: 300 },
      },
   },
   scene: [PlayGame],
};

var game = new Phaser.Game(config);
