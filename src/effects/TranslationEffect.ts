import { Container } from "pixi.js";
import { AbstractEffect } from "./AbstractEffect";


export class TranslationEffect extends AbstractEffect {

    private _targetX:number;    // End position x
    private _targetY:number;    // End position y
    private _ppt:number;        // Pixels per tick
    private _target:Container;     // Target Container to apply this effect to

    private _step:{x:number, y:number} = {x:0,y:0};
    private _done:{x:boolean, y:boolean} = {x:false, y:false};


    constructor(target:Container, targetX:number, targetY:number, ppt:number=50, queuedEffects:AbstractEffect[]=[]) {
        super('TranslationEffect', true, queuedEffects);
        this._target = target;
        this._targetX = targetX;
        this._targetY = targetY;
        this._ppt = ppt;
        this.endTimer = 10/ppt;
        // dx = (x1 - x2)
        // dy = (y1 - y2)
        // d = sqrt(dx^2 + dy^2)
        // theta = arctan(dy/dx)
        // stepX = d*cos(theta) / _ppt
        // stepY = d*sin(theta) / _ppt
        let x2 = this._target.x; let x1 = this._targetX;
        let y2 = this._target.y; let y1 = this._targetY;
        let dx = (x1 - x2); let dy = (y1 - y2);
        let dx2 = Math.pow(dx, 2); let dy2 = Math.pow(dy, 2);
        let d = Math.sqrt((dx2 + dy2));
        let theta = Math.atan2(dy, dx);
        this._step.x = (d*Math.cos(theta))/this._ppt;
        this._step.y = (d*Math.sin(theta))/this._ppt;
        //console.log(dx, dy, d, theta, this._step);
    }

    public override update(dt: number): void {
        this.timer += dt;
        if(this.timer >= this.endTimer) {
            this.timer = 0;
            this._target.x += this._step.x;
            this._target.y += this._step.y;
            if(this._step.x < 0) {   // We're moving left
                if(this._target.x <= this._targetX) {
                    this._target.x = this._targetX;
                    this._done.x = true;
                }
            } else {    // We're moving right
                if(this._target.x >= this._targetX) {
                    this._target.x = this._targetX;
                    this._done.x = true;
                }
            }
            if(this._step.y < 0) {
                if(this._target.y <= this._targetY) {
                    this._target.y = this._targetY;
                    this._done.y = true;
                }
            } else {
                if(this._target.y >= this._targetY) {
                    this._target.y = this._targetY;
                    this._done.y = true;
                }
            }
        }
        if(this._done.x && this._done.y) {
            this.end();
        }
    }

    public override makeCopy(): AbstractEffect {
        return new TranslationEffect(this._target, this._targetX, this._targetY, this._ppt, this.queuedEffects);
    }
}