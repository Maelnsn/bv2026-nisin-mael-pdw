import { Component, Input } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [DatePipe, UpperCasePipe, FormsModule],
  selector: 'app-me-page',
  styleUrl: './me-page.scss',
  templateUrl: './me-page.html',
})
export class MePage {
  @Input() name!: string;
  @Input() firstname!: string;
  age: number = 27;
  date: Date = new Date();

  plusAge(): void {
    this.age++;
  }
}
