import { AbstractEffect } from "../effects/AbstractEffect";


export class EffectManager {
    private effectList:AbstractEffect[] = [];

    constructor() {}

    public update(dt:number) {
        for(let i = 0; i < this.effectList.length; i++) {
            this.effectList[i].update(dt);
            if(this.effectList[i].isDone) {
                if(!this.effectList[i].noisy) console.log('Popping %s from effect list.', this.effectList[i].name);
                this.effectList.splice(i, 1)[0].queuedEffects.forEach(effect => {
                    if(!effect.noisy) console.log(`Queued Effect ${effect.name}`);
                    this.add(effect.makeCopy()); //Remove the effect, add all of it's queued effects.  We use a copy here so we update the constructor values
                }); 
                //console.log(this.effectList)
            }
        }
    }

    public add(e:AbstractEffect):void {
        this.effectList.push(e);
    }


    public get listEmpty():boolean {
        return this.effectList.length == 0;
    }

}