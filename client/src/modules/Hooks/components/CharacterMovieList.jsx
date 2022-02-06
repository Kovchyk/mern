import React from 'react';
import useGetRemoteData from './hooks/useGetRemoteData';

const CharacterMovieList = props => {
  const { characterMovieList } = useGetRemoteData();

  return (
    <div>
      {props.children({
        items: characterMovieList,
      })}
    </div>
  );
};

export default CharacterMovieList;
