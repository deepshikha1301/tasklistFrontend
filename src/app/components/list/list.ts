import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  toggleInput() {
    this.showInput = true;
  }

  addItem() {
    console.log('Adding item:', this.newItem);
    const value = this.newItem.trim();
    if (!value) return;
    this.items.push({ text: value, done: false });
    this.newItem = '';
    this.showInput = false;
  }

    removeItem(index: number) {
    this.items.splice(index, 1);
    console.log(`Removed item at index ${index}`, this.items);
  }

  onTaskChange(index: number, event: any) {
  const isChecked = event.target.checked;
  console.log(`Task at index ${index} changed. Done status: ${isChecked}`);
    if (isChecked) {
      this.removeItem(index);
    }
  }
}