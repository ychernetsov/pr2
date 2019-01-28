import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromPonyRacer from './store/ponyracer.reducers';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {

  racesState: Observable<fromPonyRacer.State>;
 
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.racesState = this.store.select("raceList");
    this.racesState.subscribe()
  }

}
