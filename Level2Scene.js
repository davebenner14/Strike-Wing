// import VirtualJoystickGraphic from "./VirtualJoystick.js";

// export default class Level2Scene extends Phaser.Scene {
//   constructor() {
//     super({ key: "Level2Scene" });
//     console.log("Level2Scene constructor called");
//   }

//   preload() {
//     console.log("Level2Scene preload started");
//     this.load.audio(
//       "risingWave",
//       "assets/audio/Zabutom_-_Zeta_Force_Level_2_[XM]_(Oscilloscope_View).mp3"
//     );

//     this.load.image("sky", "assets/images/backgrounds/level2/sky.png");
//     this.load.image(
//       "farClouds",
//       "assets/images/backgrounds/level2/far-clouds.png"
//     );
//     this.load.image(
//       "nearClouds",
//       "assets/images/backgrounds/level2/near-clouds.png"
//     );
//     this.load.image(
//       "farMountains",
//       "assets/images/backgrounds/level2/far-mountains.png"
//     );
//     this.load.image(
//       "mountains",
//       "assets/images/backgrounds/level2/mountains.png"
//     );
//     this.load.image("trees", "assets/images/backgrounds/level2/trees.png");
//     this.load.image("jet1", "assets/images/planes/jet1.png");
//     this.load.image("jet2", "assets/images/planes/jet2.png");
//     console.log("Level2Scene preload ended");
//   }
//   create() {
//     console.log("Level2Scene create start");

//     document.getElementById("game-title").style.display = "none";

//     this.music = this.sound.add("risingWave", { loop: true });
//     console.log("Music added:", !!this.music);
//     this.music.play();
//     console.log("Music play called");

//     // Set each layer as tile sprite and set the origin to top-left
//     this.sky = this.add
//       .tileSprite(0, 0, this.scale.width, this.scale.height, "sky")
//       .setOrigin(0, 0);
//     this.farClouds = this.add
//       .tileSprite(0, 0, this.scale.width, this.scale.height, "farClouds")
//       .setOrigin(0, 0);
//     this.nearClouds = this.add
//       .tileSprite(0, 0, this.scale.width, this.scale.height, "nearClouds")
//       .setOrigin(0, 0);
//     this.farMountains = this.add
//       .tileSprite(0, 0, this.scale.width, this.scale.height, "farMountains")
//       .setOrigin(0, 0);
//     this.mountains = this.add
//       .tileSprite(0, 0, this.scale.width, this.scale.height, "mountains")
//       .setOrigin(0, 0);
//     this.trees = this.add
//       .tileSprite(0, 0, this.scale.width, this.scale.height, "trees")
//       .setOrigin(0, 0);

//     this.plane = this.add.sprite(
//       this.scale.width * 0.1,
//       this.scale.height / 2,
//       "jet1"
//     );
//     this.plane.setScale(0.5);

//     this.joystick = new VirtualJoystickGraphic(this, 100, 500);

//     console.log("Level2Scene create end");
//   }

//   update() {
//     this.sky.tilePositionX += 0.1;
//     this.farClouds.tilePositionX += 0.2;
//     this.nearClouds.tilePositionX += 0.3;
//     this.farMountains.tilePositionX += 0.4;
//     this.mountains.tilePositionX += 0.5;
//     this.trees.tilePositionX += 0.6;

//     if (this.joystick.dragging) {
//       const deltaX = this.joystick.stickCircle.x - this.joystick.x;
//       const deltaY = this.joystick.stickCircle.y - this.joystick.y;

//       this.plane.x += deltaX * 0.1;
//       this.plane.y += deltaY * 0.1;

//       if (deltaY != 0) {
//         if (!this.changeTimer) {
//           this.changeTimer = this.time.now;
//         }
//         if (this.time.now - this.changeTimer > 1000) {
//           this.plane.setTexture("jet2");
//           this.plane.setScale(0.25);
//         }
//       } else {
//         this.changeTimer = null;
//         this.plane.setTexture("jet1");
//         this.plane.setScale(0.2);
//       }
//     } else {
//       this.changeTimer = null;
//       this.plane.setTexture("jet1");
//       this.plane.setScale(0.2);
//     }
//   }
// }

import VirtualJoystick from "./VirtualJoystick.js";
import VirtualJoystickGraphic from "./VirtualJoystick.js";

export default class Level2Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level2Scene" });
  }

  preload() {
    this.load.audio(
      "risingWave",
      "assets/audio/Zabutom_-_Zeta_Force_Level_2_[XM]_(Oscilloscope_View).mp3"
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
      .tileSprite(0, 0, this.scale.width, this.scale.height, "background1")
      .setOrigin(0, 0);
    this.farClouds = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, "background2")
      .setOrigin(0, 0);
    this.nearClouds = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, "background3")
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

    this.sky.tilePositionX += 2;
    this.farClouds.tilePositionX += 4;
    this.nearClouds.tilePositionX += 6;

    if (this.joystick.dragging) {
      const deltaX = this.joystick.stickCircle.x - this.joystick.x;
      const deltaY = this.joystick.stickCircle.y - this.joystick.y;

      this.plane.x += deltaX * 0.1;
      this.plane.y += deltaY * 0.1;

      if (deltaY != 0) {
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
