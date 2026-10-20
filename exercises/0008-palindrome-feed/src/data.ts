// Not yours, and correct. 20,000 player submissions, generated the same way on every load.

export type Submission = { id: number; player: string; text: string };

const PHRASES = [
  "A man, a plan, a canal: Panama",
  "Was it a car or a cat I saw?",
  "No 'x' in Nixon",
  "Madam, I'm Adam",
  "Step on no pets",
  "Never odd or even",
  "Do geese see God?",
  "Taco_cat",
  "Eva, can I see bees in a cave?",
  "Mr. Owl ate my metal worm",
  "racecar",
  "Red rum, sir, is murder",
  "Race a car",
  "Was it a car or a cat you saw?",
  "A man, a plan, a canal: Panama!!",
  "Never odd or even, really",
  "12321",
  "0P",
];

const WORDS = [
  "level", "ocean", "quiet", "rotor", "silver", "planet", "noon", "garden", "bright",
  "civic", "window", "radar", "lantern", "kayak", "marble", "refer", "thunder", "stats",
  "pepper", "tenet", "shadow", "forest", "minim", "copper", "solos", "harbor", "wow",
];

const PLAYERS = ["ana", "bo", "chen", "dara", "eli", "fatima", "gus", "hana", "ivo", "jun"];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(2026);
const pick = <T,>(list: readonly T[]) => list[Math.floor(random() * list.length)];

function shout(text: string) {
  return random() < 0.3 ? text.toUpperCase() : text;
}

export const submissions: readonly Submission[] = Array.from({ length: 20_000 }, (_, i) => {
  const text =
    random() < 0.15
      ? shout(pick(PHRASES))
      : Array.from({ length: 1 + Math.floor(random() * 5) }, () => pick(WORDS)).join(" ");
  return { id: i + 1, player: pick(PLAYERS), text };
});
