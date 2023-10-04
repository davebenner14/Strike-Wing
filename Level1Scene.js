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
    this.load.image("jet2", "assets/images/planes/jet2.png");
  }
  create() {
    console.log("Level2Scene create start");

    document.getElementById("game-title").style.display = "none";

    this.music = this.sound.add("risingWave", { loop: true });
    console.log("Music added:", !!this.music);
    this.music.play();
    console.log("Music play called");

    this.sky = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, "sky")
      .setOrigin(0, 0);
    this.farClouds = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, "farClouds")
      .setOrigin(0, 0);
    this.nearClouds = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, "nearClouds")
      .setOrigin(0, 0);
    this.farMountains = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, "farMountains")
      .setOrigin(0, 0);
    this.mountains = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, "mountains")
      .setOrigin(0, 0);
    this.trees = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, "trees")
      .setOrigin(0, 0);

    this.plane = this.add.sprite(
      this.scale.width * 0.1,
      this.scale.height / 2,
      "jet1"
    );
    this.plane.setScale(0.5);

    this.joystick = new VirtualJoystickGraphic(this, 100, 500);

    console.log("Level2Scene create end");
  }

  update() {
    console.log("Update function called");
    // Updating the position of each background layer to create a scrolling effect
    this.sky.tilePositionX += 2; // adjusted from 0.1
    this.farClouds.tilePositionX += 4; // adjusted from 0.2
    this.nearClouds.tilePositionX += 6; // adjusted from 0.3
    this.farMountains.tilePositionX += 8; // adjusted from 0.4
    this.mountains.tilePositionX += 10; // adjusted from 0.5
    this.trees.tilePositionX += 12; // adjusted from 0.6

    // Checking if the joystick is being dragged
    if (this.joystick.dragging) {
      const deltaX = this.joystick.stickCircle.x - this.joystick.x;
      const deltaY = this.joystick.stickCircle.y - this.joystick.y;

      // Updating the position of the plane based on joystick movement
      this.plane.x += deltaX * 0.1;
      this.plane.y += deltaY * 0.1;

      // Checking if there is vertical movement in the joystick
      if (deltaY != 0) {
        // If there is vertical movement, initiate a timer if not already present
        if (!this.changeTimer) {
          this.changeTimer = this.time.now;
        }

        // If a second has passed since the timer started, change the texture of the plane
        if (this.time.now - this.changeTimer > 1000) {
          this.plane.setTexture("jet2");
          this.plane.setScale(0.25);
        }
      } else {
        // If there is no vertical movement, reset the timer and set the plane texture to "jet1"
        this.changeTimer = null;
        this.plane.setTexture("jet1");
        this.plane.setScale(0.2);
      }
    } else {
      // If the joystick is not being dragged, reset the timer and set the plane texture to "jet1"
      this.changeTimer = null;
      this.plane.setTexture("jet1");
      this.plane.setScale(0.2);
    }
  }
}
