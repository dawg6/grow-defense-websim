import { Component, Inject } from '@angular/core';
import { Data, Talents, Skills, Log } from './data';
import { FormsModule } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

const SAVE_PREFIX: string = "GrowDefense.";
const TALENTS_PREFIX: string = SAVE_PREFIX + "talents.";
const SKILLS_PREFIX: string = SAVE_PREFIX + "skills.";
const PARAMS_PREFIX: string = SAVE_PREFIX + "params.";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Data;
  Math = Math;
  log: Log;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private spinnerService: Ng4LoadingSpinnerService) {
    this.data = new Data();
  }

  private getLocalStorage(field: string, defaultValue: string) {
    var value: string = this.storage.get(field);

    return (value != undefined) ? value : defaultValue;
  }

  private saveObject(prefix: string, object: any) {
    for (var field of Object.keys(object)) {
      this.storage.set(prefix + field, object[field]);
    }
  }

  private loadObject(prefix: string, object: any): any {
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
    this.saveObject(PARAMS_PREFIX, this.data.params);

    alert("Form Data Saved");
  }

  load() {
    this.loadObject(SKILLS_PREFIX, this.data.skills);
    this.loadObject(TALENTS_PREFIX, this.data.talents);
    this.loadObject(PARAMS_PREFIX, this.data.params);

    this.updateData();
  }

  optimize(which: number) {
    this.spinnerService.show();

    var l: Log = new Log();
    l.start = new Data();
    l.start.skills = this.data.skills;
    l.start.params = this.data.params;
    l.skills = 0;
    l.levels = this.data.level;
    l.which = which;

    this.simulate(l);

    this.log = l;

    this.spinnerService.hide();
  }

  simulate(l: Log) {

    var points = l.levels - 1;

    var max: Data = new Data();
    var r: Data = new Data();
    max.skills = l.start.skills;
    max.params = l.start.params;
    max.update();
    r.skills = l.start.skills;
    r.params = l.start.params;

    var arrowMin = 0;
    var laserMin = 0;

    if (l.which == 1) {
      arrowMin = l.levels > 100 ? 100 : 0;
    } else if (l.which == 2) {
      laserMin = l.levels > 100 ? 100 : 0;
    }


    for (var arrow:number = arrowMin; arrow <= points; arrow++) {
      var m = points - arrow;

      for (var laser:number = laserMin; laser <= m; laser++) {

        var n = Math.min(points - (arrow + laser), 100);

        for (var cc:number = 0; cc <= n; cc++) {

          var cd:number = points - (arrow + laser + cc);

          r.talents.arrow = arrow;
          r.talents.laser = laser;
          r.talents.critChance = cc;
          r.talents.critDamage = cd;
          r.update();

          if (r.stats.totalDps > max.stats.totalDps) {
            // console.log("arrow", arrow, "laser", laser, "cc", cc, "cd", cd, "dps", r.stats.totalDps);
            max.talents.arrow = arrow;
            max.talents.laser = laser;
            max.talents.critChance = cc;
            max.talents.critDamage = cd;
            max.stats.totalDps = r.stats.totalDps;
          }
        }
      }
    }

    this.data.talents = max.talents;
    this.data.update();
  }
}
