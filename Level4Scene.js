import VirtualJoystick from "./VirtualJoystick.js";
import VirtualJoystickGraphic from "./VirtualJoystick.js";

export default class Level4Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level4Scene" });
  }

  preload() {
    this.load.audio(
      "astroSurfing",
      "assets/audio/level4/Dubmood_&_Zabutom_-_Astro_Surfing.mp3"
    );
    // Load all your images
    for (let i = 0; i <= 11; i++) {
      this.load.image(
        `layer${i}`,
        `assets/images/backgrounds/level4/Layer_000${i}_${i}.png`
      );
    }
    this.load.image("jet1", "assets/images/planes/jet1.png");
    this.load.image("jet2", "assets/images/planes/jet2.png");
  }

  create() {
    console.log("Level4Scene create start");

    document.getElementById("game-title").style.display = "none";

    this.music = this.sound.add("astroSurfing", { loop: true });
    this.music.play();

    try {
      console.log("Loading assets...");

      this.initBackgroundSprite("layer0", "layer0", 3);
      this.initBackgroundSprite("layer1", "layer1", 2.9);

      this.plane = this.add.sprite(
        this.scale.width * 0.1,
        this.scale.height / 2,
        "jet1"
      );
      this.plane.setScale(0.5);

      this.joystick = new VirtualJoystickGraphic(this, 100, 500);

      console.log("Level4Scene create end");
    } catch (error) {
      console.error("Error in create method:", error);
    }
  }

  initBackgroundSprite(varName, assetKey, speed) {
    this[varName + "1"] = this.add.sprite(0, 0, assetKey).setOrigin(0, 0);
    this[varName + "1"].displayWidth = this.scale.width;
    this[varName + "1"].displayHeight = this.scale.height;

    this[varName + "2"] = this.add
      .sprite(this.scale.width, 0, assetKey)
      .setOrigin(0, 0);
    this[varName + "2"].displayWidth = this.scale.width;
    this[varName + "2"].displayHeight = this.scale.height;

    this[varName + "Speed"] = speed;
  }

  update() {
    for (let i = 0; i <= 11; i++) {
      this.updateBackgroundPosition(`layer${i}`, this[`layer${i}Speed`]);
    }
  }

  updateBackgroundPosition(varName, speed) {
    this[varName + "1"].x -= speed;
    this[varName + "2"].x -= speed;

    if (this[varName + "1"].x <= -this.scale.width) {
      this[varName + "1"].x = this[varName + "2"].x + this.scale.width;
    }

    if (this[varName + "2"].x <= -this.scale.width) {
      this[varName + "2"].x = this[varName + "1"].x + this.scale.width;
    }
  }
}
