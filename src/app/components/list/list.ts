import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class List {
  items = ['Example task'];
  newItem = '';

  addItem() {
    const value = this.newItem.trim();
    if (!value) return;
    this.items.push(value);
    this.newItem = '';
  }
}