import VirtualJoystick from "./VirtualJoystick.js";
import VirtualJoystickGraphic from "./VirtualJoystick.js";

export default class Level8Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level8Scene" });
  }

  preload() {
    this.load.image("jet1", "assets/images/planes/jet1.png");
    this.load.image("jet2", "assets/images/planes/jet2.png");

    // Load Level 8 specific backgrounds
    this.load.image("Earth", "assets/images/backgrounds/level8/Earth.png");
    this.load.image(
      "StarsSmall",
      "assets/images/backgrounds/level8/Stars Small_1.png"
    );
    this.load.image(
      "StarsBig",
      "assets/images/backgrounds/level8/Stars-Big_1_1_PC.png"
    );
    this.load.image(
      "NebulaBlue",
      "assets/images/backgrounds/level8/Nebula Blue.png"
    );

    // Load Level 8 music
    this.load.audio(
      "level8Music",
      "assets/audio/level8/Pampradion_(feat._Zabutom).mp3"
    );
  }
  create() {
    this.createBackground("Earth", 0);
    this.createBackground("StarsSmall", 1);
    this.createBackground("StarsBig", 2);
    this.createBackground("NebulaBlue", 3);

    this.music = this.sound.add("level8Music", { loop: true });
    this.music.play();

    this.plane = this.add.sprite(
      this.scale.width * 0.1,
      this.scale.height / 2,
      "jet1"
    );
    this.plane.setScale(0.5);

    this.joystick = new VirtualJoystickGraphic(this, 100, 500);

    this.time.addEvent({
      delay: 20000,
      callback: () => {
        this.tweens.add({ targets: this.layer1, alpha: 0, duration: 1000 });
        this.tweens.add({ targets: this.layer2, alpha: 1, duration: 1000 });
      }
    });

    this.time.addEvent({
      delay: 30000,
      callback: () => {
        this.tweens.add({ targets: this.layer3, alpha: 1, duration: 1000 });
      }
    });
  }

  createBackground(key, layer) {
    this[`layer${layer}`] = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, key)
      .setOrigin(0, 0)
      .setAlpha(layer === 0 ? 1 : 0);
  }

  update() {
    ["layer2", "layer3"].forEach((layer, i) => {
      if (this[layer]) {
        this[layer].tilePositionX += [0.5, 1][i];
      }
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
        this.resetPlaneToDefault();
      }
    } else {
      this.resetPlaneToDefault();
    }
  }

  resetPlaneToDefault() {
    this.changeTimer = null;
    this.plane.setTexture("jet1");
    this.plane.setScale(0.2);
  }
}
