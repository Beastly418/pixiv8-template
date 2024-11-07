import { Container } from "pixi.js";


export abstract class AbstractScene extends Container {
    public background:Container = new Container(); //Setting this as a container in case we want to do something funny
    public midground:Container = new Container();
    public foreground:Container = new Container();

    public abstract update(dt:number):void;
    public turnOn():void {this.visible = true;}
    public turnOff():void {this.visible = false;}
    public init():void {
        this.addChild(this.background);
        this.addChild(this.midground);
        this.addChild(this.foreground);
    }

}