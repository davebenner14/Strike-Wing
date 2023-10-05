import VirtualJoystick from "./VirtualJoystick.js";
import VirtualJoystickGraphic from "./VirtualJoystick.js";

export default class Level2Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level2Scene" });
  }

  preload() {
    this.load.audio(
      "risingWave",
      "assets/audio/Zabutom_-_Zeta_Force_Level_2_[XM]_(Oscilloscope_View).mp3"
    );
    this.load.image("sky", "assets/images/backgrounds/level2/sky.png");
    this.load.image(
      "far-clouds",
      "assets/images/backgrounds/level2/far-clouds.png"
    );
    this.load.image(
      "near-clouds",
      "assets/images/backgrounds/level2/near-clouds.png"
    );
    this.load.image(
      "far-mountains",
      "assets/images/backgrounds/level2/far-mountains.png"
    );
    this.load.image(
      "mountains",
      "assets/images/backgrounds/level2/mountains.png"
    );
    this.load.image("trees", "assets/images/backgrounds/level2/trees.png");
    this.load.image("jet1", "assets/images/planes/jet1.png");
    this.load.image("jet2", "assets/images/planes/jet2.png");
  }
  create() {
    console.log("Level2Scene create start");

    document.getElementById("game-title").style.display = "none";

    this.music = this.sound.add("risingWave", { loop: true });
    this.music.play();

    try {
      console.log("Loading assets...");

      this.sky = this.add.sprite(0, 0, "sky").setOrigin(0, 0);
      this.sky.displayWidth = this.scale.width;
      this.sky.displayHeight = this.scale.height;

      // Initializing two sprites for each background element for seamless scrolling
      this.initBackgroundSprite("farClouds", "far-clouds");
      this.initBackgroundSprite("nearClouds", "near-clouds");
      this.initBackgroundSprite("farMountains", "far-mountains");
      this.initBackgroundSprite("mountains", "mountains");
      this.initBackgroundSprite("trees", "trees");

      this.plane = this.add.sprite(
        this.scale.width * 0.1,
        this.scale.height / 2,
        "jet1"
      );
      this.plane.setScale(0.5);

      this.joystick = new VirtualJoystickGraphic(this, 100, 500);

      console.log("Level2Scene create end");
    } catch (error) {
      console.error("Error in create method:", error);
    }
  }

  initBackgroundSprite(varName, assetKey) {
    this[varName + "1"] = this.add.sprite(0, 0, assetKey).setOrigin(0, 0);
    this[varName + "1"].displayWidth = this.scale.width;
    this[varName + "1"].displayHeight = this.scale.height;

    this[varName + "2"] = this.add
      .sprite(this.scale.width, 0, assetKey)
      .setOrigin(0, 0);
    this[varName + "2"].displayWidth = this.scale.width;
    this[varName + "2"].displayHeight = this.scale.height;
  }

  update() {
    this.updateBackgroundPosition("farClouds", 0.25);
    this.updateBackgroundPosition("nearClouds", 0.5);
    this.updateBackgroundPosition("farMountains", 1);
    this.updateBackgroundPosition("mountains", 1.5);
    this.updateBackgroundPosition("trees", 20);

    if (this.joystick.dragging) {
      const deltaX = this.joystick.stickCircle.x - this.joystick.x;
      const deltaY = this.joystick.stickCircle.y - this.joystick.y;

      this.plane.x += deltaX * 0.1;
      this.plane.y += deltaY * 0.1;

      if (deltaY !== 0) {
        if (!this.changeTimer) {
          this.changeTimer = this.time.now;
        }
        if (this.time.now - this.changeTimer > 1000) {
          this.plane.setTexture("jet2");
          this.plane.setScale(0.25);
        }
      } else {
        this.changeTimer = null;
        this.plane.setTexture("jet1");
        this.plane.setScale(0.2);
      }
    } else {
      this.changeTimer = null;
      this.plane.setTexture("jet1");
      this.plane.setScale(0.2);
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
