import Phaser from "phaser";

import { ISpritesheetMap, BodyTypes, CharacterTraitsType, WalkAnimation, ANIMATION_FIRST_FRAME } from "../../interfaces/SpritesheetMap";
import CharacterLPC from "../CharacterLPC";

const universalFrameSize = 64;
const columns = 13;

const directions = [WalkAnimation.Down, WalkAnimation.Up, WalkAnimation.Right, WalkAnimation.Left];

interface ConstructorParams {
    parent: CharacterLPC;
    bodyType: BodyTypes;
    variant: string;
};

export default class Traits extends Phaser.Events.EventEmitter {
    map: Map<CharacterTraitsType, Phaser.GameObjects.Sprite> = new Map();
    bodyType: BodyTypes;
    variant: string;
    parent: CharacterLPC;
    scene: Phaser.Scene;

    constructor (scene: Phaser.Scene, params: ConstructorParams) {
        super();
        this.scene = scene;
        this.parent = params.parent; 
        this.bodyType = params.bodyType;
        this.variant = params.variant;
    }

    create (trait: CharacterTraitsType) {
        const anim = directions[Math.floor(Math.random() * directions.length)]; 
        const spritesheetMaps = this.scene.cache.json.get("spritesheet-map") as ISpritesheetMap[];
        const spritesheetMap = spritesheetMaps.find(spritesheetMap => spritesheetMap.name === "Body color");
        this.scene.load.spritesheet(`lpc-character-${this.bodyType}-${this.variant}-${anim}`, "spritesheets/" + spritesheetMap?.layers[0][this.bodyType] + this.variant + ".png", { frameWidth: universalFrameSize, frameHeight: universalFrameSize });
        this.scene.load.start();
        await once(this.scene, `filecomplete-spritesheet-lpc-character-${this.bodyType}-${this.variant}-${anim}`);
        this.map.set(trait, this.scene.add.sprite(0, 0, `lpc-character-${this.bodyType}-${this.variant}-${anim}`));
        this.parent.add(this.get(CharacterTraitsType.Body));
        //this.setTexture(`lpc-character-${bodyType}-${variant}-${anim}`);
        const base = this.getRow(anim, ANIMATION_FIRST_FRAME).name;
        this..get(CharacterTraitsType.Body).setFrame(base);
        this.scene.anims.create({
            key: `${bodyType}-${variant}-${anim}`,
            frames: this.scene.anims.generateFrameNumbers(`lpc-character-${this.bodyType}-${this.variant}-${anim}`, { frames: [ ... Array(WalkAnimation.Frames)].map((_, num) => base + (num + 1)) }),
            repeat: -1,
            frameRate: WalkAnimation.FrameRate
        });
        this.get(CharacterTraitsType.Body).play(`${this.bodyType}-${this.variant}-${anim}`);
        this.scene.add.existing(this);
    }

    async load () {}

    get (trait: CharacterTraitsType): Phaser.GameObjects.Sprite {
        return this.map.get(trait) as Phaser.GameObjects.Sprite ;
    }

    getRow(row: number, col: number): any {
        const position = (row - 1) * columns + (col - 1);
        return (this.scene.textures.getFrame(this.traits.get(CharacterTraitsType.Body).texture.key).texture.frames as any)[position];
    }
};

async function once (scene: Phaser.Scene, event: string) {
    return new Promise(resolve => scene.load.once(event, resolve));
};