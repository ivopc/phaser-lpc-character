import Phaser from "phaser";
import Test from "./Test";

new Phaser.Game({
  scene: [Test],
  type: Phaser.AUTO,
  parent: "app",
  width: 800,
  height: 600
});