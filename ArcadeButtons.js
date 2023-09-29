// ArcadeButtons.js

class ArcadeButtons {
  constructor(scene) {
    this.scene = scene;
    this.buttonA = null;
    this.buttonB = null;
  }

  createButtons() {
    const buttonRadius = 25;
    const buttonColor = 0xff0000;
    const alpha = 0.5;

    // Button A
    this.buttonA = this.scene.add
      .circle(700, 500, buttonRadius, buttonColor)
      .setAlpha(alpha)
      .setInteractive();
    this.buttonA.on("pointerdown", this.handleButtonAPress, this);

    // Button B
    this.buttonB = this.scene.add
      .circle(750, 550, buttonRadius, buttonColor)
      .setAlpha(alpha)
      .setInteractive();
    this.buttonB.on("pointerdown", this.handleButtonBPress, this);
  }

  handleButtonAPress() {
    console.log("Button A Pressed!");
    // Additional logic for Button A
  }

  handleButtonBPress() {
    console.log("Button B Pressed!");
    // Additional logic for Button B
  }
}

export default ArcadeButtons;
