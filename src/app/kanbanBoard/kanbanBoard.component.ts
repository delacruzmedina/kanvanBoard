import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose

  task: string;

  ngOnInit() {
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.task = '';
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  onCreateTask() {
    if(this.task !== ''){
      this.tasks.push({name: this.task, stage: 0});
      this.configureTasksForRendering();
    }

    this.task = '';
    console.log(this.task);
  }

  nextStage(task: any) {
    console.log(task);
    task.stage = task.stage+1;
    this.configureTasksForRendering();
    console.log(task);
  }

  backStage(task: any) {
    task.stage = task.stage - 1;
    this.configureTasksForRendering();
  }

  delete(task: any) {

    const taskIndex = this.tasks.indexOf(task, 0);

    if(taskIndex > -1){
      this.tasks.splice(taskIndex, 1);
    }

    this.configureTasksForRendering();
  }
}

interface Task {
  name: string;
  stage: number;
}
