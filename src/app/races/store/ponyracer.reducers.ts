import { RaceModel } from 'src/app/race.model';
import * as PonyRacerActions from './ponyracer.actions';
export interface State {
    src: string;
    races: RaceModel[];
    raceStatus: boolean;
    raceCount: number;
    isNewrace: boolean;
    poniesAreAboutToFinish: number;
    currentRaces: Array<any>;
  }
  
const initialState: State = {
    src: "https://www.clipartmax.com/png/small/1-13464_dtrace-pony-created-by-general-zois-pony-creator-dtrace-cute-pony-shot.png",
    races: [
        new RaceModel("Zheka", 0, "https://www.clipartmax.com/png/small/1-13464_dtrace-pony-created-by-general-zois-pony-creator-dtrace-cute-pony-shot.png"),
        new RaceModel("Pipa", 0, "https://www.clipartmax.com/png/small/1-13464_dtrace-pony-created-by-general-zois-pony-creator-dtrace-cute-pony-shot.png"),
        new RaceModel("Puppa", 0, "https://www.clipartmax.com/png/small/1-13464_dtrace-pony-created-by-general-zois-pony-creator-dtrace-cute-pony-shot.png")
      ],
    raceStatus: false,
    raceCount: 0,
    isNewrace: false,
    poniesAreAboutToFinish: null,
    currentRaces: []
}

export function ponyRacerReducer(state = initialState, action: PonyRacerActions.PonyRacerActions) {
    let newRaces;
    switch(action.type) {
        case PonyRacerActions.ADD_PONY:
            const newPony = new RaceModel(action.payload, 0, state.src);
            return {
                ...state,
                races: [...state.races, newPony]
            }
        case PonyRacerActions.DELETE_PONY:
            state.races.splice(action.payload, 1);
            newRaces = state.races.slice()
            return {
                ...state,
                races: state.races,
                currentRaces: []
            }
        case PonyRacerActions.UPDATE_RACESCORE:
            const name = action.payload.name;
            const scores = action.payload.newScore;
            newRaces = state.races.slice()
            for(let race of newRaces) {
                if(race.name === name) {
                    race.scores = scores; 
                }
            }
            return {
                ...state,
                races: newRaces
            }
        case PonyRacerActions.RESET_SCORES:
            newRaces = state.races.slice();
            for(let race of newRaces) {
                race.scores = 0;
            }
            state.raceCount = 0;
            return {
                ...state,
                races: newRaces
            }
        case PonyRacerActions.START_RACE:
            let raceStatus;
            raceStatus = true;
            const raceCount = state.raceCount + 1;
            return {
                ...state,
                raceStatus: raceStatus,
                raceCount: raceCount,
                races: state.races,
                poniesAreAboutToFinish: state.races.length
            }
        case PonyRacerActions.STOP_RACE:
            raceStatus = false;
            const allPonies = state.poniesAreAboutToFinish || state.races.length;
            const finsihed = state.currentRaces.slice()
            return {
                ...state,
                raceStatus: raceStatus,
                races: state.races,
                poniesAreAboutToFinish: allPonies - 1,
                currentRaces: [...finsihed,action.payload]
            }
        case PonyRacerActions.IS_NEWRACE:
            const isNewrace = action.payload;
            return {
                ...state,
                isNewrace: isNewrace,
                races: state.races,
                poniesAreAboutToFinish: null,
                currentRaces: []
            }
        default:
            return state;
    }
}

