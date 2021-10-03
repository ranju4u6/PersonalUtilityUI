import { Component, OnInit } from '@angular/core';
import { ToDoUtilityService } from './todoutility.service';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ITodo } from './todo';
import { DeleteTask } from './deletetask';
import { AddNewTask } from './addtask';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

/**
 * Compenent class that handles the UI screen for user's todo list 
 */

@Component({
  selector: 'app-todoutility',
  templateUrl: './todoutility.component.html',
  styleUrls: ['./todoutility.component.css']
})
export class TodoutilityComponent implements OnInit {

  private user: User;
  public addTaskForm: FormGroup;
  public taskList: ITodo[];

  constructor(private toDoService: ToDoUtilityService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit() {
    //get the logged in user
    this.user = this.userService.getUser();

    //Only USER is allowed here
    if(this.user.userType.userType === 'ADMIN'){
      this.router.navigate(['welcome/home']);
    }

    //add task FormGroup creation
    this.addTaskForm = this.formBuilder.group({
      task: ['', Validators.required],
      targetDate: ['', [Validators.required, dateValidator]],
      userId: this.user.userId
    });

    //get all tasks for logged in user
    this.toDoService.getAllTasks(this.user.userId, this.user.sessionId).subscribe(
      data => {
        this.taskList = data;
      }, errorData => {
        console.log("Failed to get the tasks");
      }
    );
  }

  /**
   * Method that hasndles the delete taqsk operation
   * @param taskId 
   */
  public deleteTask(taskId: string): void {
    if (!confirm("Do you want to delete this task?")) {
      return;
    }

    let taskToDelete;
    this.taskList.forEach(task => {
      if (task.id === taskId) {
        taskToDelete = task;
      }
    });

    this.toDoService.deleteTask(new DeleteTask(this.user.sessionId, taskToDelete)).subscribe(
      status => {
        this.taskList.forEach(task => {
          if (task.id === taskId) {
            this.taskList.splice(this.taskList.indexOf(task), 1);
          }
        });
        this.toastrService.info("Task Deleted");
      }, errorData => {
        console.log("Unable to delete task");
        this.toastrService.error("Task Deletion Failed");
        
      }
    );
  }

  /**
   * Method that handles the add task operation
   */
  public addTask(): void {
    let newTask = JSON.parse(JSON.stringify(this.addTaskForm.value));
    newTask.i

    this.toDoService.addNewTask(new AddNewTask(this.user.sessionId, newTask)).subscribe(
      newTask => {
        this.taskList.push(newTask);
        this.toastrService.success("Task Added");
      }, errorData => {
        console.log("Unable to add task");
        this.toastrService.error("Task Add Failed");
      }
    );
  }

  /**
   * Method that checks if the given date is in past or not
   * @param targetDate 
   */
  public isPastDate(targetDate: string): boolean {
    var date = moment(targetDate);
    var now = moment().startOf('day');
    if (now > date) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Method that compares the given date with today's date
   * @param targetDate 
   */
  public isToday(targetDate: string): boolean {
    var date = moment(targetDate).format('YYYY-MM-DD');
    var now = moment().format('YYYY-MM-DD');
    if (now === date) {
      return true;
    } else {
      return false;
    }
  }

}
/**
 * Custom validator for Target date.
 */
function dateValidator(control: AbstractControl): { [key: string]: boolean } | null {

  if (control && control.value && !moment(control.value, 'YYYY-MM-DD', true).isValid()) {
    return { 'dateVaidator': true };
  }
  return null;
}
