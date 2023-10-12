import StartMenuScene from "./StartMenuScene.js";
import StoryScene from "./StoryScene.js";
import Level1Scene from "./Level1Scene.js";
import Level2Scene from "./Level2Scene.js";
import Level3Scene from "./Level3Scene.js";
import Level4Scene from "./Level4Scene.js";
import Level5Scene from "./Level5Scene.js";
import Level6Scene from "./Level6Scene.js";
import Level7Scene from "./Level7Scene.js";
import Level8Scene from "./Level8Scene.js";

var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game-container",
    width: 800,
    height: 600
  },
  scene: [
    StartMenuScene,
    StoryScene,
    Level1Scene,
    Level2Scene,
    Level3Scene,
    Level4Scene,
    Level5Scene,
    Level6Scene,
    Level7Scene,
    Level8Scene
  ],
  input: {
    activePointers: 1
  }
};

var game = new Phaser.Game(config);
