import React from 'react';
import { useCalendarContext } from '../useCalendarContext';

const DateString = () => {
  const { getMonth, getYear, monthNames } = useCalendarContext();

  return <div>{`${monthNames[getMonth()]} ${getYear()}`}</div>;
};

export { DateString };
