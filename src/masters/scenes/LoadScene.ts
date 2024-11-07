import { Assets } from "pixi.js";
import { AbstractScene } from "./AbstractScene";
import { GameManager } from "../../managers/GameManager";
import { SCENES } from "../../managers/SceneManager";


export class LoadScene extends AbstractScene {

    public constructor() {
        super();
        this.init(); // Just setting up the containers here... Probably remove later
        this.initializeLoader().then(() => {
            GameManager.sceneManager.init();
            GameManager.sceneManager.changeScene(SCENES.START);
            
        });
    }

    private async initializeLoader(): Promise<void> {
        console.log('Starting to load Assets');
        Assets.init();

        Assets.add({alias:'tex', src:'tex.json'});

        await Assets.load('tex');//.then((ss:Spritesheet) => {ss.textureSource.scaleMode = 'nearest'});
        
        console.log('Assets loaded');
    }

    //Doesn't do anything since this is all pre loading
    public update(): void {}
}
