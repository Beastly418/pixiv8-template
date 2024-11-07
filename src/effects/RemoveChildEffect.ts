import { Container } from "pixi.js";
import { AbstractEffect } from "./AbstractEffect";

/**
 * Use this effect to remove something from it's parent container after we're done
*/
export class RemoveChildEffect extends AbstractEffect {

    private _parentContainer:Container;
    private _childContainer:Container;

    constructor(parent:Container, child:Container) {
        super('RemoveChildEffect');
        this._parentContainer = parent;
        this._childContainer = child;
    }

    public override update(): void {
        this._parentContainer.removeChild(this._childContainer);
        this.end();
    }

    public override makeCopy(): AbstractEffect {
        return new RemoveChildEffect(this._parentContainer, this._childContainer);
    }
}