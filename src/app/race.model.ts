export class RaceModel {
    public name: string;
    public scores: number;
    public src: string;
    public offset: string;

    constructor(name: string, scores: number, src: string, offset: string) {
        this.name = name;
        this.scores = scores;
        this.src = src;
        this.offset = offset || "0px";
    }
}
