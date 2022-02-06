import React from 'react';

const Table = ({ items }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Character</th>
          <th>Movies</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.character.url}>
            <td>{item.character.name}</td>
            <td>
              <table>
                <tbody>
                  {item.films.map(film => (
                    <tr key={film.url}>
                      <td>{film.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
