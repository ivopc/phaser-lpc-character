import Phaser from "phaser";

import { ISpritesheetMap, BodyTypes, CharacterTraitsType, WalkAnimation, ANIMATION_FIRST_FRAME } from "../interfaces/SpritesheetMap";


const universalFrameSize = 64;
const columns = 13;

const directions = [WalkAnimation.Down, WalkAnimation.Up, WalkAnimation.Right, WalkAnimation.Left];

export default class CharacterLPC extends Phaser.GameObjects.Container {

    traits: Map<CharacterTraitsType, Phaser.GameObjects.Sprite> = new Map();

    constructor (scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
    }

    async loadAssets (bodyType: BodyTypes, variant: string) {
        const anim = directions[Math.floor(Math.random() * directions.length)]; 
        const spritesheetMaps = this.scene.cache.json.get("spritesheet-map") as ISpritesheetMap[];
        const spritesheetMap = spritesheetMaps.find(spritesheetMap => spritesheetMap.name === "Body color");
        this.scene.load.spritesheet(`lpc-character-${bodyType}-${variant}-${anim}`, "spritesheets/" + spritesheetMap?.layers[0][bodyType] + variant + ".png", { frameWidth: universalFrameSize, frameHeight: universalFrameSize });
        this.scene.load.start();
        await once(this.scene, `filecomplete-spritesheet-lpc-character-${bodyType}-${variant}-${anim}`);
        this.traits.set(CharacterTraitsType.Body, this.scene.add.sprite(0, 0, `lpc-character-${bodyType}-${variant}-${anim}`));
        this.add(this.traits.get(CharacterTraitsType.Body));
        //this.setTexture(`lpc-character-${bodyType}-${variant}-${anim}`);
        const base = this.getRow(anim, ANIMATION_FIRST_FRAME).name;
        this.traits.get(CharacterTraitsType.Body).setFrame(base);
        this.scene.anims.create({
            key: `${bodyType}-${variant}-${anim}`,
            frames: this.scene.anims.generateFrameNumbers(`lpc-character-${bodyType}-${variant}-${anim}`, { frames: [ ... Array(WalkAnimation.Frames)].map((_, num) => base + (num + 1)) }),
            repeat: -1,
            frameRate: 9
        });
        this.traits.get(CharacterTraitsType.Body).play(`${bodyType}-${variant}-${anim}`);
        this.scene.add.existing(this);
    }

    getRow(row: number, col: number): any {
        const position = (row - 1) * columns + (col - 1);
        return (this.scene.textures.getFrame(this.traits.get(CharacterTraitsType.Body).texture.key).texture.frames as any)[position];
    }
};

async function once (scene: Phaser.Scene, event: string) {
    return new Promise(resolve => scene.load.once(event, resolve));
};