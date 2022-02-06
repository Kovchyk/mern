import React, { useState } from 'react';
import Calendar from './components/Calendar';
import Test from './components/Test';

const Home = () => {
  const [date, setDate] = useState(new Date());

  const handleOnChange = date => {
    setDate(date);
  };

  return (
    <div>Home Page</div>
    // <div className='home'>
    //   <div className='home__calendar-wrapper'>
    //     <Test />
    //     <Calendar onChange={handleOnChange}>
    //       <Calendar.Controls
    //         render={({ handleNextMonthClick }) => {
    //           return <dev onClick={handleNextMonthClick}>test</dev>;
    //         }}
    //       >
    //         <Calendar.Controls.Prev />
    //         <Calendar.Controls.DateString />
    //         <Calendar.Controls.Next />
    //       </Calendar.Controls>
    //       <Calendar.Body />
    //     </Calendar>
    //   </div>
    //   <div className='home__chosen-date'>{`Date selected: ${date.toDateString()}`}</div>
    // </div>
  );
};

export default Home;
