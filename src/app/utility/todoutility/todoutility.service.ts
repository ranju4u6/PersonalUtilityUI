import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITodo } from './todo';
import { AddNewTask } from './addtask';
import { tap } from 'rxjs/operators';
import { DeleteTask } from './deletetask';

/**
 * Service class that handles all operations related to ToDo/Task
 */
@Injectable({
    providedIn:"root"
})
export class ToDoUtilityService{
    private addTaskUrl: string = "api/addTask";
    private deleteTaskUrl: string = "api/deleteTask";
    private updateTaskUrl: string = "api/updateTask";
    private getAllTaskUrl: string = "api/getAllTask";

    constructor(private httpClient: HttpClient){

    }

    public addNewTask(newTaskRequest: AddNewTask): Observable<ITodo>{
        return this.httpClient.post<ITodo>(this.addTaskUrl, newTaskRequest).pipe(
            tap(addedtask => {
                console.log("Newly added Task:"+addedtask);
            })
        );
    }

    public getAllTasks(userId: String, sessionId: string):Observable<ITodo[]>{
        let param: any = {"userId": userId, "sessionId":sessionId};
        return this.httpClient.get<ITodo[]>(this.getAllTaskUrl, {params: param}).pipe(
            tap(tasks=>{
                console.log(tasks);
            })
        );
    }

    /**
     * 
     * @param taskId used to delete the specified task
     */
    public deleteTask(request: DeleteTask):Observable<boolean>{
        return this.httpClient.post<boolean>(this.deleteTaskUrl, request).pipe(
            tap(status=>{
                console.log(status);
            })
        );
    }

}