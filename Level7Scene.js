import VirtualJoystick from "./VirtualJoystick.js";
import VirtualJoystickGraphic from "./VirtualJoystick.js";

export default class Level7Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level7Scene" });
  }

  preload() {
    this.load.image("jet1", "assets/images/planes/jet1.png");
    this.load.image("jet2", "assets/images/planes/jet2.png");

    for (let i = 1; i <= 5; i++) {
      this.load.image(`L${i}`, `assets/images/backgrounds/level7/L${i}.png`);
    }

    this.load.audio(
      "nightstop",
      "assets/audio/level7/Nightstop_-_Street_Romance.mp3"
    );
  }

  create() {
    console.log("Level7Scene create start");

    const backgrounds = ["L1", "L2", "L3", "L4", "L5"];
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

    this.music = this.sound.add("nightstop", { loop: true });
    this.music.play();

    this.plane = this.add.sprite(
      this.scale.width * 0.1,
      this.scale.height / 2,
      "jet1"
    );
    this.plane.setScale(0.5);

    this.joystick = new VirtualJoystickGraphic(this, 100, 500);

    console.log("Level7Scene create end");
  }

  update() {
    this.backgroundsSpeed = [0.5, 5, 2.1, 2, 20];
    this.backgroundsSpeed.forEach((speed, i) => {
      this.updateBackgroundPosition(`layer${i}`, speed);
    });

    if (this.joystick && this.joystick.dragging) {
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
