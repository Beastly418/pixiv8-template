import { Container } from "pixi.js";
import { GameManager } from "./GameManager";
import { AbstractScene } from "../masters/scenes/AbstractScene";
import { LoadScene } from "../masters/scenes/LoadScene";
import { StartScene } from "../masters/scenes/StartScene";


export class SceneManager {

    private sceneList:AbstractScene[] = [];
    private allScenesContainter:Container = new Container(); // What we attach to the gameStage it holds all of the scenes in our game
    
    private activeScene:AbstractScene;
    private loadScene:LoadScene;  // split off on it's own so we can easily kill


    public constructor() {
        
        GameManager.app.stage.addChild(this.allScenesContainter); 
        this.loadScene = new LoadScene();
        this.allScenesContainter.addChild(this.loadScene);

        // == Fill out the scene list here ==
        this.sceneList[SCENES.START] = new StartScene();

        

        // == End the scene list here ==

        // Set the load scene to the active scene
        this.activeScene = this.loadScene;
        console.log(GameManager.app.stage);
        //GameManager.app.stage.addChild(this.sceneList[SCENES.BATTLE])
    }

    public init():void {
        console.log('Initializing Scenes!');
        this.sceneList.forEach(scene => {
            scene.init();   // initialize the scene
            scene.visible = false; // default it to invisible
            this.allScenesContainter.addChild(scene); // add it to the scene container
        });

        // remove the load scene from the scene container so we can free up resouces
        this.allScenesContainter.removeChild(this.loadScene);
    }

    public changeScene(scene:SCENES):void {
        console.log('Changing scene to: ' + scene);
        this.activeScene.turnOff();
        this.activeScene = this.sceneList[scene];
        this.activeScene.turnOn();
        this.activeScene.visible = true;
    }

    public overwriteScene(scene:AbstractScene, sceneNumber:SCENES) {
        scene.init();
        this.sceneList[sceneNumber] = scene;
        this.allScenesContainter.addChild(this.sceneList[sceneNumber]);
    }

    public update(dt:number):void {
        this.activeScene.update(dt);
        
    }

}

export enum SCENES {
    START
}