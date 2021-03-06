import React from 'react';
import { Line } from 'react-chartjs-2';
import { Modal, Button } from 'react-bootstrap';
import PieBodyPercentage from './PieBodyPercentage';
import { Day } from '../models';

export interface SingleLineChartProps {
  day?: Day;
  show: boolean;
  event: (e: any) => void;
  label: string;
  labels?: string[];
  backgroundColor: string;
  borderColor: string;
  handleClose: () => void;
  data: any[] | undefined;
}

export default function SingleLineChart(props: SingleLineChartProps) {
  const day = props.day;
  const show = props.show;
  const event = props.event;
  const label = props.label;
  const labels = props.labels;
  const backgroundColor = props.backgroundColor;
  const borderColor = props.borderColor;
  const handleClose = props.handleClose;
  const data = props.data;

  return (
    <>
      <Line
        getElementsAtEvent={e => event(e)}
        data={{
          labels: labels,
          datasets: [
            {
              label: label,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              data: data,
            },
          ],
        }}
      />

      {day && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Body Composition Percentages {new Date(day?.DyDate).toLocaleDateString()} - {day.DyMorningWeight}{' '}
              {day.WuLabel} - Calories: {day.DyCalories}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {day.DyBodyFatPercentage && day.DyMuscleMassPercentage ? (
              <PieBodyPercentage
                data={[
                  day.DyMuscleMassPercentage,
                  day.DyBodyFatPercentage,
                  (100 - day.DyBodyFatPercentage - day.DyMuscleMassPercentage).toFixed(2),
                ]}
                labels={[
                  `Muscle Mass ${day.DyMuscleMassPercentage ?? '??'}%`,
                  `Body Fat ${day.DyBodyFatPercentage ?? '??'}%`,
                  `Other ${(100 - day.DyBodyFatPercentage - day.DyMuscleMassPercentage).toFixed(2)}%`,
                ]}
              />
            ) : (
              <ul>
                <li>Muscle Mass: {`${day.DyMuscleMassPercentage}%` ?? 'no data'}</li>
                <li>Body Fat: {`${day.DyBodyFatPercentage}%` ?? 'no data'}</li>
              </ul>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
