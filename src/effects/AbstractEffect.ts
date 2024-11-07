

export abstract class AbstractEffect {

    protected timer:number = 0;
    protected endTimer:number = 0;
    private _isDone:boolean = false;
    private _queuedEffects:AbstractEffect[];
    private _name:string;
    private _noisy:boolean;

    constructor(name:string='AbstractGameEffect', noisy:boolean=true, queuedEffects:AbstractEffect[]=[]) {
        this._queuedEffects = queuedEffects;
        this._name = name;
        this._noisy = noisy;
    }
    
    public abstract update(dt:number):void;


    public makeCopy():AbstractEffect {
        const constructor = this.constructor as new (...args: any[]) => AbstractEffect;
        return new constructor(this._name, this._noisy, this._queuedEffects);
    }

    // ===== String stuff =====
    public get noisy():boolean {
        return this._noisy;
    }

    public get name():string {
        return this._name;
    }

    public toString():string {
        return this._name;
    }
    // ===== String stuff =====


    // ===== Done stuff =====
    public get isDone():boolean {
        return this._isDone;
    }

    public end():void {
       // console.log(this.name + ' is done')
        this._isDone = true;
    }
    // ===== Done stuff =====

    // ===== Queued Effects stuff =====
    public set queuedEffects(e:AbstractEffect[]) {
        this._queuedEffects = e;
    }

    public get queuedEffects():AbstractEffect[] {
        return this._queuedEffects;
    }
    // ===== Queued Effects stuff =====

}