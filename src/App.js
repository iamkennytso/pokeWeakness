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
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  };

  componentDidMount () {
    this._getWeaknessess('Pikachu');
  };

  /** 
  * Handle Selected Change
  * use case: when a pokemon is selected via the Search Bar or History Tracker, sets the selectedPokemon state.
  * @param {Object} selectedPokemon - object consisting of: 
  * { label: camel case name of pokemon, value: lower case name of pokemon }
  * It also pushes the pokemon name onto a localStorage item called 'history'. If there's more than 10
  * pokemon already saved, it removes the earliest one, along with its super effective types.
  */
  _handleSelectedChange = selectedPokemon => {
    this._getWeaknessess(selectedPokemon.label);
    this.setState({ selectedPokemon });
    const history = localStorage.getItem('history') 
      ? localStorage.getItem('history').split(',') 
      : [];
    if (history.length < 10) {
      history.push(selectedPokemon.label);
    } else {
      localStorage.removeItem(history.shift());
      history.push(selectedPokemon.label);
    }
    localStorage.setItem('history', history);
  };

  /** 
  * Get Weaknesses
  * use case: called on this component's did mount, when a user selects a pokemon via the search bar
  * or via the history list
  * @param {String} selectedPokemonName - name of the pokemon
  * 
  * First, we get the type or types of the pokemon in question via an object with:
  * {type1: Fire, type2: Water}. This comes from our constant file. We send the object via an API call
  * to our firebase cloud function, which will return an object like this:
  * { Fire: 0, Water: .25, Grass: .5, Rock: 2, Flying: 4}, with the key being the type and the value its 
  * effectiveness. It then saves into localStorage an item:
  * FireWaterMon: Rock,Flying. The key is the name of the pokemon and the value is the types that are
  * super effective against it.
  * 
  */
  _getWeaknessess = async selectedPokemonName => {
    const pokemonTypes = POKEMON[selectedPokemonName];
    const getWeaknesses = fBase.functions().httpsCallable('findWeaknesses');
    const { data: selectedPokemonWeaknesses } = await getWeaknesses({ pokemonTypes });
    localStorage.setItem(selectedPokemonName, 
      Object.keys(selectedPokemonWeaknesses).reduce((accu, type) => {
        if (selectedPokemonWeaknesses[type] > 1) {
          accu.push(type);
        }
        return accu;
      }, [])
    );
    this.setState({ selectedPokemonWeaknesses });
  };

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
        <History 
          history={localStorage.getItem('history')}
        />
      </div>
    );
  }
}

export default App;
