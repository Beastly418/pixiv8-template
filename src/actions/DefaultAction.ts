import { AbstractAction } from "./AbstractAction";

export class DefaultAction extends AbstractAction{

    constructor() {
        super('DefaultAction', false, 'Just a Default Action');
    }

    public update(): void {
        this.end();
    }
}