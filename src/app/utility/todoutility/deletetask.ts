import { ITodo } from './todo';

/**
 * UI Model that represent the deletye task request
 */
export class DeleteTask{
    sessionId:string;
    task: ITodo;

    constructor(sessionId: string, task: ITodo){
        this.sessionId = sessionId;
        this.task = task;
    }
}