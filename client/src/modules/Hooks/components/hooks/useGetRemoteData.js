import { useState, useEffect } from 'react';
import useFetchData from './useFetchData';

const useGetRemoteData = () => {
  const { data } = useFetchData();
  const [characterMovieList, setCharacterMovieList] = useState([]);

  useEffect(() => {
    const list = data.peopleList.map(character => {
      return {
        character: { name: character.name, url: character.url },
        films: character.films
          .map(filmUrl => {
            return data.filmsList.find(film => filmUrl === film.url);
          })
          .map(film => ({ title: film.title, url: film.url })),
      };
    });

    setCharacterMovieList(list);
  }, [data]);

  return { characterMovieList };
};

export default useGetRemoteData;
