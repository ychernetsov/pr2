import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { RaceModel } from '../../race.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as PonyRacerActions from '../store/ponyracer.actions';
import * as fromPonyRacer from '../store/ponyracer.reducers';
import { tap, take } from 'rxjs/operators'

@Component({
  selector: 'pr-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit, OnDestroy {
  @ViewChild("raceFinish") raceFinishEl: ElementRef;
  finishElOffset: number;
  @Input() race: RaceModel;
  @Input() index: number;
  raceLength: number;
  run: string = "0px";
  randomTop: string = "0px";
  interval;
  randomColor: string;
  poniesAreAboutToFinish: number;
  racesState: Observable<fromPonyRacer.State>;
  raceStarted: boolean;

  constructor(private store: Store<fromApp.AppState>) {

  }
  private randomColorBorder() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return `10px solid ${color}`;
  }

  private ordinalIndicator(place: number) {
    return place === 1 ? "st" : place === 2 ? "nd" : place === 3 ? "rd" : "th"
  }

  ngOnInit() {
    this.randomColor = this.randomColorBorder();
    this.finishElOffset = this.raceFinishEl.nativeElement.offsetWidth - this.raceFinishEl.nativeElement.childNodes[0].clientWidth;
    this.racesState = this.store.select("raceList");
    this.racesState.pipe(
      //take(1),
      tap(races => {
        this.raceLength = races.races.length;
        this.poniesAreAboutToFinish = races.poniesAreAboutToFinish;
        this.raceStarted = races.raceStatus;
        if(this.raceStarted) this.movePony();
        if(this.poniesAreAboutToFinish === null) this.run = "0px";
      })
    )
    .subscribe()
  }

  changeOrientation($event) {
    setTimeout(()=> {
      this.finishElOffset = this.raceFinishEl.nativeElement.offsetWidth - this.raceFinishEl.nativeElement.childNodes[0].clientWidth;
    }, 100);
  }

  movePony(incr = 0) {
    this.interval = setInterval(()=> {
      incr = incr + Math.floor(Math.random() * 30);
      this.run = `${incr}px`;
      const rTop = Math.floor(Math.random()*3) > 1 ? 2 : -2;
      this.randomTop = `${rTop}px`;
      if(incr >= this.finishElOffset) {
        clearInterval(this.interval); 
        this.run = this.finishElOffset + 'px'
        const place = (this.raceLength - this.poniesAreAboutToFinish) + 1;
        const points = place === 1 ? 3 : place === 2 ? 2 : place === 3 ? 1 : 0;
        console.log(`${this.race.name} finishes ${place}${this.ordinalIndicator(place)}  and gets ${points} point(s)`);
        incr = 0;
        const name = this.race.name;
        const newScore = this.race.scores + points;
        this.store.dispatch(new PonyRacerActions.StopRace({name: name, place, points})); //{"name":this.race.name, place, points}
        this.store.dispatch(new PonyRacerActions.UpdateRaceScore({name, newScore}));
      }
    }, 50);
  }

  removeRace(index: number) {
    this.store.dispatch(new PonyRacerActions.DeletePony(index));
  }

  ngOnDestroy() {
    //this.racesState.unsubscribe()
  }
}
