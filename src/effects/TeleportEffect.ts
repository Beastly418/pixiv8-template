import { Container } from "pixi.js";
import { AbstractEffect } from "./AbstractEffect";


export class TeleportEffect extends AbstractEffect {

    private _targetX:number;    // End position x
    private _targetY:number;    // End position y
    private _target:Container;     // Target Container to apply this effect to

    constructor(target:Container, targetX:number, targetY:number, queuedEffects:AbstractEffect[]=[]) {
        super('TeleportEffect', true, queuedEffects);
        this._target = target;
        this._targetX = targetX;
        this._targetY = targetY;
    }

    public override update(): void {
        //console.log(this._targetX);
        this._target.position.set(this._targetX, this._targetY);
        this.end();
    }

    public override makeCopy(): AbstractEffect {
        return new TeleportEffect(this._target, this._targetX, this._targetY, this.queuedEffects);
    }
}