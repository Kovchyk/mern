import React from 'react';
import { useCalendarContext } from '../useCalendarContext';

const Prev = () => {
  const { handlePreviousMonthClick } = useCalendarContext();

  return <button onClick={handlePreviousMonthClick}>Prev</button>;
};

export { Prev };
