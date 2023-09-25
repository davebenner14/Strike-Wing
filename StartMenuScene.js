class StartMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartMenuScene" });
  }

  create() {
    this.cameras.main.setBackgroundColor("#000");

    // Adjusted Y position for the title and its shadows
    const titleYPosition = 250;

    // Magenta shadow text
    this.add
      .text(this.cameras.main.centerX + 7, titleYPosition + 7, "Jump Man", {
        fontFamily: '"Press Start 2P"',
        fontSize: "150px",
        fill: "#ff00ff"
      })
      .setOrigin(0.5, 0.5);

    // Cyan shadow text
    this.add
      .text(this.cameras.main.centerX + 5, titleYPosition + 5, "Jump Man", {
        fontFamily: '"Press Start 2P"',
        fontSize: "150px",
        fill: "#00ffff"
      })
      .setOrigin(0.5, 0.5);

    // Main title text
    let titleText = this.add
      .text(this.cameras.main.centerX, titleYPosition, "Jump Man", {
        fontFamily: '"Press Start 2P"',
        fontSize: "150px",
        fill: "#ffffff"
      })
      .setOrigin(0.5, 0.5);

    // Adjusted Y position for the pressStartText
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
      let yPosition = 500 + i * 50; // Adjusted starting yPosition for menu items
      let text = this.add
        .text(this.cameras.main.centerX, yPosition, menuItems[i], {
          fontFamily: '"Press Start 2P"', // Using the desired font family
          fontSize: "24px",
          fill: "#fff"
        })
        .setOrigin(0.5, 0.5); // Centered text

      text.setInteractive();

      text.on("pointerdown", () => {
        this.selectOption(selectedItem);
      });

      menuTexts.push(text);
    }

    menuTexts[selectedItem].setColor("#fff");

    this.input.keyboard.on("keydown-UP", () => {
      menuTexts[selectedItem].setColor("#fff");
      selectedItem = (selectedItem - 1 + menuItems.length) % menuItems.length;
      menuTexts[selectedItem].setColor("#00ffff");
    });

    this.input.keyboard.on("keydown-DOWN", () => {
      menuTexts[selectedItem].setColor("#fff");
      selectedItem = (selectedItem + 1) % menuItems.length;
      menuTexts[selectedItem].setColor("#ff00ff");
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
