import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskManagement } from '../interfaces/task-management';
import { AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})
export class TaskManagementComponent implements OnInit {

  tasks = signal<TaskManagement[]>([]);

  formTask!: FormGroup;
  fb = inject(FormBuilder);


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

  addTask() {
    this.id.setValue(this.id.value + 1);
    console.log(this.formTask.value);

    this.tasks.update(tasks => [...tasks, this.formTask.value]);
  }

  get id(): AbstractControl { return this.formTask.get('id')! }
}
