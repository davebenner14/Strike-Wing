class StoryScene extends Phaser.Scene {
  constructor() {
    super({ key: "StoryScene" });
  }

  preload() {
    this.load.image(
      "jumpmanCloseUp",
      "assets/images/Screenshot 2023-09-26 at 12.26.39 PM.png"
    );
    this.load.image(
      "jumpmanFull",
      "assets/images/DreamShaper_v7_male_character_with_shoulder_length_blonde_hair_0 (2).jpg"
    );
  }

  create() {
    this.storyText = [
      "In a universe distant and unknown, the serene world of Jumponia hung precariously on the edge of destruction.",
      "The once luminous skies, which shimmered in shades of cobalt and gold, were now plagued by ominous gravity-beasts.",
      "These malevolent entities threatened to pull Jumponia's ethereal islands into the boundless void below, erasing the very essence of its existence.",
      "The Bouncelings, native inhabitants of Jumponia, were helpless and despondent.",
      "Their once joyous leaps and bounds reduced to mere shuffles, as the oppressive force of the gravity-beasts crushed their spirits.",
      "Then, as if by cosmic intervention, he appeared: The Jumpman.",
      "No one knew from whence he came or what his purpose was. His origin, wrapped in layers of enigma.",
      "With an aura radiating power and determination, Jumpman embodied hope.",
      "Determined to save Jumponia, Jumpman readied himself to face off against the gravity-beasts.",
      "Every leap would defy the natural order; each bound would resonate with the energy of the universe itself.",
      "The stage was set, and Jumponia's fate rested in the hands of this enigmatic jumper.",
      "The journey would not be easy. Towering obstacles, devious traps, and the ever-looming presence of the gravity-beasts lay ahead.",
      "And so begins the tale of Jumpman and his quest to restore balance to a world on the brink."
    ];

    this.textIndex = 0;
    this.lineIndex = 0;

    this.currentText = this.add.text(16, 16, "", {
      font: "24px 'Press Start 2P'",
      fill: "#ffffff",
      wordWrap: { width: 768, useAdvancedWrap: true }
    });

    this.time.addEvent({
      delay: 50,
      callback: this.typeText,
      callbackScope: this,
      repeat: this.storyText[0].length - 1
    });
  }

  typeText() {
    this.currentText.setText(
      this.storyText[this.textIndex].substr(0, this.lineIndex + 1)
    );
    this.lineIndex++;

    if (this.lineIndex === this.storyText[this.textIndex].length) {
      this.textIndex++;

      if (this.textIndex === this.storyText.length) {
        this.time.delayedCall(3000, () => {
          this.scene.start("StartMenuScene");
        });
        return;
      }

      if (this.textIndex === 5) {
        this.time.delayedCall(2000, () => {
          this.jumpmanCloseUp = this.add
            .image(400, 300, "jumpmanCloseUp")
            .setAlpha(0)
            .setScale(0.7);
          this.tweens.add({
            targets: this.jumpmanCloseUp,
            alpha: 1,
            duration: 2000
          });
        });
      }

      if (this.textIndex === 10) {
        if (this.jumpmanCloseUp) {
          this.jumpmanCloseUp.destroy();
        }
        let jumpmanFull = this.add
          .image(400, 400, "jumpmanFull")
          .setAlpha(0)
          .setScale(0.4);
        this.tweens.add({
          targets: jumpmanFull,
          alpha: 1,
          duration: 2000
        });
      }

      this.time.addEvent({
        delay: 2000,
        callback: () => {
          this.lineIndex = 0;
          this.currentText.setText("");
          this.time.addEvent({
            delay: 50,
            callback: this.typeText,
            callbackScope: this,
            repeat: this.storyText[this.textIndex].length - 1
          });
        },
        callbackScope: this
      });
    }
  }
}
