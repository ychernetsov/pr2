import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RaceService } from '../race.service';
import { Subscription } from 'rxjs';
import { RaceModel } from '../race.model';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  addPonyForm = false;
  races: RaceModel[] = [];
  
  private subscription: Subscription
  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.races = this.raceService.getReces();
    this.subscription = this.raceService.racesChanged
      .subscribe(
        ((races: RaceModel[]) => {
          this.races = races;
        })
    )
  }
  addPony() {
    this.addPonyForm = true;
  }
  onSubmit(f: NgForm) {
    this.raceService.addRace(f.value.name)
    this.addPonyForm = false;
  }

  startRace() {
    let initialState = 0;
    const interval = setInterval(()=> {
      //this.races = this.raceService.getReces();
      for(let i = 0; i < this.races.length; i++) {
        
        const name = this.races[i].name;
        const scores = this.races[i].scores;
        const src = this.races[i].src;
        const incr = initialState += Math.floor(Math.random() * 30)
        const offset = incr + 'px';
        const updatedRace = new RaceModel(name, scores, src, offset)
        this.raceService.updateRace(i, updatedRace)

        if(incr >= 1000) {
          clearInterval(interval)
          console.log(`Pony ${name} wins`)
          const newScore = scores + 1;
          const updatedScoreRace = new RaceModel(name, newScore, src, offset)
          this.raceService.updateRace(i, updatedScoreRace)
          break;
        }
      }
    }, 150);
  }
}
