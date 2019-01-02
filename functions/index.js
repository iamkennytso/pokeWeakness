const functions = require('firebase-functions');

exports.findWeaknesses = functions.https.onCall(data => {
  const types = data.pokemonTypes;
  if (!types.type2) {
    return weaknesses[types.type1];
  } else {
    // spread operator doesn't work currently with firebase cloud functions
    const hybrid = Object.assign({}, weaknesses[types.type1]);
    const secondTypeWeaknesses = weaknesses[types.type2];
    for (let weakType in secondTypeWeaknesses) {
      if (hybrid[weakType]) {
        hybrid[weakType] = hybrid[weakType] * secondTypeWeaknesses[weakType];
      } else {
        hybrid[weakType] = secondTypeWeaknesses[weakType];
      }
    }
    return hybrid;
  }
});

const weaknesses = {
  Normal: {
    Fighting: 2,
    Ghost: 0,
  },
  Fighting: {
    Flying: 2,
    Rock: .5,
    Bug: .5,
    Psychic: 2,
    Dark: .5,
    Fairy: 2,
  },
  Flying: {
    Fighting: .5,
    Ground: 0,
    Rock: 2,
    Bug: .5,
    Grass: .5,
    Electric: 2,
    Ice: 2,
  },
  Poison: {
    Fighting: .5,
    Poison: .5,
    Ground: 2,
    Bug: .5,
    Grass: .5,
    Psychic: 2,
    Fairy: .5,
  },
  Ground: {
    Poison: .5,
    Rock: .5,
    Water: 2,
    Grass: 2,
    Electric: 0,
    Ice: 2,
  },
  Rock: {
    Normal: .5,
    Fighting: 2,
    Flying: .5,
    Poison: .5,
    Ground: 2,
    Steel: 2,
    Fire: .5,
    Water: 2,
    Grass: 2,
  },
  Bug: {
    Fighting: .5,
    Flying: 2,
    Ground: .5,
    Rock: 2,
    Fire: 2,
    Grass: .5,
  },
  Ghost: {
    Normal: 0,
    Fighting: 0,
    Poison: .5,
    Bug: .5,
    Ghost: 2,
    Dark: 2,
  },
  Steel: {
    Normal: .5,
    Fighting: 2,
    Flying: .5,
    Poison: 0,
    Ground: 2,
    Rock: .5,
    Bug: .5,
    Steel: .5,
    Fire: 2,
    Grass: .5,
    Psychic: .5,
    Ice: .5,
    Dragon: .5,
    Fairy: .5,
  },
  Fire: {
    Ground: 2,
    Rock: 2,
    Bug: .5,
    Steel: .5,
    Fire: .5,
    Water: 2,
    Grass: .5,
    Ice: .5,
    Fairy: .5,
  },
  Water: {
    Steel: .5,
    Fire: .5,
    Water: .5,
    Grass: 2,
    Electric: 2,
    Ice: .5,
  },
  Grass: {
    Flying: 2,
    Poison: 2,
    Ground: .5,
    Bug: 2,
    Fire: 2,
    Water: .5,
    Grass: .5,
    Electric: .5,
    Ice: 2,
  },
  Electric: {
    Flying: .5,
    Ground: 2,
    Steel: .5,
    Electric: .5,
  },
  Psychic: {
    Fighting: .5,
    Bug: 2,
    Ghost: 2,
    Psychic: .5,
    Dark: 2,
  },
  Ice: {
    Fighting: 2,
    Rock: 2,
    Steel: 2,
    Fire: 2,
    Ice: .5,
  },
  Dragon: {
    Fire: .5,
    Water: .5,
    Grass: .5,
    Electric: .5,
    Ice: 2,
    Dragon: 2,
    Fairy: 2,
  },
  Dark: {
    Fighting: 2,
    Bug: 2,
    Ghost: .5,
    Psychic: 0,
    Dark: .5,
    Fairy: 2,
  },
  Fairy: {
    Fighting: .5,
    Poison: 2,
    Bug: .5,
    Steel: 2,
    Dragon: 0,
    Dark: .5,
  },
}
