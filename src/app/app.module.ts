import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StorageServiceModule} from 'angular-webstorage-service';
import { WorkerService } from './worker.service';
import {NgBusyModule} from './ng-busy/src/lib/ng-busy.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2DynamicDialogModule } from './ng2-dynamic-dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Ng2DynamicDialogModule,
    FormsModule,
    NgBusyModule,
    StorageServiceModule
  ],
  providers: [WorkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
