export default class Stopwatch {
  private _timestamp: number;
  constructor() {
    this._timestamp = Date.now();
  }
  time() {
    return Date.now() - this._timestamp;
  }
  reset() {
    const x = this.time();
    this._timestamp = Date.now();
    return x;
  }
  get roundStart() {
    return this._timestamp;
  }
}
