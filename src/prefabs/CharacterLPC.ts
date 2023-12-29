import Phaser from "phaser";

import { ISpritesheetMap, BodyTypes } from "../interfaces/SpritesheetMap";

/**
 * size per frame (width and height) = 64 pixels
 * each col have 13 frames
 */


// their respective rows
enum Animation {
    WalkUp = 9,
    WalkLeft = 10,
    WalkDown = 11,
    WalkRight = 12,
}

const animLength = 8;
const universalFrameSize = 64;
const columns = 13;
const anim = Animation.WalkDown;

export default class CharacterLPC extends Phaser.GameObjects.Sprite {
    constructor (scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "");
    }

    async loadAssets (bodyType: BodyTypes, variant: string) {
        const spritesheetMaps = this.scene.cache.json.get("spritesheet-map") as ISpritesheetMap[];
        const spritesheetMap = spritesheetMaps.find(spritesheetMap => spritesheetMap.name === "Body color");
        this.scene.load.spritesheet(`lpc-character-${bodyType}-${variant}-${anim}`, "/spritesheets/" + spritesheetMap?.layers[0][bodyType] + variant + ".png", { frameWidth: universalFrameSize, frameHeight: universalFrameSize });
        this.scene.load.start();
        await once(this.scene, `filecomplete-spritesheet-lpc-character-${bodyType}-${variant}-${anim}`);
        this.setTexture(`lpc-character-${bodyType}-${variant}-${anim}`);
        const base = this.getRow(anim, 0).name;
        this.setFrame(base);
        this.scene.anims.create({
            key: `${bodyType}-${variant}-${anim}`,
            frames: this.scene.anims.generateFrameNumbers(`lpc-character-${bodyType}-${variant}-${anim}`, { frames: [ ... Array(animLength)].map((_, num) => base + (num + 1)) }),
            repeat: -1,
            frameRate: 9
        });
        this.play(`${bodyType}-${variant}-${anim}`);
        this.scene.add.existing(this);
    }


    getRow(row: number, col: number): any {
        const position = (row - 1) * columns + (col - 1);
        return (this.scene.textures.getFrame(this.texture.key).texture.frames as any)[position];
    }
};

async function once (scene: Phaser.Scene, event: string) {
    return new Promise(resolve => scene.load.once(event, resolve));
};