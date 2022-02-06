import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthLocalStorage } from '@store/authentification/auth.slice';
import { STORAGE_NAME } from '@services/constants';
import { Header } from '@components/layout';
import { Layout } from 'antd';
import { selectorAuth } from '@store/authentification/auth.slice';

import Routes from '@components/Routes';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(selectorAuth);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_NAME));

    if (data && data.token) {
      dispatch(getAuthLocalStorage(data));
    }
  }, [dispatch]);

  const { Content } = Layout;

  return (
    <Layout>
      {auth.token && <Header />}
      <Content className={`site-layout ${!auth.token ? 'login' : ''}`}>
        <Routes />
      </Content>
    </Layout>
  );
}

export default App;
