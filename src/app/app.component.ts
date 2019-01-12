import { Component, Inject } from '@angular/core';
import { Data, Talents, Skills, Log } from './data';
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
  log : Log;

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
      object[field] = Number(value);
    }

    return object;
  }

  ngOnInit() {
    this.load();
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

  optimize() {
    var l : Log = new Log();
    l.start = new Data();
    l.start.skills = this.data.skills;
    l.skills = 0;
    l.levels = this.data.level;

    this.simulate(l);

    this.log = l;
  }

  simulate(l: Log) {

    var points = l.levels - 1;

    console.log("points=", points);

    var max : Data = new Data();
    max.skills = l.start.skills;
    max.update();

    for (var arrow = 0; arrow <= points; arrow++) {
      var m = points - arrow;

      for (var laser = 0; laser <= m; laser++) {

        var n = Math.min(points - (arrow + laser), 100);

        for (var cc = 0; cc <= n; cc++) {

          var cd = points - (arrow + laser + cc);

          var r : Data = new Data();

          r.skills = l.start.skills;
          r.talents.arrow = arrow;
          r.talents.laser = laser;
          r.talents.critChance = cc;
          r.talents.critDamage = cd;
          r.update();

          if (r.stats.totalDps > max.stats.totalDps) {
            max = r;
          }

          l.data.push(r);
        }
      }
    }

    console.log("max =", max, "rows=", l.data.length);
    this.data.talents = max.talents;
    this.data.update();
  }
}
