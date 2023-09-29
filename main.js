import StartMenuScene from "./StartMenuScene.js";
import StoryScene from "./StoryScene.js";
import Level1Scene from "./Level1Scene.js"; // Make sure the path is correct

var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game-container",
    width: 800,
    height: 600
  },
  scene: [StartMenuScene, StoryScene, Level1Scene], // Added Level1Scene
  input: {
    activePointers: 1
  }
};

var game = new Phaser.Game(config);
