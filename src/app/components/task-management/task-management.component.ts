import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskManagement } from '../interfaces/task-management';
import { AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})
export class TaskManagementComponent implements OnInit {

  tasks = signal<TaskManagement[]>([]);

  formTask!: FormGroup;
  fb = inject(FormBuilder);
  badge = signal(0);

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.formTask = this.fb.group({
      id: 0,
      isComplete: false,
      isImportant: false,
      description: ['', Validators.required]
    });
  }

  changeComplete(complete: TaskManagement) {
    this.tasks.update(tasks => tasks.map(task => {
      if (task.id === complete.id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    }));
  }

  changeImportant(importante: TaskManagement) {
    this.tasks.update(tasks => tasks.map(task => {
      if (task.id === importante.id) {
        task.isImportant = !task.isImportant;
      }
      return task;
    }));
  }

  addTask() {
    this.id.setValue(this.id.value + 1);
    this.tasks.update(tasks => [...tasks, this.formTask.value]);
    console.log(this.tasks().length);
     
    this.badge.set(this.tasks().length);
  }

  updateTask(taskUpdate: TaskManagement) {
    this.tasks.update(tasks => tasks.map(task => {
      if (task.id === taskUpdate.id) {
        task.isImportant = !task.isImportant;
        return {...task, ...taskUpdate}
      }
      return task;
    }));
  }

  get id(): AbstractControl { return this.formTask.get('id')! }
}
