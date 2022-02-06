import React from 'react';
import { useCalendarContext } from '../useCalendarContext';

const Selects = () => {
  const { getMonth, getYear, monthNames, handleSelectChange, selectMonthRef, selectYearRef } = useCalendarContext();

  const years = ['2020', '2021', '2022', '2023', '2024', '2025'];

  return (
    <>
      <select value={getMonth()} onChange={handleSelectChange} ref={selectMonthRef}>
        {monthNames.map((name, index) => (
          <option key={name} value={index}>
            {name}
          </option>
        ))}
      </select>
      <select value={getYear()} onChange={handleSelectChange} ref={selectYearRef}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </>
  );
};

export { Selects };
