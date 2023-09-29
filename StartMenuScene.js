import VirtualJoystick from "./VirtualJoystick.js";
import ArcadeButtons from "./ArcadeButtons.js";

class StartMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartMenuScene" });
    this.inputCooldown = false;
    this.menuItems = ["Start Game", "Story"];
    this.selectedItem = 0;
    this.menuTexts = [];
    this.lastDirection = null;
  }

  preload() {
    this.load.audio(
      "titleMusic",
      "assets/audio/Dubmood___Cydonian_Sky_Part_1_(2000_version).mp3"
    );
    this.load.audio("clickSound", "assets/audio/click-button-menu-147349.mp3");
    this.load.audio("selectSound", "assets/audio/level-passed-142971.mp3");
  }
  create() {
    this.cameras.main.setBackgroundColor("#000");

    let yOffsetPercentage = 10;
    let calculatedY =
      this.sys.game.config.height -
      this.sys.game.config.height * (yOffsetPercentage / 100);
    this.virtualJoystick = new VirtualJoystick(this, 100, calculatedY);
    this.virtualJoystick.draw();
    this.arcadeButtons = new ArcadeButtons(this);
    this.arcadeButtons.createButtons();

    this.pressStartText = this.add
      .text(this.cameras.main.centerX, 400, "Press Start", {
        fontFamily: '"Press Start 2P"',
        fontSize: "24px",
        fill: "#fff"
      })
      .setOrigin(0.5, 0.5);

    this.startTween = this.tweens.add({
      targets: this.pressStartText,
      alpha: 0,
      duration: 500,
      ease: "Linear",
      yoyo: true,
      repeat: -1
    });

    this.input.on("pointerdown", () => {
      this.sound.play("selectSound");

      this.showMenu();
    });

    this.input.keyboard.on("keydown-ENTER", () => {
      this.showMenu();
    });
  }
  changeSelectedItem(newIndex) {
    console.log(`Selected index changed to ${newIndex}`);
    this.menuTexts.forEach((text) => text.destroy());
    this.menuTexts = [];
    for (let i = 0; i < this.menuItems.length; i++) {
      let yPosition = 500 + i * 50;
      let color = i === newIndex ? "#ff00ff" : "#fff";
      let text = this.add
        .text(this.cameras.main.centerX, yPosition, this.menuItems[i], {
          fontFamily: '"Press Start 2P"',
          fontSize: "24px",
          fill: color
        })
        .setOrigin(0.5, 0.5)
        .setInteractive({ useHandCursor: true });

      text.on(
        "pointerdown",
        () => {
          this.sound.play("clickSound");
          this.changeSelectedItem(i);
        },
        this
      );
      this.menuTexts.push(text);
    }
    this.selectedItem = newIndex;
  }

  showMenu() {
    this.virtualJoystick.show();
    this.startTween.stop();
    this.pressStartText.setAlpha(0);
    document.getElementById("game-title").style.display = "block";

    let menuItems = ["Start Game", "Story"];
    let selectedItem = 0;
    let menuTexts = [];

    let changeSelectedItem = (newIndex) => {
      console.log(`Selected index changed to ${newIndex}`);
      menuTexts.forEach((text) => text.destroy());
      menuTexts = [];
      for (let i = 0; i < menuItems.length; i++) {
        let yPosition = 500 + i * 50;
        let color = i === newIndex ? "#ff00ff" : "#fff";
        let text = this.add
          .text(this.cameras.main.centerX, yPosition, menuItems[i], {
            fontFamily: '"Press Start 2P"',
            fontSize: "24px",
            fill: color
          })
          .setOrigin(0.5, 0.5)
          .setInteractive({ useHandCursor: true });

        text.on(
          "pointerdown",
          () => {
            this.sound.play("clickSound");
            changeSelectedItem(i);
          },
          this
        );
        menuTexts.push(text);
      }
      selectedItem = newIndex;
    };

    changeSelectedItem(selectedItem);

    this.input.keyboard.on("keydown-UP", () => {
      this.sound.play("clickSound");
      changeSelectedItem(
        (selectedItem - 1 + menuItems.length) % menuItems.length
      );
    });

    this.input.keyboard.on("keydown-DOWN", () => {
      this.sound.play("clickSound");
      changeSelectedItem((selectedItem + 1) % menuItems.length);
    });

    this.input.keyboard.on("keydown-ENTER", () => {
      this.selectOption(selectedItem);
    });

    if (!this.music || !this.music.isPlaying) {
      this.music = this.sound.add("titleMusic", { volume: 0.5, loop: true });
      this.time.delayedCall(100, () => {
        this.music.play();
      });
    }
  }

  update() {
    if (this.inputCooldown) return;

    const deltaX =
      this.virtualJoystick.stickCircle.x - this.virtualJoystick.baseCircle.x;
    const deltaY =
      this.virtualJoystick.stickCircle.y - this.virtualJoystick.baseCircle.y;

    let currentDirection = null;

    if (deltaY < -20) {
      currentDirection = "up";
    } else if (deltaY > 20) {
      currentDirection = "down";
    }

    if (currentDirection !== this.lastDirection) {
      if (currentDirection === "up") {
        this.changeSelectedItem(
          (this.selectedItem - 1 + this.menuItems.length) %
            this.menuItems.length
        );
        this.setInputCooldown();
      } else if (currentDirection === "down") {
        this.changeSelectedItem(
          (this.selectedItem + 1) % this.menuItems.length
        );
        this.setInputCooldown();
      }
      this.lastDirection = currentDirection;
    }
  }

  setInputCooldown() {
    this.inputCooldown = true;
    this.time.delayedCall(
      200,
      () => {
        this.inputCooldown = false;
      },
      [],
      this
    );
  }

  selectOption(selectedItem) {
    this.sound.play("selectSound");
    document.getElementById("game-title").style.display = "none";

    if (selectedItem === 0) {
      this.music.stop();
      this.scene.start("Level1Scene");
    } else if (selectedItem === 1) {
      this.scene.start("StoryScene");
    }
  }
}
export default StartMenuScene;
