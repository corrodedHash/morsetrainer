import { getDots } from "@/morseDict";
var audioCtx = new window.AudioContext();
var audioGain = audioCtx.createGain();
audioGain.connect(audioCtx.destination);
audioGain.gain.value = 0.05;

enum PauseState {
  Start,
  Tone,
  Letter,
  Word,
}

function pauseTimeFactor(state: PauseState): number {
  let pause_time_factor;
  switch (state) {
    case PauseState.Start:
      pause_time_factor = 0;
      break;
    case PauseState.Tone:
      pause_time_factor = 1;
      break;
    case PauseState.Letter:
      pause_time_factor = 3;
      break;
    case PauseState.Word:
      pause_time_factor = 7;
      break;
  }
  return pause_time_factor;
}

export class Beeper {
  private _frequency: number;
  unit_length_ms: number;
  private _notes: boolean[][][];
  private _terminate: boolean = false;
  private _oscillator = undefined as undefined | OscillatorNode;
  constructor(notes: boolean[][][], frequency: number, unit_length_ms: number) {
    this._notes = notes;
    this._frequency = frequency;
    this.unit_length_ms = unit_length_ms;
  }
  get frequency() {
    return this._frequency;
  }
  set frequency(new_freq) {
    this._frequency = new_freq;
    if (this._oscillator !== undefined) {
      this._oscillator.frequency.value = this._frequency;
    }
  }
  cancel() {
    this._terminate = true;
    if (this._oscillator !== undefined) {
      this._oscillator.disconnect();
    }
  }
  playNote(pause: PauseState = PauseState.Start) {
    if (this._terminate === true) {
      return;
    }
    if (this._notes.length === 0) {
      return;
    }
    if (this._notes[0].length === 0) {
      this._notes.shift();
      this.playNote(PauseState.Word);
      return;
    }
    if (this._notes[0][0].length === 0) {
      this._notes[0].shift();
      this.playNote(PauseState.Letter);
      return;
    }
    const my_note = this._notes[0][0][0];
    const my_duration = this.unit_length_ms * (my_note ? 3 : 1);
    this._notes[0][0].shift();
    this._oscillator = audioCtx.createOscillator();
    this._oscillator.type = "square";
    this._oscillator.frequency.value = this.frequency;
    this._oscillator.connect(audioGain);
    this._oscillator.onended = () => {
      this.playNote(PauseState.Tone);
    };
    const pause_time = pauseTimeFactor(pause) * this.unit_length_ms;
    this._oscillator.start(audioCtx.currentTime + pause_time);
    this._oscillator.stop(audioCtx.currentTime + my_duration + pause_time);
  }
}

export default function playWords(
  text: string,
  frequency: number,
  unit_length_ms: number
): Beeper {
  let result = [];
  let word_result: boolean[][] = [];
  for (const character of text) {
    if (character === " ") {
      result.push(word_result);
      continue;
    }
    const dots = getDots(character);
    let letter_result = [];
    for (const dot of dots) {
      letter_result.push(dot === "-");
    }
    word_result.push(letter_result);
  }
  result.push(word_result);
  let beeper = new Beeper(result, frequency, unit_length_ms);
  beeper.playNote();
  return beeper;
}
