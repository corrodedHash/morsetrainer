import english_words from "@/assets/english_words.json";
export default function randomEnglishWord(): string {
  return english_words.data[
    Math.floor(Math.random() * english_words.data.length)
  ];
}
