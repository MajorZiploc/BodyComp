import React from 'react';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Modal, Button } from 'react-bootstrap';
import { Day } from '../models';
import PieBodyPercentage from './PieBodyPercentage';

export default function WeightChart(props: any) {
  const days = props.days;
  const [show, setShow] = useState(false);
  const [day, setDay] = useState<Day>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function event(e: any) {
    if (e.length > 0) {
      const i = e[0]._index;
      console.log(`index: ${i}`);
      console.log(`data point clicked: ${days[i].DyDate}`);
      setDay(days[i]);
      handleShow();
    }
  }

  return (
    <>
      <Line
        getElementsAtEvent={e => event(e)}
        data={{
          labels: props.labels,
          datasets: [
            {
              label: 'Weight Over Time (Put units here!)',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: props.data,
            },
          ],
        }}
      />

      {day && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Body Composition Percentages {new Date(day?.DyDate).toLocaleDateString()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PieBodyPercentage
              data={[day.DyMuscleMassPercentage, day.DyBodyFatPercentage]}
              labels={['Muscle Mass', 'Body Fat']}
            />
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
