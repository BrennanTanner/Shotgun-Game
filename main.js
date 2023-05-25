import Phaser from "phaser";
import PlayGame from "./src/scenes/PlayGame.mjs";

const screenHeight = screen.availHeight - 200;
const screenWidth = screen.availWidth;

var config = {
  type: Phaser.AUTO,
  width: screenWidth,
  height: screenHeight,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 300 },
    },
  },
  scene: [PlayGame],
};

var game = new Phaser.Game(config);
