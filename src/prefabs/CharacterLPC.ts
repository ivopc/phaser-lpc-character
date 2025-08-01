import Phaser from "phaser";

import { ISpritesheetMap, CharacterTraitsType, WalkAnimation, UNIVERSAL_FRAME_SIZE, COLUMNS, ANIMATION_FIRST_FRAME, ICharacterModel, CharacterModel, Direction, directions } from "../interfaces/SpritesheetMap";



/**
 * @todo stop to use this ridiculous class procedural methods to generate dynamic sprites traits and work with `TraitsProceduralMap` interface to generate character traits dynamically
 */
export default class CharacterLPC extends Phaser.GameObjects.Container {

    traits: Map<CharacterTraitsType, Phaser.GameObjects.Sprite> = new Map();
    model!: CharacterModel;

    constructor (scene: Phaser.Scene, model: ICharacterModel) {
        super(scene, 0, 0);
        this.model = new CharacterModel(model);
    }

    async loadAssets () {
        await this.load();
        this.traits.set(CharacterTraitsType.Body, this.scene.add.sprite(0, 0, `lpc-character-body-${this.model.bodyType}-${this.model.variant}-${this.model.direction}`));
        this.add(this.traits.get(CharacterTraitsType.Body) as Phaser.GameObjects.Sprite);
        directions.forEach(direction => {
            const row = this.getRow(direction, ANIMATION_FIRST_FRAME, CharacterTraitsType.Body).name;
            this.scene.anims.create({
                key: `body-${this.model.bodyType}-${this.model.variant}-${direction}`,
                frames: this.scene.anims.generateFrameNumbers(`lpc-character-body-${this.model.bodyType}-${this.model.variant}-${direction}`, { frames: [ ... Array(WalkAnimation.Frames)].map((_, num) => row + (num + 1)) }),
                repeat: -1,
                frameRate: WalkAnimation.FrameRate
            });
        });
        this.traits.get(CharacterTraitsType.Body)?.play(`body-${this.model.bodyType}-${this.model.variant}-${this.model.direction}`);
        await this.loadHead();
        this.traits.set(CharacterTraitsType.Head, this.scene.add.sprite(0, 0, `lpc-character-head-${this.model.bodyType}-${this.model.variant}-${this.model.direction}`));
        this.add(this.traits.get(CharacterTraitsType.Head) as Phaser.GameObjects.Sprite);
        directions.forEach(direction => {
            const row = this.getRow(direction, ANIMATION_FIRST_FRAME, CharacterTraitsType.Head).name;
            this.scene.anims.create({
                key: `head-${this.model.bodyType}-${this.model.variant}-${direction}`,
                frames: this.scene.anims.generateFrameNumbers(`lpc-character-head-${this.model.bodyType}-${this.model.variant}-${direction}`, { frames: [ ... Array(WalkAnimation.Frames)].map((_, num) => row + (num + 1)) }),
                repeat: -1,
                frameRate: WalkAnimation.FrameRate
            });
        });
        this.traits.get(CharacterTraitsType.Head)?.play(`head-${this.model.bodyType}-${this.model.variant}-${this.model.direction}`);
        this.scene.add.existing(this);
    }

    async load () {
        const spritesheetMaps = this.scene.cache.json.get("spritesheet-map") as ISpritesheetMap[];
        const spritesheetMap = spritesheetMaps.find(spritesheetMap => spritesheetMap.name === "Body color");
        console.log("body", spritesheetMap, "spritesheets/" + spritesheetMap?.layers[0][this.model.bodyType] + this.model.variant + ".png");
        directions.forEach(direction => {
            this.scene.load.spritesheet(`lpc-character-body-${this.model.bodyType}-${this.model.variant}-${direction}`, "spritesheets/" + spritesheetMap?.layers[0][this.model.bodyType] + this.model.variant + ".png", { frameWidth: UNIVERSAL_FRAME_SIZE, frameHeight: UNIVERSAL_FRAME_SIZE });
        });
        this.scene.load.start();
        await Promise.all(directions.map(direction => once(this.scene, `filecomplete-spritesheet-lpc-character-body-${this.model.bodyType}-${this.model.variant}-${direction}`)));
    }

    async loadHead () {
        const spritesheetMaps = this.scene.cache.json.get("spritesheet-map") as ISpritesheetMap[];
        const spritesheetMap = spritesheetMaps.find(spritesheetMap => spritesheetMap.name === "Human male" && spritesheetMap.type_name === "head");
        console.log("head", spritesheetMap, "spritesheets/" + spritesheetMap?.layers[0][this.model.bodyType] + this.model.variant + ".png");
        directions.forEach(direction => {
            this.scene.load.spritesheet(`lpc-character-head-${this.model.bodyType}-${this.model.variant}-${direction}`, "spritesheets/" + spritesheetMap?.layers[0][this.model.bodyType] + this.model.variant + ".png", { frameWidth: UNIVERSAL_FRAME_SIZE, frameHeight: UNIVERSAL_FRAME_SIZE });
        });
        this.scene.load.start();
        await Promise.all(directions.map(direction => once(this.scene, `filecomplete-spritesheet-lpc-character-head-${this.model.bodyType}-${this.model.variant}-${direction}`)));
    }

    getRow(row: number, col: number, trait: CharacterTraitsType): any {
        const position = (row - 1) * COLUMNS + (col - 1);
        //@ts-ignore
        return (this.scene.textures.getFrame(this.traits.get(trait).texture.key).texture.frames as any)[position];
    }

    set facing (direction: Direction) {
        //@ts-ignore
        this.traits.get(CharacterTraitsType.Body)
            .setTexture(`lpc-character-${this.model.bodyType}-${this.model.variant}-${direction}`)
            .play(`${this.model.bodyType}-${this.model.variant}-${direction}`);
        this.model.direction = direction;
    }
};

async function once (scene: Phaser.Scene, event: string) {
    return new Promise(resolve => scene.load.once(event, resolve));
};