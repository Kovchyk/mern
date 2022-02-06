import React from 'react';
import { DateString } from './DateString';
import { Selects } from './Selects';
import { Prev } from './Prev';
import { Next } from './Next';
import { useCalendarContext } from '../useCalendarContext';

const Controls = ({ children, render }) => {
  const { handleNextMonthClick } = useCalendarContext();

  return <div className='select-date-block'>{children || render({ handleNextMonthClick })}</div>;
};

Controls.DateString = DateString;
Controls.Selects = Selects;
Controls.Prev = Prev;
Controls.Next = Next;

export { Controls };
