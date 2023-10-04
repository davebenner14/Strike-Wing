import VirtualJoystick from "./VirtualJoystick.js";
import VirtualJoystickGraphic from "./VirtualJoystick.js";

export default class Level3Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level3Scene" });
  }

  preload() {
    this.load.audio("barranca", "assets/audio/GRAEDA_-_Barranca.mp3");
    this.load.image("far", "assets/images/backgrounds/level3/far.png");
    this.load.image("sand", "assets/images/backgrounds/level3/sand.png");
    this.load.image(
      "foreground",
      "assets/images/backgrounds/level3/foregound-merged.png"
    );
    this.load.image("jet1", "assets/images/planes/jet1.png");
    this.load.image("jet2", "assets/images/planes/jet2.png");
  }

  create() {
    console.log("Level3Scene create start");

    document.getElementById("game-title").style.display = "none";

    this.music = this.sound.add("barranca", { loop: true });
    this.music.play();

    try {
      console.log("Loading assets...");

      this.far = this.add.sprite(0, 0, "far").setOrigin(0, 0);
      this.far.displayWidth = this.scale.width;
      this.far.displayHeight = this.scale.height;

      this.initBackgroundSprite("sand", "sand");
      this.initBackgroundSprite("foreground", "foreground");

      this.plane = this.add.sprite(
        this.scale.width * 0.1,
        this.scale.height / 2,
        "jet1"
      );
      this.plane.setScale(0.5);

      this.joystick = new VirtualJoystickGraphic(this, 100, 500);

      console.log("Level3Scene create end");
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
    this.updateBackgroundPosition("sand", 0.5);
    this.updateBackgroundPosition("foreground", 1);

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
