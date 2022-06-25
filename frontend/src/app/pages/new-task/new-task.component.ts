import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import List from 'src/app/models/list';
import Task from 'src/app/models/task';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  listId : string = "";

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe((params: Params) => this.listId = params['listId']);
  }

  ngOnInit(): void {
  }

  addTask(value: string){
    this.taskService.createTask(this.listId,value)
      .subscribe(() => this.router.navigate(['../'],{ relativeTo: this.route}));
  }
}
