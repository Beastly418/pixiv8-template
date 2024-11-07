import { AbstractEffect } from "./AbstractEffect";


export class DefaultEffect extends AbstractEffect {

    constructor() {
        super('DefaultEffect');
    }

    public override update(): void {
        console.log(this.toString());
        this.end();
    }
}