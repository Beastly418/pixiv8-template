import { Application } from "pixi.js";
import { SceneManager } from "./SceneManager";
import { ActionManager } from "./ActionManager";
import { EffectManager } from "./EffectManager";

export function getDimPix():{width:number, height:number} {
    return {width:1920, height:1080};
}

export class GameManager {

    private constructor() {};

    public static app:Application;
    public static sceneManager:SceneManager;
    public static actionManager:ActionManager;
    public static effectManager:EffectManager;

    public static async init():Promise<void> {
        GameManager.app = new Application();
        await GameManager.app.init({
            canvas: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0xff00ff,
            width: getDimPix().width,
            height: getDimPix().height
        });

        window.addEventListener('resize', GameManager.resize);
        GameManager.resize();

        GameManager.app.ticker.add((time) => GameManager.update(time.deltaMS));
        
        GameManager.actionManager = new ActionManager();
        GameManager.effectManager = new EffectManager();
        GameManager.sceneManager = new SceneManager();
    }

    private static update(elapsedMS:number): void {
        GameManager.sceneManager.update(elapsedMS);
        GameManager.actionManager.update(elapsedMS);
        GameManager.effectManager.update(elapsedMS);
    }

    public static resize():void {
        // current screen size
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
        // uniform scale for our game
        const scale = Math.min(screenWidth / getDimPix().width, screenHeight / getDimPix().height);

        // the "uniformly englarged" size for our game
        const enlargedWidth = Math.floor(scale * getDimPix().width);
        const enlargedHeight = Math.floor(scale * getDimPix().height);

        // margins for centering our game
        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        // now we use css trickery to set the sizes and margins
        GameManager.app.canvas.style.width = `${enlargedWidth}px`;
        GameManager.app.canvas.style.height = `${enlargedHeight}px`;
        GameManager.app.canvas.style.marginLeft = GameManager.app.canvas.style.marginRight = `${horizontalMargin}px`;
        GameManager.app.canvas.style.marginTop = GameManager.app.canvas.style.marginBottom = `${verticalMargin}px`;
    }
}