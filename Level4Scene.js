import VirtualJoystick from "./VirtualJoystick.js";
import VirtualJoystickGraphic from "./VirtualJoystick.js";

export default class Level4Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level4Scene" });
  }

  preload() {
    this.load.image("jet1", "assets/images/planes/jet1.png");
    this.load.image("jet2", "assets/images/planes/jet2.png");

    this.load.audio(
      "insertNoCoins",
      "assets/audio/level4/Dubmood_-_Insert_No_Coins.mp3"
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
      "layer4Lights",
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
      "layer7Lights",
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
      "layer11",
      "assets/images/backgrounds/level4/Layer_0011_0.png"
    );
  }
  create() {
    console.log("Level4Scene create start");

    const backgrounds = [
      { key: "layer11", speed: 0.2 },
      { key: "layer9", speed: 0.4 },
      { key: "layer8", speed: 0.6 },
      { key: "layer7Lights", speed: 0.7 },
      { key: "layer6", speed: 0.8 },
      { key: "layer5", speed: 1 },
      { key: "layer4Lights", speed: 1.2 },
      { key: "layer3", speed: 1.3 },
      { key: "layer2", speed: 1.3 },
      { key: "layer1", speed: 12 },
      { key: "layer0", speed: 30 }
    ];
    this.backgrounds = [];

    backgrounds.forEach((bg) => {
      const layer1 = this.add.sprite(0, 0, bg.key).setOrigin(0, 0);
      layer1.displayWidth = this.scale.width;
      layer1.displayHeight = this.scale.height;

      const layer2 = this.add
        .sprite(this.scale.width, 0, bg.key)
        .setOrigin(0, 0);
      layer2.displayWidth = this.scale.width;
      layer2.displayHeight = this.scale.height;

      this.backgrounds.push({ layer1, layer2, speed: bg.speed });
    });

    this.music = this.sound.add("insertNoCoins", { loop: true });
    this.music.play();

    this.plane = this.add.sprite(
      this.scale.width * 0.1,
      this.scale.height / 2,
      "jet1"
    );
    this.plane.setScale(0.5);

    this.joystick = new VirtualJoystickGraphic(this, 100, 500);

    console.log("Level4Scene create end");
  }

  update() {
    this.backgrounds.forEach(({ layer1, layer2, speed }) => {
      layer1.x -= speed;
      layer2.x -= speed;

      if (layer1.x <= -this.scale.width) {
        layer1.x = layer2.x + this.scale.width;
      }

      if (layer2.x <= -this.scale.width) {
        layer2.x = layer1.x + this.scale.width;
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
}
