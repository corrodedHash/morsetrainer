export const dotMap: Record<string, string> = {
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  ".-": "a",
  "-...": "b",
  "-.-.": "c",
  "-..": "d",
  ".": "e",
  "..-.": "f",
  "--.": "g",
  "....": "h",
  "..": "i",
  ".---": "j",
  "-.-": "k",
  ".-..": "l",
  "--": "m",
  "-.": "n",
  "---": "o",
  ".--.": "p",
  "--.-": "q",
  ".-.": "r",
  "...": "s",
  "-": "t",
  "..-": "u",
  "...-": "v",
  ".--": "w",
  "-..-": "x",
  "-.--": "y",
  "--..": "z",
  "-·-.--": "!",
  ".-.-.-": ".",
  "--..--": ",",
};
let tmpLetterMap: Record<string, string> = {};
Object.entries(dotMap).forEach(([key, value]) => {
  tmpLetterMap[value] = key;
});
export const letterMap = tmpLetterMap;

export function dotsToId(dots: string): number {
  let result = 1;
  for (const dot of dots) {
    result *= 2;
    result += dot === "." ? 0 : 1;
  }
  return result;
}

export function idToDots(id: number): string {
  let result = "";
  for (; id > 1; id >>= 1) {
    result += id % 2 == 0 ? "." : "-";
  }
  return result
    .split("")
    .reverse()
    .join("");
}

export function getLetter(dots: string): string {
  return dotMap[dots] || "?";
}

export function getDots(letter: string): string {
  const result = letterMap[letter.toLowerCase()];
  if (result === undefined) {
    throw Error("Unknown character");
  }
  return result;
}
