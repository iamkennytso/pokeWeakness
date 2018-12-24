import React, { Component } from 'react';
import './App.css';

import SearchBar from './components/SearchBar/SearchBar'
import SelectedPokemon from './components/SelectedPokemon/SelectedPokemon'
import History from './components/History/History'

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
    let history = localStorage.getItem('history') 
      ? localStorage.getItem('history').split(',') 
      : [];
    if (history.length < 10) {
      history.push(selectedPokemon.value);
    } else {
      history.pop();
      history.push(selectedPokemon.value);
    }
    localStorage.setItem('history', history);
  }

  render() {
    const { selectedPokemon } = this.state;

    return (
      <div className="App">
        <SearchBar 
          selectedPokemon={selectedPokemon}
          handleChange={this._handleSelectedChange}
        />
        <SelectedPokemon 
          selectedPokemon={selectedPokemon}
        />
        <History 
          history={localStorage.getItem('history')}
        />
      </div>
    );
  }
}

export default App;
