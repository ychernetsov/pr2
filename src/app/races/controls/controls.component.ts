import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { RaceModel } from '../../race.model';
import { Store } from '@ngrx/store';
import * as PonyRacerActions from '../store/ponyracer.actions';
import { tap } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducers';
import * as fromPonyRacer from '../store/ponyracer.reducers';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  addPonyForm = false;
  races: RaceModel[] = [];
  raceLength: number;
  poniesAreAboutToFinish: number;
  raceRuns: boolean = false;
  isNameValid: boolean = false;
  racesState: Observable<fromPonyRacer.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.racesState = this.store.select("raceList");
    this.racesState
      .subscribe(
        (racesState: fromPonyRacer.State) => {
          this.raceLength = racesState.races.length;
          this.poniesAreAboutToFinish = racesState.poniesAreAboutToFinish;
        }
      )
  }

  addPony() {
    this.addPonyForm = true;
  }
  validateName(value: string) {
     this.racesState.pipe(
     tap(races => this.isNameValid = races.races.some(val => {
          return val.name === value
      })
     )
    ).subscribe();
  }
  onSubmit(f: NgForm) {
    this.store.dispatch(new PonyRacerActions.AddPony(f.value.name))
    this.addPonyForm = false;
  }

  startRace() {
    this.store.dispatch(new PonyRacerActions.IsNewrace(true))
    this.raceRuns = true;
    this.store.dispatch(new PonyRacerActions.StartRace())
  }

  toStart() {
    this.raceRuns = false;
    this.store.dispatch(new PonyRacerActions.IsNewrace(false))
  }

  cancel() {
    this.addPonyForm = false;
  }
}
