import Phaser from "phaser";
import PlayGame from "./src/scenes/PlayGame.mjs";
import TestingMap from "./src/scenes/TestingMap.mjs"

const screenHeight = screen.availHeight - 200;
const screenWidth = screen.availWidth;

var config = {
  type: Phaser.AUTO,
  width: screenWidth,
  height: screenHeight,
  backgroundColor: '#4488aa',
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 300 },
    },
  },
  // PlayGame
  scene: [TestingMap],
};

var game = new Phaser.Game(config);
