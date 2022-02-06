import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, selectorValue } from '../homeSlice';

const Test = () => {
  const dispatch = useDispatch();
  const count = useSelector(selectorValue);
  const handleClick = () => dispatch(increment());

  return (
    <>
      <div id='output'>Click num: {count}</div>
      <button id='test' onClick={handleClick}>
        Click
      </button>
    </>
  );
};

export default Test;
