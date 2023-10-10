import VirtualJoystick from "./VirtualJoystick.js";
import VirtualJoystickGraphic from "./VirtualJoystick.js";

export default class Level5Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level5Scene" });
  }

  preload() {
    this.load.image("jet1", "assets/images/planes/jet1.png");
    this.load.image("jet2", "assets/images/planes/jet2.png");

    this.load.image("layer6", "assets/images/backgrounds/level5/-6.png");
    this.load.image("layer5", "assets/images/backgrounds/level5/-5.png");
    this.load.image("layer4", "assets/images/backgrounds/level5/-4.png");
    this.load.image("layer3", "assets/images/backgrounds/level5/-3.png");
    this.load.image("layer2", "assets/images/backgrounds/level5/-2.png");
    this.load.image("layer1", "assets/images/backgrounds/level5/-1.png");
    this.load.image("layer0", "assets/images/backgrounds/level5/0.png");

    this.load.audio(
      "level5Music",
      "assets/audio/level5/Zabutom_-_Zeta_force_level_X.mp3"
    );
  }

  create() {
    console.log("Level5Scene create start");

    for (let i = 6; i >= 0; i--) {
      this[`layer${i}1`] = this.add.sprite(0, 0, `layer${i}`).setOrigin(0, 0);
      this[`layer${i}1`].displayWidth = this.scale.width;
      this[`layer${i}1`].displayHeight = this.scale.height;
      this[`layer${i}2`] = this.add
        .sprite(this.scale.width, 0, `layer${i}`)
        .setOrigin(0, 0);
      this[`layer${i}2`].displayWidth = this.scale.width;
      this[`layer${i}2`].displayHeight = this.scale.height;
    }

    this.plane = this.add.sprite(
      this.scale.width * 0.1,
      this.scale.height / 2,
      "jet1"
    );
    this.plane.setScale(0.5);

    this.joystick = new VirtualJoystickGraphic(this, 100, 500);

    this.music = this.sound.add("level5Music", { loop: true });
    this.music.play();

    console.log("Level5Scene create end");
  }

  update() {
    for (let i = 6; i >= 0; i--) {
      let speed = (7 - i) * 0.1;
      if (i === 0) {
        speed = 30; // setting the speed of layer0 to 30
      }
      this.updateBackgroundPosition(`layer${i}`, speed);
    }

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
