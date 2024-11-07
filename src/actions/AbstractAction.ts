
export abstract class AbstractAction {

    private _isDone:boolean;
    private _noisy:boolean;
    private _name:string;
    private _desc:string;

    public constructor(name:string, noisy:boolean, desc:string='') {
        this._isDone = false;
        this._noisy = noisy;
        this._name = name;
        this._desc = desc;
    }

    public abstract update(dt:number):void;
    
    public makeCopy():AbstractAction {
        const constructor = this.constructor as new (...args: any[]) => this;
        const copy = new constructor(this.name, this.noisy);
        return copy;
    }

    // ===== String stuff =====
    public get noisy():boolean {
        return this._noisy;
    }

    public get name():string {
        return this._name;
    }

    public toString():string {
        return this._desc;
    }
    // ===== String stuff =====

    
    // ===== Done stuff =====
    public get isDone():boolean {
        return this._isDone;
    }

    public end():void {
        this._isDone = true;
    }
    // ===== Done stuff =====
}