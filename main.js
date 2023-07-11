import Phaser from "phaser";
import PlayGame from "./src/scenes/PlayGame.mjs";
import MainMenu from "./src/scenes/MainMenu.mjs";
import GameOver from "./src/scenes/GameOver.mjs";
import GameOver from "./src/scenes/GameOver.mjs";
import MainMenu from "./src/scenes/MainMenu.mjs";

const screenHeight = screen.availHeight - 200;
const screenWidth = screen.availWidth;

var config = {
  type: Phaser.AUTO,
  width: screenWidth,
  height: screenHeight,
  backgroundColor: "#232633",
  physics: {
    default: "arcade",
    arcade: {
      //debug: true,
      gravity: { y: 300 },
    },
  },
  scene: [MainMenu, PlayGame, GameOver],
};

var game = new Phaser.Game(config);
