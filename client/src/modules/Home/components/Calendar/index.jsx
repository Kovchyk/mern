import React, { useState, useRef } from 'react';
import { Controls, Body } from './components';
import { CalendarProvider } from './useCalendarContext';
import './Calendar.css';

const weekDayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Calendar = props => {
  const { date, dateSelected, onChange, children } = props;

  const [currentDate, setCurrentDate] = useState(date || new Date());
  const [selectedDate, setSelectedDate] = useState(dateSelected || date || new Date());
  const selectMonthRef = useRef(null);
  const selectYearRef = useRef(null);

  const getYear = () => {
    return currentDate.getFullYear();
  };

  const getMonth = () => {
    return currentDate.getMonth();
  };

  const handleSelectChange = () => {
    const date = new Date(selectYearRef.current.value, selectMonthRef.current.value);
    setCurrentDate(date);
  };

  const handlePreviousMonthClick = () => {
    const date = new Date(getYear(), getMonth() - 1);
    setCurrentDate(date);
  };

  const handleNextMonthClick = () => {
    const date = new Date(getYear(), getMonth() + 1);
    setCurrentDate(date);
  };

  const getSelectedDate = date => {
    const newDate = new Date(date.getFullYear(), date.getMonth());
    setCurrentDate(newDate);
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <div id='calendar'>
      <CalendarProvider
        value={{
          handlePreviousMonthClick,
          handleSelectChange,
          getMonth,
          getYear,
          selectMonthRef,
          selectYearRef,
          handleNextMonthClick,
          weekDayNames,
          selectedDate,
          currentDate,
          getSelectedDate,
          monthNames,
        }}
      >
        {children}
      </CalendarProvider>
    </div>
  );
};

Calendar.Controls = Controls;
Calendar.Body = Body;

export default Calendar;
