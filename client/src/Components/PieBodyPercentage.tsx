import React from 'react';
import { Pie } from 'react-chartjs-2';

export default function PieBodyPercentage(props: any) {
  return (
    <Pie
      data={{
        labels: props.labels,
        datasets: [
          {
            label: 'Body Composition',
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)'],
            data: props.data,
          },
        ],
      }}
    />
  );
}
