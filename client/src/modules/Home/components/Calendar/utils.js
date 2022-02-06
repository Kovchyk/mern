const DAYS_IN_WEEK = 7;
const WEEK_IN_MONTH = 6;

export const getMonthData = (year, month) => {
  const result = [];
  const date = new Date(year, month);
  const monthStatsOn = date.getDay();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  let currentMonthDay = 1;
  let prevMonthDay = 1;

  for (let i = 0; i < WEEK_IN_MONTH; i++) {
    result[i] = [];

    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if (i === 0 && j < monthStatsOn) {
        result[i][j] = new Date(year, month - 1, daysInPrevMonth - monthStatsOn + prevMonthDay++);
      } else {
        result[i][j] = new Date(year, month, currentMonthDay++);
      }
    }
  }

  return result;
};

export const areDatesEqual = (a, b) => {
  if (!a || !b) {
    return false;
  }

  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};
