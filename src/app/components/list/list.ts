import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

interface Task {
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})

export class List {
  items: Task[] = [];
  newItem = '';
  showInput = false;

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    const loginId = localStorage.getItem('loginId');
    if (!loginId) {
      console.error('No loginId found in localStorage.');
      return;
    }
    
    const url = `http://localhost:8080/api/tasks/${loginId}`;
    this.http.get<string[]>(url).subscribe({
      next: (response) => {
        this.items = response.map(task => ({ text: task, done: false }));
        this.cdRef.detectChanges();
        console.log('Fetched tasks:', this.items);
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  toggleInput() {
    this.showInput = !this.showInput;
  }

  addItem() {
    console.log('Adding item:', this.newItem);
    const url = 'http://localhost:8080/api/tasks';
    const body = { 
      loginId:localStorage.getItem('loginId'),
      taskName: this.newItem.trim()
    };
    this.http.post(url, body).subscribe({
      next: (response:any) => {
        console.log('Task added successfully:', response);
      },
      error: (error) => {
        console.error('Error adding task:', error);
      }
    });

    const value = this.newItem.trim();
    if (!value) return;
    this.items.push({ text: value, done: false });
    this.newItem = '';
  }

    removeItem(index: number) {
      const url = `http://localhost:8080/api/tasks/delete`;
      const body ={
        loginId: localStorage.getItem('loginId'),
        taskName: this.items[index].text
      }

      this.http.delete(url, { body }).subscribe({
        next: (response:any) => {
          console.log('Task removed successfully:', response);
        },
        error: (error) => {
          console.error('Error removing task:', error);
        }
      });

      this.items.splice(index, 1);
      console.log(`Removed item at index ${index}`, this.items);
  }

  onTaskChange(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;
    this.items[index].done = isChecked;

    console.log(`Task at index ${index} changed. Done status: ${isChecked}`);
    if (isChecked) {
      this.removeItem(index);
    }
  }
}