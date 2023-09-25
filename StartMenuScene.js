class StartMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartMenuScene" });
  }

  create() {
    this.cameras.main.setBackgroundColor("#000");

    let titleText = this.add.text(
      this.cameras.main.centerX - 200,
      50,
      "Jump Man",
      {
        fontFamily: "VT323",
        fontSize: "96px",
        fill: "#ffffff" // This is where you set the color
      }
    );

    // Adding shadow to the text
    titleText.setShadow(2, 2, "#333333", 2, false, true);

    this.pressStartText = this.add.text(300, 300, "Press Start", {
      fontFamily: "VT323",
      fontSize: "24px",
      fill: "#fff"
    });

    this.startTween = this.tweens.add({
      targets: this.pressStartText,
      alpha: 0,
      duration: 500,
      ease: "Linear",
      yoyo: true,
      repeat: -1
    });

    this.input.on("pointerdown", () => {
      this.showMenu();
    });

    this.input.keyboard.on("keydown-ENTER", () => {
      this.showMenu();
    });
  }

  showMenu() {
    this.startTween.stop();
    this.pressStartText.setAlpha(0);
    let menuItems = ["Start Game", "Story"];
    let selectedItem = 0;
    let menuTexts = [];

    for (let i = 0; i < menuItems.length; i++) {
      let yPosition = 300 + i * 50;
      let text = this.add.text(300, yPosition, menuItems[i], {
        fontSize: "24px",
        fill: "#fff"
      });
      text.setInteractive();

      text.on("pointerdown", () => {
        this.selectOption(selectedItem);
      });

      menuTexts.push(text);
    }

    menuTexts[selectedItem].setColor("#f00");

    this.input.keyboard.on("keydown-UP", () => {
      menuTexts[selectedItem].setColor("#fff");
      selectedItem = (selectedItem - 1 + menuItems.length) % menuItems.length;
      menuTexts[selectedItem].setColor("#f00");
    });

    this.input.keyboard.on("keydown-DOWN", () => {
      menuTexts[selectedItem].setColor("#fff");
      selectedItem = (selectedItem + 1) % menuItems.length;
      menuTexts[selectedItem].setColor("#f00");
    });

    this.input.keyboard.on("keydown-ENTER", () => {
      this.selectOption(selectedItem);
    });
  }

  selectOption(selectedItem) {
    if (selectedItem === 0) {
      this.scene.start("Level1Scene");
    } else if (selectedItem === 1) {
      console.log("Story selected");
    }
  }
}
