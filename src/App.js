import React, { Component } from 'react';
import './App.css';

import SearchBar from './components/SearchBar/SearchBar'

const INITIAL_STATE = {
  selectedPokemon: {
    label: 'Pikachu',
    value: 'pikachu'
  },
  history: [],
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  };

  /** 
  * Handle Selected Change
  * use case: when a pokemon is selected via the Search Bar or History Tracker, sets the selectedPokemon state.
  * @param {Object} selectedPokemon - object consisting of: {
  *   label: camel case name of pokemon
  *   value: lower case name of pokemon
  * }
  */
  _handleSelectedChange = selectedPokemon => {
    this.setState({selectedPokemon});
  }

  render() {
    const { selectedPokemon } = this.state;
    const imgUrl = selectedPokemon.value
      // for the Alolans 
      .replace(/\s\(alo\)/, '-alolan')
      // for Mr. Mime
      .replace(/.\s/, '-')
      // for Farfetch'd
      .replace(/'/, '');
    return (
      <div className="App">
        <SearchBar 
          selectedPokemon={selectedPokemon}
          handleChange={this._handleSelectedChange}
        />
        <img 
          src={`https://img.pokemondb.net/artwork/large/${imgUrl}.jpg`} 
          alt={`${selectedPokemon}`}
        />
      </div>
    );
  }
}

export default App;
