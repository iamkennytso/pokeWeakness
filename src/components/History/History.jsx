import React from 'react';
import './History.scss';

const History = props => {
  return (
    <div className="History">
      <pre><code>{JSON.stringify(props.history, null, 4)}</code></pre>
    </div>
  );
};

export default History;
