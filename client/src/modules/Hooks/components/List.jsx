import React from 'react';

const List = ({ items }) => {
  return (
    <ul>
      {items.map(item => {
        return (
          <li key={item.character.url}>
            {item.character.name}
            <ul>
              {item.films.map(film => (
                <li key={film.url}>{film.title}</li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
