import React from 'react';
import './TypeChip.scss';
import Bug from './Bug.png';
import Dark from './Dark.png';
import Dragon from './Dragon.png';
import Electric from './Electric.png';
import Fairy from './Fairy.png';
import Fighting from './Fighting.png';
import Fire from './Fire.png';
import Flying from './Flying.png'
import Ghost from './Ghost.png';
import Grass from './Grass.png';
import Ground from './Ground.png';
import Ice from './Ice.png';
import Normal from './Normal.png';
import Poison from './Poison.png';
import Psychic from './Psychic.png';
import Rock from './Rock.png';
import Steel from './Steel.png';
import Water from './Water.png';

const multiplierToString = {
  .25: 'Quarter',
  .5: 'Half',
  0: 'NoEffect',
  2: 'Double',
  4: 'Quadruple',
}

const getPicture = type => {
  switch(type){
    case 'Bug':
      return Bug;
    case 'Dark':
      return Dark;
    case 'Dragon':
      return Dragon;
    case 'Electric':
      return Electric;
    case 'Fairy':
      return Fairy;
    case 'Fighting':
      return Fighting;
    case 'Fire':
      return Fire;
    case 'Flying':
      return Flying;
    case 'Ghost':
      return Ghost;
    case 'Grass':
      return Grass;
    case 'Ground':
      return Ground;
    case 'Ice':
      return Ice;
    case 'Normal':
      return Normal;
    case 'Poison':
      return Poison;
    case 'Psychic':
      return Psychic;
    case 'Rock':
      return Rock;
    case 'Steel':
      return Steel;
    case 'Water':
      return Water;
  }
};

const TypeChip = ({ type, effectiveness }) => {
  return (
    <div className={`Weakness-Chip-${multiplierToString[effectiveness]}`}>
      <img
        className={`Weakness-Chip-${multiplierToString[effectiveness]}-Img`}
        src={getPicture(type)}
        alt={`${type}`}
      />
      {effectiveness}
    </div>
  );
};

export default TypeChip;
