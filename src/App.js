import React, { Component } from 'react';
import fBase from './constants/firebase'
import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import SelectedPokemon from './components/SelectedPokemon/SelectedPokemon';
import History from './components/History/History';
import POKEMON from './constants/pokemon';

const INITIAL_STATE = {
  selectedPokemon: {
    label: 'Pikachu',
    value: 'pikachu',
  },
  selectedPokemonWeaknesses: {},
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
  componentDidMount () {
    this._getWeaknessess('Pikachu');
  }

  _handleSelectedChange = selectedPokemon => {
    this._getWeaknessess(selectedPokemon.label)
    this.setState({selectedPokemon});
    let history = localStorage.getItem('history') 
      ? localStorage.getItem('history').split(',') 
      : [];
    if (history.length < 10) {
      history.push(selectedPokemon.value);
    } else {
      localStorage.removeItem(history.pop());
      history.push(selectedPokemon.value);
    }
    localStorage.setItem('history', history);
  }

  _getWeaknessess = async selectedPokemonName => {
    let getWeaknesses = fBase.functions().httpsCallable('findWeaknesses');
    const pokemon = POKEMON[selectedPokemonName];
    const selectedPokemonWeaknesses = await getWeaknesses({ pokemon });
    localStorage.setItem(selectedPokemonName, 
      Object.keys(selectedPokemonWeaknesses).reduce((accu, type) => {
        if (selectedPokemonWeaknesses[type] > 1) {
          accu.push(type);
        }
        return accu
      }, [])
    );
    this.setState({ selectedPokemonWeaknesses: selectedPokemonWeaknesses.data });
  }

  render() {
    const { selectedPokemon, selectedPokemonWeaknesses } = this.state;

    return (
      <div className="App">
        <SearchBar 
          selectedPokemon={selectedPokemon}
          handleChange={this._handleSelectedChange}
        />
        <SelectedPokemon
          selectedPokemon={selectedPokemon}
          selectedPokemonWeaknesses={selectedPokemonWeaknesses}
        />
        {/* <History 
          history={localStorage.getItem('history')}
        /> */}
      </div>
    );
  }
}

export default App;
