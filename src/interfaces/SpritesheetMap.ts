export interface ILayer {
    zPos: number;
    layerId: number;
    male?: string;
    muscular?: string;
    female?: string;
    child?: string;
    teen?: string;
    pregnant?: string;
    skeleton?: string;
    zombie?: string;
};

export interface ISpritesheetMap {
    name: string;
    type_name: string;
    variants: string[];
    match_body_color?: boolean;
    preview_row?: number;
    layers: ILayer[];
};

export type BodyTypes = "male" | "muscular" | "female" | "child" | "teen" | "pregnant" | "skeleton" | "zombie";

export enum CharacterTraitsType {
    Arms = "arms",
    Bracers = "bracers",
    Bauldron = "bauldron",
    Beard = "beard",
    Belt = "belt",
    Sash = "sash",
    Body = "body",
    Buckles = "buckles",
    Cape = "cape",
    Cape_Trim = "cape_trim",
    Vest = "vest",
    Dress = "dress",
    Eyes = "eyes",
    Facial = "facial",
    Earring = "earring",
    Eyepatch = "eyepatch",
    Shoes = "shoes",
    Gloves = "gloves",
    Hair = "hair",
    Accessory = "accessory",
    Hat = "hat",
    Bandana = "bandana",
    Visor = "visor",
    Headcover = "headcover",
    Ears = "ears",
    Fins = "fins",
    Horns = "horns",
    Nose = "nose",
    Wrinkes = "wrinkes",
    Head = "head",
    Legs = "legs",
    Apron = "apron",
    Neck = "neck",
    Necklace = "necklace",
    Prosthesis_Hand = "prosthesis_hand",
    Prosthesis_Leg = "prosthesis_leg",
    Quiver = "quiver",
    Shadow = "shadow",
    Shield = "shield",
    Shoulders = "shoulders",
    Tail = "tail",
    Weapon = "weapon",
    Overalls = "overalls",
    Armour = "armour",
    Bandages = "bandages",
    Chainmail = "chainmail",
    Clothes = "clothes",
    Jacket = "jacket",
    JacketTrim = "jacket_trim",
    JacketCollar = "jacket_collar",
    JacketPockets = "jacket_pockets",
    WeaponMagicCrystal = "weapon_magic_crystal",
    Ammo = "ammo",
    Wings = "wings",
    WoundArm = "wound_arm",
    WoundBrain = "wound_brain",
    WoundEye = "wound_eye",
    WoundMouth = "wound_mouth",
    WoundRibs = "wound_ribs",
    Wrists = "wrists",
};

export const TraitsProceduralMap = {
    [CharacterTraitsType.Body]: {
        animationKey: "body",
        spritesheetMapFindOperators: [
            ["name", "Body color"]
        ]
    },
    [CharacterTraitsType.Head]: {
        animationKey: "head",
        spritesheetMapFindOperators: [
            ["name", "Human male"],
            ["type_name", "head"]
        ]
    }
};


/**
 * size per frame (width and height) = 64 pixels
 * each column have 13 frames
 * example: `WalkAnimation.Up`, `WalkAnimation.Down` and etc will represents the row
 */

export enum WalkAnimation {
    Frames = 8,
    FrameRate = 9,
    Up = 9,
    Left = 10,
    Down = 11,
    Right = 12,
};

/**
 * @description It will be always `0` considering the Character LPC metrics 
 */
export const ANIMATION_FIRST_FRAME = 0;

/**
 * @description It will be always `64px` the size Character LPC 
 */
export const UNIVERSAL_FRAME_SIZE = 64;

/**
 * @description The max number of columns is `13` in the Character LPC animation 
 */
export const COLUMNS = 13;


export const directions = [WalkAnimation.Down, WalkAnimation.Up, WalkAnimation.Right, WalkAnimation.Left];

export enum Direction {
    Down = WalkAnimation.Down,
    Up = WalkAnimation.Up,
    Right = WalkAnimation.Right,
    Left = WalkAnimation.Left,
};

export interface ICharacterModel {
    bodyType: BodyTypes;
    variant: string;
    direction: Direction;
};

export class CharacterModel implements ICharacterModel {
    bodyType!: BodyTypes;
    variant!: string;
    direction!: Direction;
    constructor (data: ICharacterModel) {
        Object.assign(this, data);
    }
};