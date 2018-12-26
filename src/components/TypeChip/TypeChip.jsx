import React from 'react';
import './TypeChip.scss';

const multiplierToString = {
  .25: 'Quarter',
  .5: 'Half',
  0: 'NoEffect',
  2: 'Double',
  4: 'Quadruple',
}

const TypeChip = ({ type, effectiveness }) => {
  return (
    <div className={`Weaknesses-Chip Weakness-Chip-${multiplierToString[effectiveness]}`}>
      {type}: {effectiveness}
    </div>
  );
};

export default TypeChip;
