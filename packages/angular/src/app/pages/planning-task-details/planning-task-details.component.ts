import {
  Component, OnInit, NgModule, OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxTabPanelModule,
  DxToolbarModule,
} from 'devextreme-angular';
import {
  CardActivitiesModule,
  CardNotesModule,
  CardMessagesModule,
  TaskProirityModule,
  TaskStatusModule,
} from 'src/app/shared/components';
import { Task } from 'src/app/shared/types/task';
import { RwaService } from 'src/app/shared/services';
import { Subscription } from 'rxjs';
import { TaskFormModule } from './task-form/task-form.component';

@Component({
  templateUrl: './planning-task-details.component.html',
  styleUrls: ['./planning-task-details.component.scss'],
  providers: [RwaService],
})
export class PlanningTaskDetailsComponent implements OnInit, OnDestroy {
  task: Task;

  taskId = 1;

  taskName: string;

  dataSubscription: Subscription = new Subscription();

  loadData = () => {
    this.dataSubscription = this.service.getTask(this.taskId).subscribe((data) => {
      this.task = data;
      this.taskName = data.text;
    });
  };

  constructor(private service: RwaService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  refresh = () => this.loadData();
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDropDownButtonModule,
    DxTabPanelModule,
    DxToolbarModule,

    CardActivitiesModule,
    CardNotesModule,
    CardMessagesModule,
    TaskFormModule,
    TaskProirityModule,
    TaskStatusModule,

    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [PlanningTaskDetailsComponent],
})
export class PlanningTaskDetailsModule { }
