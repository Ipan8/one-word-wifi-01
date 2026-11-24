import * as fs from "node:fs";

// One Word for Your Wi-Fi — make.fun bounty entry.
// The entry is exactly one word: the funniest AND most accurate word
// for a Wi-Fi network. The winning word becomes the sponsor's network name.
// Why this word: the router shows full bars and insists everything is fine,
// while the connection itself delivers nothing — classic gaslighting.
const ENTRY = "Gaslighting";

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", ENTRY + "\n");
console.log("Wrote entry:", ENTRY);
