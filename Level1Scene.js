import VirtualJoystick from "./VirtualJoystick.js";
import VirtualJoystickGraphic from "./VirtualJoystick.js";

export default class Level1Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level1Scene" });
  }

  preload() {
    this.load.audio(
      "risingWave",
      "assets/audio/Dubmood_&_Zabutom_-_Rising_Wave.mp3"
    );
    this.load.image(
      "background1",
      "assets/images/backgrounds/level1/background1.png"
    );
    this.load.image(
      "background2",
      "assets/images/backgrounds/level1/background2.png"
    );
    this.load.image(
      "background3",
      "assets/images/backgrounds/level1/background3.png"
    );
    for (let i = 1; i <= 8; i++) {
      this.load.image(
        `cloud${i}`,
        `assets/images/backgrounds/level1/cloud${i}.png`
      );
    }
    this.load.image("jet1", "assets/images/planes/jet1.png");
  }
  create() {
    this.music = this.sound.add("risingWave", { loop: true });
    this.music.play();

    this.background1 = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, "background1")
      .setOrigin(0, 0);
    this.background2 = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, "background2")
      .setOrigin(0, 0);
    this.background3 = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, "background3")
      .setOrigin(0, 0);

    for (let i = 0; i < 10; i++) {
      const x = Math.random() * this.scale.width;
      const y = Math.random() * this.scale.height * 0.5;
      const cloudIndex = Math.ceil(Math.random() * 8);
      const cloud = this.add.image(x, y, `cloud${cloudIndex}`);
      cloud.setScrollFactor(Math.random() * 0.5 + 0.5);
    }

    this.plane = this.add.sprite(
      this.scale.width * 0.1,
      this.scale.height / 2,
      "jet1"
    );
    this.plane.setScale(0.5);

    // Instantiate your joystick here
    this.joystick = new VirtualJoystickGraphic(this, 100, 500); // set x, y appropriately
  }

  update() {
    // Update background position for scrolling effect
    this.background1.tilePositionX += 0.5;
    this.background2.tilePositionX += 1;
    this.background3.tilePositionX += 1.5;

    // Control the plane with the joystick
    if (this.joystick.dragging) {
      const deltaX = this.joystick.stickCircle.x - this.joystick.x;
      const deltaY = this.joystick.stickCircle.y - this.joystick.y;

      this.plane.x += deltaX * 0.1; // multiply by a speed factor if necessary
      this.plane.y += deltaY * 0.1; // multiply by a speed factor if necessary
    }
  }
}
