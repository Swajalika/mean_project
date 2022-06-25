import { Component, OnInit } from '@angular/core';
import List from 'src/app/models/list';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any;
  tasks: any;
  listId: string = "";
  
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.taskService.getLists().subscribe(
        lists => {this.lists = lists}
      );

    this.route.params.subscribe((params: Params) => {
      
      this.listId = params['listId'];
      //const listId = "6285020dec52892934658bf4";
      if(!this.listId) return;
      this.taskService.getTasks(this.listId).subscribe(
              tasks => {this.tasks = tasks}
            );
    });
  }

  onTaskClick(task: Task){
    this.taskService.setCompleted(this.listId, task).subscribe(
      () => task.completed = !task.completed
    );
  }

  deleteTask(task: Task){
    this.taskService.deleteTask(this.listId, task._id).subscribe(
      (task: any) => this.tasks = this.tasks.filter((t: Task) => t._id != task._id)
    );
  }
  
  deleteList(list: List){
    this.taskService.deleteList(list._id).subscribe(
      () => this.lists = this.lists.filter((l: List) => l._id != list._id)
    );
    this.taskService.getTasks(this.listId).subscribe(
      tasks => {this.tasks = []}
    );
  }

  addTaskClick(){
    if(!this.listId){
      alert("Please select a list to add tasks to");
      return;
    }
    this.router.navigate(['./new-task'],{ relativeTo: this.route});
  }

}
