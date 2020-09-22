import { Modal, Button } from 'react-bootstrap';
import { Day } from '../models';
import PieBodyPercentage from './PieBodyPercentage';
import React from 'react';
import { useState, useEffect } from 'react';
import { getMockDays, getDays } from '../data';
import WeightChart from './InteractiveWeightChart';
import CaloriesChart from './CaloriesChart';

export default function HomeCharts() {
  const [days, setDays] = useState<Day[]>();
  useEffect(() => {
    const f = async () => {
      setDays(await getMockDays({}));
    };
    f();
  }, []);
  return (
    <>
      <WeightChart days={days} />
      <CaloriesChart days={days} />
    </>
  );
}
