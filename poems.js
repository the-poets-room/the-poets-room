/* =========================================================
   THE POET'S ROOM — POEMS
   ---------------------------------------------------------
   HOW TO ADD A NEW POEM:
   1. Copy one whole { ... } block below (from { to },)
   2. Paste it at the TOP of the poems array (newest first)
   3. Change the fields:
      - id:      short unique name, no spaces (used in the URL)
      - title:   the poem's title
      - date:    e.g. "March 2025"
      - tags:    list of themes, e.g. ["love", "loss"]
      - cover:   image URL OR leave "" for an auto-generated cover
      - lines:   the poem itself — each line in quotes, comma-separated
   4. Save and push to GitHub. Done.
   ========================================================= */

const poems = [
  {
    id: "the-morning-light",
    title: "The Morning Light",
    date: "March 2025",
    tags: ["hope", "morning"],
    cover: "",
    lines: [
      "The morning light creeps in so slow,",
      "a golden tide across the floor,",
      "and in its warmth I start to know",
      "what all my dreaming was here for."
    ]
  },
  {
    id: "quiet-streets",
    title: "Quiet Streets",
    date: "February 2025",
    tags: ["solitude", "city"],
    cover: "",
    lines: [
      "The streets at dusk forget their noise,",
      "and hold their breath a while,",
      "as if the world had lost its voice",
      "and found a softer smile."
    ]
  }
  // 👆 paste your next poem block right here (before this line)
];
