import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { RaceModel } from '../../race.model';
import { RaceService } from '../../race.service';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pr-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit, OnChanges {
  @ViewChild("raceFinish") raceFinishEl: ElementRef;
  finishElOffset: number;
  @Input() race: RaceModel;
  @Input() index: number;
  @Input() event: any;
  @Input() poniesAreAboutToFinish: BehaviorSubject<number>
  @Input() startPos: any;
  @Input() raceLength: number;
  run: string = "0px";
  initialState: number = 0;
  interval;
  randomColor: string;

  //private subscription: Subscription;
  constructor(private raceService: RaceService) {}
  private randomColorBorder() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return `10px solid ${color}`;
  }
  ngOnInit() {
    this.randomColor = this.randomColorBorder();
    this.finishElOffset = this.raceFinishEl.nativeElement.offsetWidth - this.raceFinishEl.nativeElement.childNodes[0].clientWidth;
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if(changes.event && changes.event.currentValue) this.movePony();
    if(changes.startPos && changes.startPos.currentValue) {
      this.run = "0px";
    }
  }

  trackFinishedPonies() {
    const newValue = this.poniesAreAboutToFinish.value - 1;
    this.poniesAreAboutToFinish.next(newValue)
  }
  movePony() {
    this.interval = setInterval(()=> {
    const incr = this.initialState += Math.floor(Math.random() * 30)
    this.run = `${incr}px`;
    if(incr >= this.finishElOffset) {
      this.trackFinishedPonies();
      //const raceLength = this.raceService.getReces().length;
      console.log("length ", this.raceLength)
      const place = this.poniesAreAboutToFinish.value;
      console.log(`${this.raceLength - place} place - ${this.race.name}`)
        clearInterval(this.interval);
        this.initialState = 0;
      }
    }, 50);
  }
  removeRace(index: number) {
    this.raceService.deleteRace(index);
    this.raceLength = this.raceLength - 1;
    this.poniesAreAboutToFinish.next(this.raceLength);
  }
}
