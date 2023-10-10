import VirtualJoystick from "./VirtualJoystick.js";
import VirtualJoystickGraphic from "./VirtualJoystick.js";

export default class Level6Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level6Scene" });
  }

  preload() {
    this.load.image("jet1", "assets/images/planes/jet1.png");
    this.load.image("jet2", "assets/images/planes/jet2.png");
    this.load.image("sky", "assets/images/backgrounds/level6/sky.png");
    this.load.image(
      "cloud_lonely",
      "assets/images/backgrounds/level6/cloud_lonely.png"
    );
    this.load.image(
      "clouds_bg",
      "assets/images/backgrounds/level6/clouds_bg.png"
    );
    this.load.image(
      "glacial_mountains",
      "assets/images/backgrounds/level6/glacial_mountains.png"
    );
    this.load.image(
      "clouds_mg_3",
      "assets/images/backgrounds/level6/clouds_mg_3.png"
    );
    this.load.image(
      "clouds_mg_2",
      "assets/images/backgrounds/level6/clouds_mg_2.png"
    );
    this.load.image(
      "clouds_mg_1",
      "assets/images/backgrounds/level6/clouds_mg_1.png"
    );
    this.load.audio(
      "level6Music",
      "assets/audio/level6/Dubmood_-_Chiptune.mp3"
    );
  }

  create() {
    const backgrounds = [
      "sky",
      "cloud_lonely",
      "clouds_bg",
      "glacial_mountains",
      "clouds_mg_3",
      "clouds_mg_2"
    ];
    backgrounds.forEach((bg, i) => {
      this[`layer${i}1`] = this.add.sprite(0, 0, bg).setOrigin(0, 0);
      this[`layer${i}1`].displayWidth = this.scale.width;
      this[`layer${i}1`].displayHeight = this.scale.height;
      this[`layer${i}2`] = this.add
        .sprite(this.scale.width, 0, bg)
        .setOrigin(0, 0);
      this[`layer${i}2`].displayWidth = this.scale.width;
      this[`layer${i}2`].displayHeight = this.scale.height;
    });

    this.plane = this.add.sprite(
      this.scale.width * 0.1,
      this.scale.height / 2,
      "jet1"
    );
    this.plane.setScale(0.5);

    this.joystick = new VirtualJoystickGraphic(this, 100, 500);

    this.music = this.sound.add("level6Music", { loop: true });
    this.music.play();

    this.layer61 = this.add.sprite(0, 0, "clouds_mg_1").setOrigin(0, 0);
    this.layer61.displayWidth = this.scale.width;
    this.layer61.displayHeight = this.scale.height;
    this.layer62 = this.add
      .sprite(this.scale.width, 0, "clouds_mg_1")
      .setOrigin(0, 0);
    this.layer62.displayWidth = this.scale.width;
    this.layer62.displayHeight = this.scale.height;
  }

  update() {
    this.updateBackgroundPosition("layer0", 1);
    this.updateBackgroundPosition("layer1", 2);
    this.updateBackgroundPosition("layer2", 3);
    this.updateBackgroundPosition("layer3", 4);
    this.updateBackgroundPosition("layer4", 8);
    this.updateBackgroundPosition("layer5", 15);
    this.updateBackgroundPosition("layer6", 30);

    const deltaX = this.joystick.stickCircle.x - this.joystick.x;
    const deltaY = this.joystick.stickCircle.y - this.joystick.y;
    this.plane.x += deltaX * 0.1;
    this.plane.y += deltaY * 0.1;

    if (deltaY !== 0) {
      if (!this.changeTimer) this.changeTimer = this.time.now;
      if (this.time.now - this.changeTimer > 1000) {
        this.plane.setTexture("jet2");
        this.plane.setScale(0.25);
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
