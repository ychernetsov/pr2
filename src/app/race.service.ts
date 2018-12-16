import { Injectable } from '@angular/core';
import { RaceModel } from './race.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  racesChanged = new Subject<RaceModel[]>();
  src: string = "https://www.clipartmax.com/png/small/1-13464_dtrace-pony-created-by-general-zois-pony-creator-dtrace-cute-pony-shot.png";
  private races: RaceModel[] = [
    new RaceModel("Arthur", 0, this.src),
    new RaceModel("Pipa", 0, this.src),
    new RaceModel("Puppa", 0, this.src)
  ]
  constructor() { }

  getReces() {
    return this.races.slice();
  }

  deleteRace(index: number) {
    this.races.splice(index, 1);
    this.racesChanged.next(this.races.slice())
  }

  addRace(n: string) {
    const name = n;
    const scores = 0;
    const src = this.src;
    const newRace = new RaceModel(name, scores, this.src);
    this.races.push(newRace);
    this.racesChanged.next(this.races.slice())
  }
  updateRace(index: number, updatedRace: RaceModel) { 
    this.races[index] = updatedRace;
    this.racesChanged.next(this.races.slice())
  }
}
