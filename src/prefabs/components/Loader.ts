import Phaser from "phaser";

export default class Loader extends Phaser.Events.EventEmitter {};

async function once (scene: Phaser.Scene, event: string) {
    return new Promise(resolve => scene.load.once(event, resolve));
};