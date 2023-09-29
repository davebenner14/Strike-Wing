class ArcadeButtons {
  constructor(scene) {
    this.scene = scene;
    this.buttonA = null;
    this.buttonB = null;
    this.buttonBCallback = null;
  }

  createButtons(buttonBCallback) {
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
    console.log("Assigned callback for buttonB:", buttonBCallback);
    this.buttonBCallback = buttonBCallback;
    this.buttonB.on("pointerdown", this.handleButtonBPress, this);
  }

  handleButtonAPress() {
    console.log("Button A Pressed!");
  }

  handleButtonBPress() {
    console.log("Button B Pressed!");
    if (this.buttonBCallback) this.buttonBCallback();
  }
}

export default ArcadeButtons;
