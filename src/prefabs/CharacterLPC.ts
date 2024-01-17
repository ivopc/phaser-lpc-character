import Phaser from "phaser";

import { ISpritesheetMap, BodyTypes, CharacterTraitsType, WalkAnimation, ANIMATION_FIRST_FRAME } from "../interfaces/SpritesheetMap";


const universalFrameSize = 64;
const columns = 13;

const directions = [WalkAnimation.Down, WalkAnimation.Up, WalkAnimation.Right, WalkAnimation.Left];

export default class CharacterLPC extends Phaser.GameObjects.Container {

    traits: Map<CharacterTraitsType, Phaser.GameObjects.Sprite> = new Map();

    bodyType: BodyTypes; 
    variant: string;

    constructor (scene: Phaser.Scene, bodyType: BodyTypes, variant: string) {
        super(scene, 0, 0);
        this.bodyType = bodyType;
        this.variant = variant;
    }

    async loadAssets () {
        const anim = directions[Math.floor(Math.random() * directions.length)]; 
        this.traits.set(CharacterTraitsType.Body, this.scene.add.sprite(0, 0, `lpc-character-${this.bodyType}-${this.variant}-${anim}`));
        //@ts-ignore
        this.add(this.traits.get(CharacterTraitsType.Body));
        await this.load();
        this.facing = anim;
        //this.setTexture(`lpc-character-${bodyType}-${variant}-${anim}`);
        //const base = this.getRow(anim, ANIMATION_FIRST_FRAME).name;
        //this.traits.get(CharacterTraitsType.Body).setFrame(base);
        //this.traits.get(CharacterTraitsType.Body);
        this.scene.add.existing(this);
    }

    async load () {
        const spritesheetMaps = this.scene.cache.json.get("spritesheet-map") as ISpritesheetMap[];
        const spritesheetMap = spritesheetMaps.find(spritesheetMap => spritesheetMap.name === "Body color");
        console.log(spritesheetMap, "spritesheets/" + spritesheetMap?.layers[0][this.bodyType] + this.variant + ".png");
        directions.forEach(direction => {
            this.scene.load.spritesheet(`lpc-character-${this.bodyType}-${this.variant}-${direction}`, "spritesheets/" + spritesheetMap?.layers[0][this.bodyType] + this.variant + ".png", { frameWidth: universalFrameSize, frameHeight: universalFrameSize });
        });
        this.scene.load.start();
        await Promise.all(directions.map(direction => once(this.scene, `filecomplete-spritesheet-lpc-character-${this.bodyType}-${this.variant}-${direction}`)));
        console.log("tratratra");
        
        directions.forEach(direction => {
            console.log("direction get row", this.getRow(direction, ANIMATION_FIRST_FRAME));
            
            const row = this.getRow(direction, ANIMATION_FIRST_FRAME).name;
            this.scene.anims.create({
                key: `${this.bodyType}-${this.variant}-${direction}`,
                frames: this.scene.anims.generateFrameNumbers(`lpc-character-${this.bodyType}-${this.variant}-${direction}`, { frames: [ ... Array(WalkAnimation.Frames)].map((_, num) => row + (num + 1)) }),
                repeat: -1,
                frameRate: WalkAnimation.FrameRate
            });
        });
    }

    set facing (direction: WalkAnimation) {
        //@ts-ignore
        this.traits.get(CharacterTraitsType.Body)
            .setTexture(`lpc-character-${this.bodyType}-${this.variant}-${direction}`)
            .play(`${this.bodyType}-${this.variant}-${direction}`);
    }

    getRow(row: number, col: number): any {
        const position = (row - 1) * columns + (col - 1);
        //@ts-ignore
        return (this.scene.textures.getFrame(this.traits.get(CharacterTraitsType.Body).texture.key).texture.frames as any)[position];
    }
};

async function once (scene: Phaser.Scene, event: string) {
    return new Promise(resolve => scene.load.once(event, resolve));
};