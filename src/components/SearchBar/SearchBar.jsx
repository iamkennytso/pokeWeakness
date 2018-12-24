import React from 'react';
import Select from 'react-select';
import Pokemon from '../../constants/pokemon'
import './SearchBar.scss';

const options = Object.keys(Pokemon).map(poke => {
  return {
    value: poke.toLowerCase(),
    label: poke,
  }
})

const SearchBar = props => {
  return (
    <div className="SearchBar">
    <Select
      value={props.selectedPokemon}
      onChange={props.handleChange}
      options={options}
    />
  </div>
  );
};

export default SearchBar;
