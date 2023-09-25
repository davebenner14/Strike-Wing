var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game-container",
    width: 800,
    height: 600
  },
  scene: [StartMenuScene],
  input: {
    activePointers: 1
  }
};

var game = new Phaser.Game(config);
