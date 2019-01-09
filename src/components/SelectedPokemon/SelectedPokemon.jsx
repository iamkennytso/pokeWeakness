import React from 'react';
import './SelectedPokemon.scss';

import TypeChip from '../TypeChip/TypeChip'

const SelectedPokemon = ({ selectedPokemon, selectedPokemonWeaknesses }) => {
  const imgUrl = selectedPokemon.value
    // for the Alolans
    .replace(/\s\(alo\)/, '-alolan')
    // for Mr. Mime
    .replace(/.\s/, '-')
    // for Farfetch'd
    .replace(/'/, '');

  return (
    <div className="SelectedPokemon">
      <img
        className="SelectedPokemon-Image"
        src={`https://img.pokemondb.net/artwork/large/${imgUrl}.jpg`} 
        alt={`${selectedPokemon.label}`}
      />
      <div className="SelectedPokemon-Weaknesses">
        {Object.keys(selectedPokemonWeaknesses).map(type => {
          return <TypeChip
            key={type}
            type={type}
            effectiveness={selectedPokemonWeaknesses[type]}
          />
        })}
      </div>
    </div>
  );
};

export default SelectedPokemon;
