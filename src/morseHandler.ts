import { idToDots, getLetter } from "@/morseDict";
import Stopwatch from "@/stopwatch";
export default class MorseHandler {
  private _watch: Stopwatch;
  private _beeps: number;
  private static readonly unit_time_ms = 60;
  private static readonly dash_factor = 2.5;
  private static readonly break_factor = 3;
  private static readonly space_factor = 7;

  static readonly breakLength =
    MorseHandler.unit_time_ms * MorseHandler.break_factor;
  static readonly spaceLength =
    MorseHandler.unit_time_ms * MorseHandler.space_factor;

  constructor() {
    this._watch = new Stopwatch();
    this._beeps = 1;
  }
  buttonDown() {
    this._watch.reset();
  }
  buttonUp() {
    const downTime = this._watch.time();
    this._beeps <<= 1;
    this._beeps += MorseHandler.isShortBeep(downTime) ? 0 : 1;
  }
  private static isShortBeep(length: number): boolean {
    return length < MorseHandler.unit_time_ms * MorseHandler.dash_factor;
  }
  get currentDots(): string {
    return idToDots(this._beeps);
  }
  get empty(): boolean {
    return this._beeps === 1;
  }
  terminateLetter(): string {
    const dots = idToDots(this._beeps);
    this._beeps = 1;
    return getLetter(dots);
  }
}
