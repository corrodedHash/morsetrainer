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

function playNote(
  frequency: number,
  notes: boolean[][][],
  unit_length_ms: number,
  pause: PauseState = PauseState.Start
) {
  if (notes.length === 0) {
    return;
  }
  if (notes[0].length === 0) {
    notes.shift();
    playNote(frequency, notes, unit_length_ms, PauseState.Word);
    return;
  }
  if (notes[0][0].length === 0) {
    notes[0].shift();
    playNote(frequency, notes, unit_length_ms, PauseState.Letter);
    return;
  }
  const my_note = notes[0][0][0];
  const my_duration = unit_length_ms * (my_note ? 3 : 1);
  notes[0][0].shift();
  let oscillator = audioCtx.createOscillator();
  oscillator.type = "square";
  oscillator.frequency.value = frequency;
  oscillator.connect(audioGain);
  oscillator.onended = () => {
    playNote(frequency, notes, unit_length_ms, PauseState.Tone);
  };
  const pause_time = pauseTimeFactor(pause) * unit_length_ms;
  oscillator.start(audioCtx.currentTime + pause_time);
  oscillator.stop(audioCtx.currentTime + my_duration + pause_time);
}

export default function playWords(
  text: string,
  frequency: number,
  unit_length_ms: number
) {
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
  playNote(frequency, result, unit_length_ms);
}
