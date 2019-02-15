import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducers';
import * as fromPonyRacer from './races/store/ponyracer.reducers'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ponyracer';

  racesState: Observable<fromPonyRacer.State>;
  
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.racesState = this.store.select("raceList");
    this.racesState.subscribe()
  }
}
