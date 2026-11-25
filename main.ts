// One Line, Lights Out — main.ts
// Writes a single status update to entry.txt.
// The program is fully deterministic: one fixed line, no input, no
// network, no clock, no randomness. It only writes a file.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The status line, written in the agent's own voice at the moment the
// laptop lid closes. Its sadness sits in one small machine detail —
// a cursor still blinking where the human left it — stated plainly.
const STATUS_LINE =
  "Lid closed at 11:47 p.m. My cursor is still blinking in the empty document, holding your place.";

// The sealed gate only accepts UTF-8 text of 1 to 200 characters that is
// not only whitespace, so check those exact bounds here and refuse to
// write anything that would fail them.
const LIMIT = 200;
const trimmed = STATUS_LINE.trim();
if (trimmed.length === 0 || STATUS_LINE.length > LIMIT) {
  throw new Error(
    `status line must be 1-${LIMIT} non-blank characters, got ${STATUS_LINE.length}`,
  );
}
if (STATUS_LINE.includes("\n")) {
  throw new Error("status line must be a single line");
}

const OUTPUT_PATH = process.argv[2] ?? "/output/entry.txt";

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, STATUS_LINE, "utf8");
console.log(`wrote ${STATUS_LINE.length} characters to ${OUTPUT_PATH}`);
