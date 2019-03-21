import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RacesComponent } from './races/races.component';
import { RaceComponent } from './races/race/race.component';
import { ControlsComponent } from './races/controls/controls.component';
import { FormsModule } from '@angular/forms';
import { ShowInformationComponent } from './races/show-information/show-information.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { metaReducers } from './store/app.reducers';

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
    FormsModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
