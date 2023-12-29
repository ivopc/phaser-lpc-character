import Phaser from "phaser";

import CharacterLPC from "./prefabs/CharacterLPC";

export default class extends Phaser.Scene {
    preload () {
        this.load.json("spritesheet-map", "spritesheets/spritesheet-map.json");
    }

    create () {
        new CharacterLPC(this, 500, 350).loadAssets("female", "lavender");
        new CharacterLPC(this, 150, 400).loadAssets("male", "light");
        new CharacterLPC(this, 700, 300).loadAssets("muscular", "zombie_green");
        new CharacterLPC(this, 800, 600).loadAssets("male", "amber");
        new CharacterLPC(this, 300, 100).loadAssets("pregnant", "bright_green");
        new CharacterLPC(this, 250, 700).loadAssets("teen", "olive");
    }
};