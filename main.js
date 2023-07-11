import Phaser from "phaser";
import PlayGame from "./src/scenes/PlayGame.mjs";
import MainMenu from "./src/scenes/MainMenu.mjs";
import GameOver from "./src/scenes/GameOver.mjs";

const screenHeight = screen.availHeight - 250;
const screenWidth = screen.availWidth;

var config = {
  type: Phaser.AUTO,
  width: screenWidth,
  height: screenHeight,
  backgroundColor: "#4488aa",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 300 },
    },
  },
  scene: [MainMenu, PlayGame, GameOver],
};

var game = new Phaser.Game(config);
