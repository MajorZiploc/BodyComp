import React from 'react';
import { useState, useEffect } from 'react';
import { getMockDays, getDays } from '../data';
import { Line } from 'react-chartjs-2';
import { Modal, Button } from 'react-bootstrap';
import { Day } from '../models';
import PieBodyPercentage from './PieBodyPercentage';

export default function WeightChart(props: any) {
  const days = props.days;
  const firstDayWithWeightInfo = props.firstDayWithWeightInfo;

  return (
    <>
      {days && (
        <>
          <Line
            data={{
              labels: days?.map((d: any) => new Date(d.DyDate).toLocaleDateString()),
              datasets: [
                {
                  label: `Weight Over Time in ${
                    firstDayWithWeightInfo === undefined
                      ? '<No Weight Units found!>'
                      : `${firstDayWithWeightInfo?.WuName} (${firstDayWithWeightInfo?.WuLabel})`
                  }`,
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: days?.map((d: any) => d.DyMorningWeight),
                },
              ],
            }}
          />
        </>
      )}
    </>
  );
}
