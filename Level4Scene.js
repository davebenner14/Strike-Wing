import VirtualJoystick from "./VirtualJoystick.js";
import VirtualJoystickGraphic from "./VirtualJoystick.js";

export default class Level4Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level4Scene" });
  }

  preload() {
    this.load.image("jet1", "assets/images/planes/jet1.png");
    this.load.image("jet2", "assets/images/planes/jet2.png");
    this.load.video(
      "fog",
      "assets/images/backgrounds/level4/vecteezy_animation-of-fog-on-a-black-background-mystery-fog-abstract_9696037_428.mp4"
    );
    this.load.audio(
      "music",
      "assets/audio/level4/Dubmood_&_Zabutom_-_Astro_Surfing.mp3"
    );

    this.load.image(
      "layer0",
      "assets/images/backgrounds/level4/Layer_0000_9.png"
    );
    this.load.image(
      "layer1",
      "assets/images/backgrounds/level4/Layer_0001_8.png"
    );
    this.load.image(
      "layer2",
      "assets/images/backgrounds/level4/Layer_0002_7.png"
    );
    this.load.image(
      "layer3",
      "assets/images/backgrounds/level4/Layer_0003_6.png"
    );
    this.load.image(
      "layer4",
      "assets/images/backgrounds/level4/Layer_0004_Lights.png"
    );
    this.load.image(
      "layer5",
      "assets/images/backgrounds/level4/Layer_0005_5.png"
    );
    this.load.image(
      "layer6",
      "assets/images/backgrounds/level4/Layer_0006_4.png"
    );
    this.load.image(
      "layer7",
      "assets/images/backgrounds/level4/Layer_0007_Lights.png"
    );
    this.load.image(
      "layer8",
      "assets/images/backgrounds/level4/Layer_0008_3.png"
    );
    this.load.image(
      "layer9",
      "assets/images/backgrounds/level4/Layer_0009_2.png"
    );
    this.load.image(
      "layer10",
      "assets/images/backgrounds/level4/Layer_0010_1.png"
    );
    this.load.image(
      "layer11",
      "assets/images/backgrounds/level4/Layer_0011_0.png"
    );
  }

  create() {
    this.music = this.sound.add("music", { loop: true });
    this.music.play();

    this.initBackgroundSprite("layer11", "layer11", 0.1);
    this.initBackgroundSprite("layer10", "layer10", 0.15);
    this.initBackgroundSprite("layer9", "layer9", 0.2);
    this.initBackgroundSprite("layer8", "layer8", 0.25);
    this.initBackgroundSprite("layer7", "layer7", 0.3);
    this.initBackgroundSprite("layer6", "layer6", 0.35);
    this.initBackgroundSprite("layer5", "layer5", 0.4);
    this.initBackgroundSprite("layer4", "layer4", 0.45);
    this.initBackgroundSprite("layer3", "layer3", 1);
    this.initBackgroundSprite("layer2", "layer2", 1);
    this.initBackgroundSprite("layer1", "layer1", 6);
    this.initBackgroundSprite("layer0", "layer0", 6);

    this.fogVideo = this.add.video(
      this.scale.width / 2,
      this.scale.height / 2,
      "fog"
    );
    this.fogVideo.play(true);
    this.fogVideo.setDisplaySize(this.scale.width, this.scale.height);
    this.fogVideo.setAlpha(1);
    this.tweens.add({
      targets: this.fogVideo,
      alpha: 0,
      duration: 20000,
      ease: "Linear",
      onComplete: () => {
        this.fogVideo.destroy();
      }
    });

    this.plane = this.add.sprite(
      this.scale.width * 0.1,
      this.scale.height / 2,
      "jet1"
    );
    this.plane.setScale(0.25);
    this.joystick = new VirtualJoystickGraphic(this, 100, 500);
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
