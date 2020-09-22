import { Day } from '../models';
import React from 'react';
import { useState, useEffect } from 'react';
import { getMockDays, getDays } from '../data';
import SingleLineChart from './SingleLineChart';

export default function HomeCharts() {
  const [days, setDays] = useState<Day[]>();
  const firstDayWithWeightInfo = days?.find((d: any) => d.WuName && d.WuLabel);
  const labels = days?.map((d: any) => new Date(d.DyDate).toLocaleDateString());
  const [day, setDay] = useState<Day>();
  const [show, setShow] = useState(false);
  // TODO: add low date and high date filters for user

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const f = async () => {
      setDays(await getMockDays({}));
    };
    f();
  }, []);

  function event(e: any) {
    if (e.length > 0 && days !== undefined) {
      const i = e[0]._index;
      setDay(days[i]);
      handleShow();
    }
  }

  return (
    <>
      <SingleLineChart
        day={day}
        show={show}
        label={`Weight Over Time in ${
          firstDayWithWeightInfo === undefined
            ? '<No Weight Units found!>'
            : `${firstDayWithWeightInfo?.WuName} (${firstDayWithWeightInfo?.WuLabel})`
        }`}
        labels={labels}
        backgroundColor='rgb(255, 99, 132)'
        borderColor='rgb(255, 99, 132)'
        handleClose={handleClose}
        event={event}
        data={days?.map((d: any) => d.DyMorningWeight)}
      />

      <SingleLineChart
        day={day}
        show={show}
        label={`Calories Over Time in ${
          firstDayWithWeightInfo === undefined
            ? '<No Weight Units found!>'
            : `${firstDayWithWeightInfo?.WuName} (${firstDayWithWeightInfo?.WuLabel})`
        }`}
        labels={labels}
        backgroundColor='rgb(132, 99, 255)'
        borderColor='rgb(132, 99, 255)'
        handleClose={handleClose}
        event={event}
        data={days?.map((d: any) => d.DyCalories)}
      />
    </>
  );
}
