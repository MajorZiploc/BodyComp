import React from 'react';
import logo from '../Resources/logo.svg';
import '../Styles/App.css';
import Days from './Days';
import WeightChart from './InteractiveWeightChart';
import { Day } from '../models';
import { useState, useEffect } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div className='App'>
      <WeightChart />
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
