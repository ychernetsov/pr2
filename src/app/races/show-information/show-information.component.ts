import { Component, OnInit } from '@angular/core';
import { RaceModel } from 'src/app/race.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as PonyRacerActions from '../store/ponyracer.actions';
import { tap, take } from "rxjs/operators";
import * as fromApp from '../../store/app.reducers';
import * as fromPonyRacer from '../store/ponyracer.reducers';

@Component({
  selector: 'app-show-information',
  templateUrl: './show-information.component.html',
  styleUrls: ['./show-information.component.css']
})
export class ShowInformationComponent implements OnInit {
  racesState: Observable<fromPonyRacer.State>;
  tableRaces: RaceModel[];

  ordinalIndicator(place: number) {
    return place === 1 ? "st" : place === 2 ? "nd" : place === 3 ? "rd" : "th"
  }
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.racesState = this.store.select("raceList");
    this.racesState.pipe(
      take(1),
      tap(races => {
        this.tableRaces = races.races.slice();
        return this.tableRaces.sort((a,b)=> b.scores-a.scores)
      })
    ).subscribe()
  }

  reset() {
    this.store.dispatch(new PonyRacerActions.ResetScores())
  }
}
