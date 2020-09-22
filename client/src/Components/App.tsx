import React from 'react';
import '../Styles/App.css';
import HomeCharts from './HomeCharts';
import Layout from './Shared/Layout';

function App() {
  return (
    <div className='App'>
      <Layout />
      <HomeCharts />
      {/* <header className='App-header'>
        <Days />
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
