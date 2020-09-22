import React from 'react';
import { useState, useEffect } from 'react';
import { getMockDays, getDays } from '../data';
import { Line } from 'react-chartjs-2';
import { Modal, Button } from 'react-bootstrap';
import { Day } from '../models';
import PieBodyPercentage from './PieBodyPercentage';

export default function CaloriesChart(props: any) {
  const days = props.days;
  const [show, setShow] = useState(false);
  const [day, setDay] = useState<Day>();
  const firstDayWithWeightInfo = days?.find((d: any) => d.WuName && d.WuLabel);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function event(e: any) {
    if (e.length > 0 && days !== undefined) {
      const i = e[0]._index;
      setDay(days[i]);
      handleShow();
    }
  }

  return (
    <>
      {days && (
        <Line
          getElementsAtEvent={e => event(e)}
          data={{
            labels: days?.map((d: any) => new Date(d.DyDate).toLocaleDateString()),
            datasets: [
              {
                label: `Calories Over Time in ${
                  firstDayWithWeightInfo === undefined
                    ? '<No Weight Units found!>'
                    : `${firstDayWithWeightInfo?.WuName} (${firstDayWithWeightInfo?.WuLabel})`
                }`,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: days?.map((d: any) => d.DyCalories),
              },
            ],
          }}
        />
      )}
    </>
  );
}
