import VirtualJoystick from "./VirtualJoystick.js";
import VirtualJoystickGraphic from "./VirtualJoystick.js";
export default class Level8Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level8Scene" });
  }

  preload() {
    this.load.image("jet1", "assets/images/planes/jet1.png");
    this.load.image("jet2", "assets/images/planes/jet2.png");
    this.load.image(
      "earthBackground",
      "assets/images/backgrounds/level8/Earth.png"
    );
    this.load.audio(
      "level8Music",
      "assets/audio/level8/Pampradion_(feat._Zabutom).mp3"
    );
  }
  create() {
    console.log("Level8Scene create start");

    // Add the background and ensure it fits the game screen
    this.background = this.add.image(0, 0, "earthBackground").setOrigin(0, 0);
    this.background.setDisplaySize(this.scale.width, this.scale.height); // Adjust the background size

    // Adding the plane
    this.plane = this.add.sprite(
      this.scale.width * 0.1,
      this.scale.height / 2,
      "jet1"
    );
    this.plane.setScale(0.5);

    // Adding the joystick
    this.joystick = new VirtualJoystickGraphic(this, 100, 500);

    // Initialize and play background music
    this.music = this.sound.add("level8Music", { loop: true, volume: 0.5 });
    this.music.play();

    console.log("Level8Scene create end");
  }

  update() {
    if (this.joystick && this.joystick.dragging) {
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
    } else {
      this.changeTimer = null;
      this.plane.setTexture("jet1");
      this.plane.setScale(0.2);
    }

    // Add additional update logic needed for Level8 here...
  }
}
