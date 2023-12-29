import Phaser from "phaser";

import { CharacterTraitsType } from "../../interfaces/SpritesheetMap";

export default class Traits extends Phaser.Events.EventEmitter {
    map: Map<CharacterTraitsType, Phaser.GameObjects.Sprite> = new Map();
};