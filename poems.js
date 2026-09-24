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
      - lines:   each line in quotes, comma-separated.
                 use "" for a blank line (stanza break)
   4. Save and commit. Done.
   ========================================================= */

const poems = [
  {
    id: "grandmas-kitchen",
    title: "Grandma's Kitchen",
    date: "2026",
    tags: ["family", "home", "ghana", "legacy"],
    cover: "grandmas-kitchen.PNG",
    lines: [
      "In the heart of Accra, where the sun kisses the rusted rooftops and the air hums with the rhythm of palm fronds, there lies a kitchen, a sanctuary of love and sustenance. It belongs to Grandma Akua, the matriarch of our family, her laughter etched into the wooden beams, her wisdom simmering in the bubbling pots.",
      "",
      "I. Sunrise Aromas",
      "",
      "At dawn, when the roosters stretch their wings and the sky blushes with saffron hues, Grandma's kitchen awakens. The door creaks open, revealing a world of fragrant secrets. The walls wear coats of ochre, stained by years of spices, turmeric, ginger, and the elusive grains of paradise. The air dances with the promise of breakfast: banku and okro soup, a symphony of flavors.",
      "",
      "II. The Cauldron's Song",
      "",
      "Grandma's cauldron, an ancient iron vessel, sits atop the charcoal stove. She stokes the flames, her hands weathered but nimble. Into the pot, she pours her love: chunks of tilapia, yam, and plantains. The water sings as it embraces the ingredients, and the aroma wraps around us like a warm embrace. We gather, hungry souls drawn by the magic of simmering memories.",
      "",
      "III. Palm Wine Whispers",
      "",
      "On special occasions, Grandma fetches a calabash of palm wine. Its amber hue reflects stories of ancestors who tapped the sap from towering palms. We sip, and the liquid sings of sun soaked afternoons and whispered dreams. Grandma's eyes crinkle as she recounts tales of resilience, of how the palm tree bends but never breaks.",
      "",
      "IV. Jollof Alchemy",
      "",
      "Ah, the legendary jollof rice! Grandma's version is an alchemical wonder. She sautés onions until they weep sweetness, then adds tomatoes, red as the setting sun. The rice joins the party, absorbing the crimson elixir. She sprinkles in her secret blend of spices, cayenne, cloves, and a pinch of nostalgia. The pot lid clinks shut, and we wait, mouths watering.",
      "",
      "V. Garden of Greens",
      "",
      "Grandma tends a garden behind the kitchen. There, okra stretches toward the sky, and cassava leaves rustle secrets. She plucks kontomire leaves, their emerald veins pulsing with life. In her mortar, she grinds shito, a fiery blend of chilies, dried fish, and shrimp. The result: a sauce that ignites tongues and warms hearts.",
      "",
      "VI. Fufu's Dance",
      "",
      "When the sun dips low, signaling dinner, Grandma's fufu dance begins. She pounds yam and plantains into submission, her pestle striking the wooden mortar in rhythmic beats. The fufu emerges, a cloud of starchy delight. We dip it into groundnut soup, our fingers sticky with tradition. The kitchen walls absorb our laughter, becoming witnesses to our communion.",
      "",
      "VII. Moonlit Blessings",
      "",
      "As the moon rises, Grandma stirs her waakye pot. Rice and beans meld into a mosaic of sustenance. She adds sorghum leaves, gari, and a dash of nostalgia. We sit under the mango tree, plates balanced on our laps. The night cradles us, and Grandma's kitchen becomes a haven of belonging. We taste the love she pours into every grain, every leaf, every memory.",
      "",
      "And so, in Grandma's kitchen, time folds like a well worn recipe. We savor the flavors of Ghana, the tang of tamarind, the warmth of sobolo, the laughter that seasons every dish. For Grandma Akua, cooking is not mere sustenance; it's a symphony of love, a legacy passed down through generations. And when we close our eyes, we can still taste the sunsets she stirred into her pots, the sunsets that linger on our tongues."
    ]
  },
  {
    id: "garden",
    title: "GARDEN",
    date: "2026",
    tags: ["love", "loss"],
    cover: "garden.PNG",
    lines: [
      "How do you manage to move me from frying pan to fire every time you cross my mind.",
      "You left my calm soul looking for a bottle to drown itself in.",
      "But do I bother?",
      "Even drunker than a priest after Sunday confession, I still can't find my peace in the brighter day.",
      "",
      "I stood by you through rain, through sun, through the in-between days that don't have a name.",
      "I fought off everything that came for you.",
      "I watered your garden every single night, learned which flowers needed less, which ones needed more, and forgot to ask the same of mine.",
      "",
      "My own ground went quiet.",
      "I didn't hear it dying. I was too busy learning how to arrange someone else's bouquet.",
      "",
      "Now I stand outside a fence that used to be mine and watch another man walk through it like he built it.",
      "His hands don't know what my hands know.",
      "He's never smelled that particular soil after rain.",
      "But he says it anyway, easy, like breathing:",
      "\"This is my garden now.\"",
      "",
      "And I laugh.",
      "Because laughing is cheaper than the alternative.",
      "They mock me for leaving my own ground untended, for giving years away to something that was never going to give them back.",
      "",
      "But what is love without the madness of that.",
      "What is a man without a few decisions he can't explain without laughing at himself.",
      "",
      "So here I am,",
      "standing at a fence that isn't mine ,",
      "trying to find the words to say sorry",
      "to the only thing that never asked nothing of me but attention."
    ]
  }
];
