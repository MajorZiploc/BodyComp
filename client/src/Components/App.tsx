import React from 'react';
import '../Styles/App.css';
import Layout from './Shared/Layout';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Layout />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
