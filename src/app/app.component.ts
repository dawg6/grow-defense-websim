import { Component, Inject } from '@angular/core';
import { Data, Talents, Skills, Log } from './data';
import { FormsModule, SelectMultipleControlValueAccessor } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Subscription } from 'rxjs';

import { WorkerService } from './worker.service';
import { WorkerMessage } from '../../worker/app-workers/shared/worker-message.model';
import { WORKER_TOPIC } from '../../worker/app-workers/shared/worker-topic.constants';
import { delay } from 'q';

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
  workerTopic: string;
  currentWorkerMessage: WorkerMessage;
  workerServiceSubscription: Subscription;
  workerResponse: string;
  busy: Promise<any>
  resolver;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private workerService: WorkerService) {
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

      this.data.update();

      this.resolver();
      // console.log("data", this.data);
    }
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

  updateData() {
    this.data.update();
  }

  optimize(which: number) {
    var l: Log = new Log();
    l.start = new Data();
    l.start.skills = this.data.skills;
    l.start.params = this.data.params;
    l.skills = 0;
    l.levels = this.data.level;
    l.which = which;

    this.sendWorkerRequest(l);
  }
}
