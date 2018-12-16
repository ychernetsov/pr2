import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RaceModel } from '../race.model';
import { RaceService } from '../race.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pr-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {
  @ViewChild("finishEl") finishEl: ElementRef;
  @Input() race: RaceModel;
  @Input() index: number;
  @Input() randomColor: string;
  races: RaceModel[];
  offset: string = "0px";
  raceStarted: boolean = false;
  borderRace: string;

  private subscription: Subscription;
  constructor(private raceService: RaceService) { }
  
  ngOnInit() {
    let colors = this.randomColor.split("");
    console.log()
    colors[colors.length - this.index] = this.index;
    //this.borderRace = `10px solid ${colors.join("")}`
    console.log(this.borderRace)
  }

  removeRace(index: number) {
    this.raceService.deleteRace(index)
    console.log(this.raceService.getReces())
  }
}
