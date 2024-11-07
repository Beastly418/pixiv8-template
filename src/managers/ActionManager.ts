
import { Queue } from "queue-typescript"
import { AbstractAction } from "../actions/AbstractAction";
import { DefaultAction } from "../actions/DefaultAction";

enum PHASE {
    WAITING_ON_USER,
    EXECUTING_ACTION
}

export class ActionManager {

    private phase:PHASE = PHASE.WAITING_ON_USER;
    private actionQueue:Queue<AbstractAction> = new Queue<AbstractAction>();
    private currentAction:AbstractAction = new DefaultAction();

    public update(dt:number) {
        switch(this.phase) {
            case PHASE.WAITING_ON_USER:
                this.getNextAction();
                break;
            case PHASE.EXECUTING_ACTION:
                if(!this.currentAction.isDone) {
                    this.currentAction.update(dt);
                } else {
                    this.getNextAction();
                }
        }
    }

    public add(action:AbstractAction):void {
        if(action==null) return;    //Safety check
        this.actionQueue.enqueue(action);
        if(!action.noisy) {
            console.log('Added ' + action.name + ' to the queue.');
        }
    }

    public addToFront(action:AbstractAction):void {
        if(action==null) return;
        this.actionQueue.prepend(action);
        if(!action.noisy) {
            console.log('Added ' + action.name + ' to the queue.');
        }
    }

    private getNextAction():void {
        if(this.actionQueue.length != 0) {
            this.currentAction = this.actionQueue.dequeue();
            if(!this.currentAction.noisy) {
                console.log(this.currentAction.name + ' action has been popped from the queue.');
            }
            this.phase = PHASE.EXECUTING_ACTION;
        } else {
            this.phase = PHASE.WAITING_ON_USER;
        }
    }
}

