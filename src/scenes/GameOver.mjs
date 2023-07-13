class GameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
    // declare objects
  }

  preload() {
    //get canvas
    this.canvas = this.sys.game.canvas;
  }

  create() {
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.add
      .text(screenCenterX, screenCenterY - 100, "Game Over!", {
        fontFamily: "100pt Teko",
        color: "red",
      })
      .setOrigin(0.5);
    this.add
      .text(screenCenterX, screenCenterY, "Click to Restart!", {
        fontFamily: "Share Tech Mono",
        fontSize: "50px",
        color: "white",
      })
      .setOrigin(0.5);

    this.add
      .text(
        screenCenterX,
        screenCenterY + 100,
        "KILLS: " + localStorage.getItem("killCount")
      )
      .setOrigin(0.5);
    this.input.on("pointerdown", () => this.scene.start("mainMenu"));
  }
}

export default GameOver;
