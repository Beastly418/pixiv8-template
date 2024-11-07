import { AbstractEffect } from "./AbstractEffect";


export class DelayEffect extends AbstractEffect {

    private _delay:number;
    constructor(delay:number, queuedEffects:AbstractEffect[]=[]) {
        super('DelayEffect', false, queuedEffects);
        this._delay = delay;
    }

    public override update(dt: number): void {
        this.timer += dt;
        if(this.timer >= this._delay) {
            this.end();
        }
    }

    public override makeCopy(): AbstractEffect {
        return new DelayEffect(this._delay, this.queuedEffects);
    }
}