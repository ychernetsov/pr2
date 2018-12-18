import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RacesComponent } from './races/races.component';
import { RaceComponent } from './races/race/race.component';
import { ControlsComponent } from './races/controls/controls.component';
import { FormsModule } from '@angular/forms';
import { ShowInformationComponent } from './races/show-information/show-information.component';

@NgModule({
  declarations: [
    AppComponent,
    RacesComponent,
    RaceComponent,
    ControlsComponent,
    ShowInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
