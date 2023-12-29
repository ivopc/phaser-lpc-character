import Phaser from "phaser";

import CharacterLPC from "./prefabs/CharacterLPC";

export default class extends Phaser.Scene {


    preload () {
        this.load.json("spritesheet-map", "/spritesheets/spritesheet-map.json");
    }


    create () {
        new CharacterLPC(this);
    }
};