import Phaser from "phaser";

import { ISpritesheetMap, ILayer, BodyTypes } from "../interfaces/SpritesheetMap";

export default class CharacterLPC extends Phaser.GameObjects.Sprite {
    constructor (scene: Phaser.Scene) {
        super(scene, 200, 200, "");
        this.loadAssets("male", "light");
    }

    async loadAssets (bodyType: BodyTypes, variant: string) {
        const spritesheetMaps = this.scene.cache.json.get("spritesheet-map") as ISpritesheetMap[];
        const c = spritesheetMaps.find(spritesheetMap => spritesheetMap.name === "Body color");
        console.log(c);
        this.scene.load.image("kkk", "/spritesheets/" + c?.layers[0][bodyType] + variant + ".png");
        this.scene.load.start();
    }
};