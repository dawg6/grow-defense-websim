import { Component } from '@angular/core';
import { Data } from './data';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data : Data;
  Math = Math;
  
  constructor() {
    this.data = new Data();

    this.data.level = 135;
  }

  updateData(value: any) {
    this.data.update();
  }
}
