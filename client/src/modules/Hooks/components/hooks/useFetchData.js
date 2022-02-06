import { useState, useEffect } from 'react';
import { getPeopleAPI, getFilmsAPI } from '../../serviseAPI';

const useFetchData = () => {
  const [data, setData] = useState({ peopleList: [], filmsList: [] });

  const fetchData = async () => {
    const peopleList = (await getPeopleAPI()).results || [];
    const filmsList = (await getFilmsAPI()).results || [];

    const data = { peopleList, filmsList };

    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data };
};

export default useFetchData;
