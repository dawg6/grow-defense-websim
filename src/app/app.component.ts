import { Component, Inject } from '@angular/core';
import { Data, Talents, Skills, Log, Parameters, AttributeData } from './data';
import { FormsModule, SelectMultipleControlValueAccessor } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Subscription } from 'rxjs';

import { WorkerService } from './worker.service';
import { WorkerMessage } from '../../worker/app-workers/shared/worker-message.model';
import { WORKER_TOPIC } from '../../worker/app-workers/shared/worker-topic.constants';
import { isBoolean } from 'util';
import { copyAnimationEvent } from '@angular/animations/browser/src/render/shared';

const SAVE_PREFIX: string = "GrowDefense.";
const TALENTS_PREFIX: string = SAVE_PREFIX + "talents.";
const SKILLS_PREFIX: string = SAVE_PREFIX + "skills.";
const PARAMS_PREFIX: string = SAVE_PREFIX + "params.";
const POWER_PREFIX: string = SAVE_PREFIX + "power.";

const ATTRIBUTES: string[] = [
  "skills.arrow",
  "skills.laser",
  "skills.missileDamage",
  "skills.missileFiringRate",
  "skills.finger",
  "skills.cannon",
  "skills.bomb",
  "skills.numMissiles",
  "skills.arrowRoF",
  "skills.archers",
  "skills.lasers",
  "skills.bounces",
  "skills.bounceDmg",
  "talents.arrow",
  "talents.laser",
  "talents.critChance",
  "talents.critDamage",
  "talents.finger",
  "power.arrow",
  "power.laser",
  "power.missile",
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Data;
  Math = Math;
  workerTopic: string;
  currentWorkerMessage: WorkerMessage;
  workerServiceSubscription: Subscription;
  workerResponse: string;
  busy: Promise<any>
  resolver;
  version: string;
  versionDate: string;
  doPaste: boolean = false;
  pasteText: string;
  whatIf = {};

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private workerService: WorkerService) {
    this.data = new Data();

    this.pasteText = "";

    this.initWhatIf();
    this.data.update();
    this.updateAttributes();

    this.version = this.data.params.version;
    this.versionDate = this.data.params.versionDate;
  }

  private getLocalStorage(field: string, defaultValue: string) {

    var value: string = this.storage.get(field);

    return ((value != null) && (value != undefined)) ? value : defaultValue;
  }

  private saveObject(prefix: string, object: any) {
    for (var field of Object.keys(object)) {
      this.storage.set(prefix + field, object[field]);
    }
  }

  private loadObject(prefix: string, object: any): any {
    for (var field of Object.keys(object)) {
      var value = this.getLocalStorage(prefix + field, '' + object[field]);

      var n: any = Number(value);
      var b: any = Boolean(value);

      // console.log(prefix + field, value, object[field]);

      if (value && isBoolean(object[field])) {
        object[field] = value == 'true';
      } else if (value && isNaN(n)) {
        object[field] = value;
      } else {
        object[field] = n;
      }
    }


    return object;
  }

  ngOnInit() {
    this.load();
    this.workerTopic = WORKER_TOPIC.cpuIntensive;
    this.listenForWorkerResponse();
  }

  ngOnDestroy(): void {
    if (this.workerServiceSubscription) {
      this.workerServiceSubscription.unsubscribe();
    }
  }

  sendWorkerRequest(log: Log) {

    this.busy = new Promise<any>((resolve, reject) => {
      this.resolver = resolve;
    });

    const workerMessage = new WorkerMessage(this.workerTopic, log);
    this.workerService.doWork(workerMessage);
  }

  private listenForWorkerResponse() {
    this.workerServiceSubscription = this.workerService.workerUpdate$
      .subscribe(data => this.workerResponseParser(data));
  }

  private workerResponseParser(message: WorkerMessage) {
    // console.log("message", message);

    if (message.topic === this.workerTopic) {
      this.currentWorkerMessage = message;

      this.data.talents.arrow = message.data.best.talents.arrow;
      this.data.talents.laser = message.data.best.talents.laser;
      this.data.talents.critChance = message.data.best.talents.critChance;
      this.data.talents.critDamage = message.data.best.talents.critDamage;
      this.data.talents.finger = message.data.best.talents.finger;
      // leave defense alone

      this.data.talents.unspent = 0;

      this.data.update();
      this.updateAttributes();

      this.resolver();
      // console.log("data", this.data);
    }
  }

  save() {

    var d = new Parameters();

    this.data.params.version = d.version;
    this.data.params.versionDate = d.versionDate;

    this.saveObject(SKILLS_PREFIX, this.data.skills);
    this.saveObject(TALENTS_PREFIX, this.data.talents);
    this.saveObject(PARAMS_PREFIX, this.data.params);
    this.saveObject(POWER_PREFIX, this.data.power);

    alert("Form Data Saved");
  }

  load() {
    this.loadObject(SKILLS_PREFIX, this.data.skills);
    this.loadObject(TALENTS_PREFIX, this.data.talents);
    this.loadObject(PARAMS_PREFIX, this.data.params);
    this.loadObject(POWER_PREFIX, this.data.power);

    this.updateData();
  }

  updateData(event?: any) {
    this.data.update();

    this.updateAttributes();
  }

  updateAttributes() {
    for (var a of Object.keys(this.whatIf)) {

      var attr: AttributeData = this.whatIf[a];

      attr.calculate(this.data);

      // console.log(a, attr);

    }
  }

  getTooltip(a: string, b: string) {
    return "Adding " + this.whatIf[a]['inc'] + " to " + b + 
      " results in a total dps of " + this.whatIf[a]['dps'] + 
      ". a " + this.whatIf[a]['dpsPct'] + "% dps increase.";
  }

  optimize() {
    var l: Log = new Log();
    l.start = new Data();
    l.start.skills = this.data.skills;
    l.start.params = this.data.params;
    l.start.power = this.data.power;

    l.start.talents.arrow = this.data.talents.lockArrow ? this.data.talents.arrow : 0;
    l.start.talents.laser = this.data.talents.lockLaser ? this.data.talents.laser : 0;
    l.start.talents.critChance = this.data.talents.lockCC ? this.data.talents.critChance : 0;
    l.start.talents.critDamage = this.data.talents.lockCD ? this.data.talents.critDamage : 0;
    l.start.talents.defense = this.data.talents.lockDefense ? this.data.talents.defense : 0;
    l.start.talents.finger = this.data.talents.lockFinger ? this.data.talents.finger : 0;
    l.start.talents.unspent = 0;

    l.levels = this.data.talents.getLevel() - l.start.talents.getLevel();

    l.skills = 0;

    this.sendWorkerRequest(l);
  }

  reset() {
    this.data = new Data();
    this.data.update();
    this.updateAttributes();
  }

  copy(data: Data) {
    // console.log(data);
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', JSON.stringify(data));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');

  }
  paste() {
    this.doPaste = true;
    this.pasteText = "";
  }

  getPaste() {
    var d: Data = Data.fromJSON(this.pasteText);

    // console.log("paste = ", d);

    this.data = Data.copy(d);

    // console.log("Data = ", this.data);

    this.data.update();
    this.updateAttributes();

    this.doPaste = false;
    this.pasteText = "";
  }

  cancelPaste() {
    this.doPaste = false;
    this.pasteText = "";
  }

  initWhatIf() {
    this.whatIf = {};

    for (var i = 0; i < ATTRIBUTES.length; i++) {
      var name = ATTRIBUTES[i];
      var a = new AttributeData();

      a.name = name;
      a.inc = 1;

      this.whatIf[name] = a;
    }

    this.whatIf["skills.archers"]["max"] = 7;
    this.whatIf["skills.missileFiringRate"]["max"] = 20;
    this.whatIf["skills.numMissiles"]["max"] = 10;
    this.whatIf["skills.lasers"]["max"] = 2;
    this.whatIf["skills.finger"]["max"] = 2000;
    this.whatIf["skills.missileFiringRate"]["max"] = 20;
    this.whatIf["skills.bounces"]["max"] = 5;
    this.whatIf["skills.bounceDmg"]["max"] = 6;
    this.whatIf["skills.arrowRoF"]["max"] = 5;
    this.whatIf["talents.critChance"]["max"] = 100;

  }
}
