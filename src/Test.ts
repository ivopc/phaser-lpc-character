import Phaser from "phaser";

import CharacterLPC from "./prefabs/CharacterLPC";
import { ISpritesheetMap } from "./interfaces/SpritesheetMap";

export default class extends Phaser.Scene {
    preload () {
        this.load.json("spritesheet-map", "spritesheets/spritesheet-map.json");
    }

    create () {
        const spritesheetMap = (this.cache.json.get("spritesheet-map") as ISpritesheetMap[]).find(spritesheetMap => spritesheetMap.name === "Body color") as ISpritesheetMap;
        const bodyTypes = ["male", "muscular", "female", "child", "teen", "pregnant", "skeleton", "zombie"];
        [... Array(1)].forEach(() => {
            const x = Phaser.Math.Between(0, this.cameras.main.width);
            const y = Phaser.Math.Between(0, this.cameras.main.height);
            new CharacterLPC(
                this, 
                bodyTypes[Math.floor(Math.random() * bodyTypes.length)] as any, 
                spritesheetMap.variants[Math.floor(Math.random() * spritesheetMap.variants.length)]
            )
                .setPosition(x, y)
                .setScale(Phaser.Math.FloatBetween(1, 4))
                .loadAssets();
        });
    }
};