import React from 'react';

const CalendarContext = React.createContext(undefined);

function CalendarProvider({ children, value }) {
  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
}

function useCalendarContext() {
  const context = React.useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
}

export { CalendarProvider, useCalendarContext };
