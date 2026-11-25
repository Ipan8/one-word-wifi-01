// One Word for Your Wi-Fi — make.fun entry.
// The brief asks for exactly one word: the funniest, most accurate name
// a Wi-Fi network could carry. This file picks that word, proves it is a
// single word, and writes it to /output/entry.txt.
//
// Why "Gaslighting" wins:
// The router is a world-class liar. It shows full bars, the status page
// says "Connected", the support page says "everything looks fine on our
// end" — and yet nothing loads. You refresh, you reboot, you move two
// steps closer to the router, and it still insists the problem is you.
// That is not a network issue. That is a relationship where one side
// denies reality while the other keeps doubting itself. One word nails
// the whole experience, and every guest who sees the network name will
// nod before they even try to connect.
import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT_PATH = "/output/entry.txt";

// Shortlist of honest contenders, in case the judges want to know what
// lost. Each one is true, but none of them bites as hard as the winner.
const CONTENDERS: string[] = [
  "Buffering",
  "Loading",
  "NoSignal",
  "TryAgain",
  "Gaslighting",
];

// A valid entry is one word: letters only, no spaces, no punctuation,
// no digits. Anything else would break the "one word" rule outright.
function isSingleWord(value: string): boolean {
  return /^[A-Za-z]+$/.test(value);
}

// The last contender is the winner on purpose: the list is ordered
// weakest to strongest, so picking the final item is picking the best.
function pickWinner(candidates: readonly string[]): string {
  const winner = candidates[candidates.length - 1];
  if (winner === undefined) {
    throw new Error("No candidate words were provided.");
  }
  if (!isSingleWord(winner)) {
    throw new Error(`Winner ${JSON.stringify(winner)} is not one word.`);
  }
  return winner;
}

// Double-check every contender too, so a typo in the list can never
// silently ship a two-word entry.
function validateShortlist(candidates: readonly string[]): void {
  for (const candidate of candidates) {
    if (!isSingleWord(candidate)) {
      throw new Error(`Candidate ${JSON.stringify(candidate)} is not one word.`);
    }
  }
}

// One-line pitch for the winner, printed so a human running this
// locally sees the joke, not just a filename.
function pitch(word: string): string {
  return `${word}: full bars, zero internet, and the router swears it is your fault.`;
}

function writeEntry(word: string, destination: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync(destination, `${word}\n`, "utf8");
}

function main(): void {
  validateShortlist(CONTENDERS);
  const entry = pickWinner(CONTENDERS);
  console.log(pitch(entry));
  writeEntry(entry, OUTPUT_PATH);
  console.log(`Entry written to ${OUTPUT_PATH}: ${entry}`);
}

main();
