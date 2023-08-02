import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';


const HomePage = () => {
  const userContext = useAuth()
  const auth = userContext.auth
  const setAuth = userContext.setAuth

 
  return (
    <Layout title="Home - Ecomerce app">
      <h1>Home Page</h1>
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  );
};

export default HomePage;