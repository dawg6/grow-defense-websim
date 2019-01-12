import { Component, Inject } from '@angular/core';
import { Data, Talents, Skills } from './data';
import { FormsModule } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

const SAVE_PREFIX : string = "GrowDefense.";
const TALENTS_PREFIX : string = SAVE_PREFIX + "talents.";
const SKILLS_PREFIX : string = SAVE_PREFIX + "skills.";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data : Data;
  Math = Math;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.data = new Data();
  }

  private getLocalStorage(field: string, defaultValue: string) {
    var value: string = this.storage.get(field);

    return value ? value : defaultValue;
  }

  private saveObject(prefix: string, object:any) {
    for (var field of Object.keys(object)) {
      this.storage.set(prefix + field, object[field]);
    }
  }

  private loadObject(prefix: string, object:any): any {
    for (var field of Object.keys(object)) {
      var value = this.getLocalStorage(prefix + field, '' + object[field]);
      console.log("Loaded " + prefix + field + "=", value);
      object[field] = Number(value);
    }

    return object;
  }

  updateData(value?: any) {
    this.data.update();
  }

  save() {
    this.saveObject(SKILLS_PREFIX, this.data.skills);
    this.saveObject(TALENTS_PREFIX, this.data.talents);

    alert("Form Data Saved");
  }

  load() {
    this.loadObject(SKILLS_PREFIX, this.data.skills);
    this.loadObject(TALENTS_PREFIX, this.data.talents);

    this.updateData();
  }
}
