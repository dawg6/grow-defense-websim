import { Component, Inject } from '@angular/core';
import { Data, Talents, Skills, Log, Parameters, AttributeData, StaticData } from './data';
import { FormsModule, SelectMultipleControlValueAccessor } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Subscription } from 'rxjs';
import { DecimalPipe } from '@angular/common';

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
const ATTRIBUTE_PREFIX: string = SAVE_PREFIX + "attributes.";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  StaticData: StaticData = StaticData.getInstance();
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
  log: Log = null;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private workerService: WorkerService, private dp: DecimalPipe) {
    this.data = new Data();

    this.pasteText = "";

    this.initWhatIf();
    this.validateInputs();
    this.data.update();
    this.updateAttributes();

    this.version = this.data.params.version;
    this.versionDate = this.data.params.versionDate;
  }

  private getLocalStorage(field: string, defaultValue: string): string {

    var value: string = '' + this.storage.get(field);

    return ((value != null) && (value != undefined)) ? value : defaultValue;
  }

  private saveObject(prefix: string, object: any) {
    for (var field of Object.keys(object)) {
      this.storage.set(prefix + field, object[field]);
    }
  }

  private loadObject(prefix: string, object: any): any {
    for (var field of Object.keys(object)) {
      var value: string = this.getLocalStorage(prefix + field, '' + object[field]);

      if (value != 'null') {
        var n: any = Number(value);
        var b: any = Boolean(value);

        // console.log(prefix + field, value, object[field]);
        if (value && isBoolean(object[field])) {
          object[field] = (value == "true");
        } else if (value && isNaN(n)) {
          object[field] = value;
        } else {
          object[field] = n;
        }
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
      this.data.talents.arrowMastery = message.data.best.talents.arrowMastery;
      this.data.talents.laserMastery = message.data.best.talents.laserMastery;
      this.data.talents.defense = message.data.best.talents.defense;

      this.data.talents.unspent = 0;

      this.validateInputs();
      this.data.update();
      this.updateAttributes();

      this.log = message.data;

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

    this.setAttributeData();

    this.saveObject(ATTRIBUTE_PREFIX, this.data.attributes);

    alert("Form Data Saved");
  }

  setAttributeData() {
    for (var a of StaticData.ATTRIBUTES) {
      var attr: AttributeData = this.whatIf[a];
      this.data.attributes[a] = attr.inc;
    }
  }

  getAttributeData() {

    for (var a of StaticData.ATTRIBUTES) {
      var attr: AttributeData = this.whatIf[a];

      if (this.data.attributes[a]) {
        attr.inc = this.data.attributes[a] as number;
      } else {
        attr.inc = 1;
      }
    }
  }

  load() {
    this.loadObject(SKILLS_PREFIX, this.data.skills);
    this.loadObject(TALENTS_PREFIX, this.data.talents);
    this.loadObject(PARAMS_PREFIX, this.data.params);
    this.loadObject(POWER_PREFIX, this.data.power);

    if (this.data.params.version < "v1.0.9") {
      var n = Math.floor(this.data.talents.laser / 100) + Math.floor(this.data.talents.arrow / 100);

      if (n > 0) {
        if (this.data.talents.laser > this.data.talents.arrow) {
          this.data.talents.laserMastery = Math.min(3, n);
          this.data.talents.arrowMastery = Math.min(3, n - this.data.talents.laserMastery);
        } else {
          this.data.talents.arrowMastery = Math.min(3, n);
          this.data.talents.laserMastery = Math.min(3, n - this.data.talents.arrowMastery);
        }
      }

    }

    this.setAttributeData();
    this.loadObject(ATTRIBUTE_PREFIX, this.data.attributes);

    var n = this.data.skills.numMissiles;
    this.data.skills.missileDamage = Math.max(this.data.skills.missileDamage, 1);

    if (n > 1) {
      this.data.skills.numMissiles = 1;
      this.data.power.numRockets = n - 1;
    }

    this.getAttributeData();

    // console.log(this.data);

    this.updateData();
  }

  updateData(event?: any) {

    this.validateInputs();
    this.data.update();
    this.updateAttributes();

  }

  validateInputs() {
    this.data.params.laserRoFv2 = Math.max(1, this.data.params.laserRoFv2);
    this.data.params.fingerRoF  = Math.max(0, this.data.params.fingerRoF);
    this.data.params.cannonRoF = Math.max(0.1, this.data.params.cannonRoF);

    this.data.skills.arrowRoF = Math.max(1, Math.min(5, this.data.skills.arrowRoF));
    this.data.skills.arrow = Math.max(1, this.data.skills.arrow);
    this.data.skills.laser = Math.max(1, this.data.skills.laser);
    this.data.skills.lasers = Math.max(1, Math.min(2, this.data.skills.lasers));
    this.data.skills.bounces = Math.max(0, Math.min(5, this.data.skills.bounces));
    this.data.skills.bounceDmg = Math.max(1, Math.min(6, this.data.skills.bounceDmg));
    this.data.skills.cannon = Math.max(0, this.data.skills.cannon);
    this.data.skills.bomb = Math.max(0, this.data.skills.bomb);
    this.data.skills.finger = Math.max(1, this.data.skills.finger);
    this.data.skills.missileDamage = Math.max(1, this.data.skills.missileDamage);
    this.data.skills.missileFiringRate = Math.max(0, Math.min(20, this.data.skills.missileFiringRate));
    this.data.skills.numMissiles = Math.max(0, Math.min(1, this.data.skills.numMissiles));

    this.data.power.arrow = Math.max(0, this.data.power.arrow);
    this.data.power.laser = Math.max(0, this.data.power.laser);
    this.data.power.missile = Math.max(0, this.data.power.missile);
    this.data.power.numRockets = Math.max(0, Math.min(9, this.data.power.numRockets));

    this.data.talents.arrow = Math.max(0, this.data.talents.arrow);
    this.data.talents.laser = Math.max(0, this.data.talents.laser);
    this.data.talents.critChance = Math.max(0, Math.min(100, this.data.talents.critChance));
    this.data.talents.critDamage = Math.max(0, this.data.talents.critDamage);
    this.data.talents.defense = Math.max(0, this.data.talents.defense);
    this.data.talents.unspent = Math.max(0, this.data.talents.unspent);

    var p = Math.floor(this.data.talents.arrow / 100) + Math.floor(this.data.talents.laser / 100);

    if (this.data.talents.laser > this.data.talents.arrow) {
      this.data.talents.laserMastery = Math.max(0, Math.min(Math.min(3, p), this.data.talents.laserMastery));
      this.data.talents.arrowMastery = Math.max(0, Math.min(Math.min(3, p - this.data.talents.laserMastery), this.data.talents.arrowMastery));
    } else {
      this.data.talents.arrowMastery = Math.max(0, Math.min(Math.min(3, p), this.data.talents.arrowMastery));
      this.data.talents.laserMastery = Math.max(0, Math.min(Math.min(3, p - this.data.talents.arrowMastery), this.data.talents.laserMastery));
    }
  }

  updateAttributes() {

    var best = {};
    var bestCoin: number = 0;
    var bestGem: number = 0;

    for (var a of Object.keys(this.whatIf)) {

      var s = a.split('.');
      var b: number = best[s[0]];

      var attr: AttributeData = this.whatIf[a];

      attr.inc = Math.max(1, attr.inc);
      
      attr.calculate(this.data);

      if (!b || (attr.dps > b)) {
        b = attr.dps;
        best[s[0]] = b;
      }

      if (attr.name.startsWith("skills.")) {
        if (attr.dpsPerCoin && (attr.dpsPerCoin > bestCoin)) {
          bestCoin = attr.dpsPerCoin;
        }
      } else if (attr.name.startsWith("power.")) {
        if (attr.dpsPerCoin && (attr.dpsPerCoin > bestGem)) {
          bestGem = attr.dpsPerCoin;
        }
      }
    }

    for (var a of Object.keys(this.whatIf)) {

      var s = a.split('.');
      var b: number = best[s[0]];
      var attr: AttributeData = this.whatIf[a];

      attr.best = (attr.dps >= b);

      if (attr.name.startsWith("skills.")) {
        attr.bestCoin = (attr.dpsPerCoin >= bestCoin);
      } else if (attr.name.startsWith("power.")) {
        attr.bestCoin = (attr.dpsPerCoin >= bestGem);
      }
    }
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
    l.start.talents.arrowMastery = this.data.talents.lockArrowMastery ? this.data.talents.arrowMastery : 0;
    l.start.talents.laserMastery = this.data.talents.lockLaserMastery ? this.data.talents.laserMastery : 0;

    l.start.talents.unspent = 0;

    l.levels = this.data.talents.getLevel() - l.start.talents.getLevel();

    l.skills = 0;

    this.sendWorkerRequest(l);
  }

  reset() {
    this.data = new Data();

    for (var a of Object.keys(this.whatIf)) {
      var attr: AttributeData = this.whatIf[a];
      attr.inc = this.data.attributes[a];
    }

    this.validateInputs();
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

    this.setAttributeData();

    // console.log("paste = ", d);
    // console.log("before Data = ", this.data);

    this.data = Data.copy(d);

    if (this.data.params.version < "v1.0.9") {
      var n = Math.floor(this.data.talents.laser / 100) + Math.floor(this.data.talents.arrow / 100);

      if (n > 0) {
        if (this.data.talents.laser > this.data.talents.arrow) {
          this.data.talents.laserMastery = Math.min(3, n);
          this.data.talents.arrowMastery = Math.min(3, n - this.data.talents.laserMastery);
        } else {
          this.data.talents.arrowMastery = Math.min(3, n);
          this.data.talents.laserMastery = Math.min(3, n - this.data.talents.arrowMastery);
        }
      }

    }

    this.getAttributeData();

    var n = this.data.skills.numMissiles;
    this.data.skills.missileDamage = Math.max(this.data.skills.missileDamage, 1);

    if (n > 1) {
      this.data.skills.numMissiles = 1;
      this.data.power.numRockets = n - 1;
    }

    // console.log("Data = ", this.data);

    this.validateInputs();
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

    for (var i = 0; i < StaticData.ATTRIBUTES.length; i++) {
      var name = StaticData.ATTRIBUTES[i];
      var a = new AttributeData();

      a.name = name;
      a.inc = 1;

      this.whatIf[name] = a;
    }

    this.whatIf["skills.archers"]["max"] = 7;
    this.whatIf["skills.missileFiringRate"]["max"] = 20;
    this.whatIf["skills.numMissiles"]["max"] = 1;
    this.whatIf["power.numRockets"]["max"] = 9;
    this.whatIf["skills.lasers"]["max"] = 2;
    this.whatIf["skills.finger"]["max"] = 2000;
    this.whatIf["skills.missileFiringRate"]["max"] = 20;
    this.whatIf["skills.bounces"]["max"] = 5;
    this.whatIf["skills.bounceDmg"]["max"] = 6;
    this.whatIf["skills.arrowRoF"]["max"] = 5;
    this.whatIf["talents.critChance"]["max"] = 100;
    this.whatIf["talents.arrowMastery"]["max"] = 3;
    this.whatIf["talents.laserMastery"]["max"] = 3;

  }

  getBounceData(): any[] {
    return StaticData.BOUNCE_HIT_TABLE;
  }

  updateLaserMastery(event: any) {

    var n = this.data.stats.masteryPoints;

    if ((this.data.talents.laserMastery + this.data.talents.arrowMastery) > n) {
      this.data.talents.arrowMastery = Math.max(0, Math.min(3, n - this.data.talents.laserMastery));
    }

    this.updateData();
  }

  updateArrowMastery(event: any) {

    var n = this.data.stats.masteryPoints;

    if ((this.data.talents.laserMastery + this.data.talents.arrowMastery) > n) {
      this.data.talents.laserMastery = Math.max(0, Math.min(3, n - this.data.talents.arrowMastery));
    }

    this.updateData();
  }

  getIncTooltip(which: AttributeData, label:string ): string {
    var inc = which.dps - this.data.stats.totalDps;
    var damage = this.dp.transform(inc, '1.0-1');
    var dps = this.dp.transform(which.dps, '1.0-1');
    
    return `Adding ${which.inc} to ${label} results in an increase of ${damage} dps for a total dps of ${dps}, which is a ${which.dpsPct}% dps increase.`;
  }
}
