import React from 'react';
import { useCalendarContext } from '../useCalendarContext';

const Next = () => {
  const { handleNextMonthClick } = useCalendarContext();

  return <button onClick={handleNextMonthClick}>Next</button>;
};

export { Next };
