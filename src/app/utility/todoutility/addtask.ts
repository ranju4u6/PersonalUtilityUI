import { ITodo } from './todo';

/**
 * UI Model representing the add task request
 */
export class AddNewTask{
    sessionId:string;
    newTask: ITodo;

    constructor(sessionId: string, newTask: ITodo){
        this.sessionId = sessionId;
        this.newTask = newTask;
    }
}