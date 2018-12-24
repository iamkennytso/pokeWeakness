import React from 'react';
import './SelectedPokemon.scss';

const SelectedPokemon = ({ selectedPokemon }) => {
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
        alt={`${selectedPokemon}`}
      />
    </div>
  );
};

export default SelectedPokemon;
