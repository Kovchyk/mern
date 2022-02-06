import React, { useState } from 'react';
import CharacterMovieList from './components/CharacterMovieList';
import List from './components/List';
import Table from './components/Table';

const Hooks = () => {
  const [count, setCount] = useState(1);
  const [colored, setColor] = useState(false);

  const styles = {
    color: colored ? 'red' : 'black',
  };

  return (
    <>
      <div>Hooks example</div>
      <div style={styles}>Elements amount {count}</div>
      <button onClick={() => setCount(prev => prev + 1)}>Create new element</button>
      <button onClick={() => setColor(prev => !prev)}>Change color</button>
      <CharacterMovieList>
        {({ items }) => {
          return <List items={items} />;
        }}
      </CharacterMovieList>
      <CharacterMovieList>
        {({ items }) => {
          return <Table items={items} />;
        }}
      </CharacterMovieList>
    </>
  );
};

export default Hooks;
