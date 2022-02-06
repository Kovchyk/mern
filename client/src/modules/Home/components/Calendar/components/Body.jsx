import React from 'react';
import { useCalendarContext } from '../useCalendarContext';
import * as utils from '../utils';

const Body = () => {
  const { weekDayNames, getYear, getMonth, selectedDate, currentDate, getSelectedDate } = useCalendarContext();
  const monthData = utils.getMonthData(getYear(), getMonth());

  return (
    <table>
      <thead>
        <tr>
          {weekDayNames.map(name => (
            <th key={name}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {monthData.map((week, index) => (
          <tr key={index}>
            {week.map((date, index) =>
              !!date ? (
                <td
                  key={index}
                  className={`day ${utils.areDatesEqual(new Date(), date) ? 'today' : ''} ${
                    utils.areDatesEqual(selectedDate, date) ? 'selected' : ''
                  } ${currentDate.getMonth() !== date.getMonth() ? 'shade' : ''}`}
                  onClick={() => getSelectedDate(date)}
                >
                  {date.getDate()}
                </td>
              ) : (
                <td key={index} />
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Body };
