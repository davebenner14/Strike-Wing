export default class StoryScene extends Phaser.Scene {
  constructor() {
    super({ key: "StoryScene" });
  }

  preload() {
    for (let i = 1; i <= 6; i++) {
      this.load.image(`intro${i}`, `assets/images/intro${i}.png`);
    }
  }

  create() {
    this.storyText = [
      // Picture 1: Peaceful City
      "In a secluded and uncharted realm, the sky-rich planet Aerilon shimmered with peace and prosperity, its cities vibrant and full of life, walking unknowingly on the edge of twilight.",

      // Picture 2: Shadow Reapers Emerge
      "Yet, in the blink of an eye, darkness swallowed the light. Emerging from ominous clouds, the Shadow Reapers arrived, their steel-gray armada casting shadows of doom over the gleaming city below.",

      // Picture 3: City on Fire
      "In their wake, the once radiant cities of Aerilon now bore the scars of fire and smoke, the hopeful hum of life replaced with the cries of despair and the crackling of burning dreams.",

      // Picture 4: Phoenix Jet in the Sky
      "However, as dawn painted the sky with faint streaks of light, a sound unlike any other whispered through the air. A jet, blazing with unmatched speed and precision, streaked across the darkened sky, its engine's roar a symphony of hope and power in the theater of war.",

      // Picture 5: Close-up of Phoenix
      "Within the cockpit of this fiery vessel, a figure sat, visor blacked and face hidden, enshrouded in mystery. The pilot, known only by the codename Phoenix, ignited hope amidst the darkness, their very presence a promise of resistance against the cascading night.",

      // Picture 6: Engaging Enemy
      "With a thunderous roar and blazing engines, Phoenix engaged the Shadow Reapers. Each maneuver, a dance between light and shadow; each shot fired, a beacon piercing through the night. The battle for Aerilon's sky had begun, and with it, the legend of Phoenix took flight."
    ];
    this.textIndex = 0;
    this.lineIndex = 0;

    let textHeight = 100;
    let textBackground = this.add.rectangle(
      0,
      0,
      this.scale.width,
      textHeight,
      0x000000
    );
    textBackground.setOrigin(0, 0);
    textBackground.setAlpha(0.7);
    textBackground.setDepth(1);

    this.currentText = this.add
      .text(16, 16, "", {
        font: "24px 'Press Start 2P'",
        fill: "#ffffff",
        wordWrap: { width: this.scale.width - 32, useAdvancedWrap: true }
      })
      .setDepth(2);
    this.currentImage = this.add
      .image(this.scale.width / 2, (this.scale.height + 100) / 2, "intro1")
      .setAlpha(0);

    this.currentImage.setDisplaySize(this.scale.width, this.scale.height - 100);

    this.tweens.add({
      targets: this.currentImage,
      alpha: 1,
      duration: 2000,
      onComplete: this.startTyping,
      callbackScope: this
    });
  }

  startTyping() {
    this.time.addEvent({
      delay: 100,
      callback: this.typeText,
      callbackScope: this,
      repeat: this.storyText[this.textIndex].length - 1
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

      this.tweens.add({
        targets: this.currentImage,
        alpha: 0,
        duration: 2000,
        onComplete: () => {
          this.currentImage.setTexture(`intro${this.textIndex + 1}`);

          if (
            this.textIndex === 3 ||
            this.textIndex === 4 ||
            this.textIndex === 5
          ) {
            this.currentImage.setDisplaySize(
              this.scale.width * 0.9,
              (this.scale.height - 100) * 0.9
            );
          } else {
            this.currentImage.setDisplaySize(
              this.scale.width,
              this.scale.height - 100
            );
          }

          this.tweens.add({
            targets: this.currentImage,
            alpha: 1,
            duration: 2000,
            onComplete: () => {
              this.lineIndex = 0;
              this.startTyping();
            }
          });
        }
      });
    }
  }
}
