import React from 'react';
import { useState, useEffect } from 'react';
import { getMockDays, getDays } from '../data';
import { Line } from 'react-chartjs-2';
import { Modal, Button } from 'react-bootstrap';
import { Day } from '../models';
import PieBodyPercentage from './PieBodyPercentage';

export default function WeightChart() {
  const [show, setShow] = useState(false);
  const [day, setDay] = useState<Day>();
  const [days, setDays] = useState<Day[]>();
  const firstDayWithWeightInfo = days?.find(d => d.WuName && d.WuLabel);

  useEffect(() => {
    const f = async () => {
      setDays(await getDays({}));
    };
    f();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function event(e: any) {
    if (e.length > 0 && days != undefined) {
      const i = e[0]._index;
      console.log(`index: ${i}`);
      console.log(`data point clicked: ${days[i].DyDate}`);
      setDay(days[i]);
      handleShow();
    }
  }

  function getOther(bf: any, mm: any) {
    const x = bf ?? 0;
    const y = mm ?? 0;
    return 100 - x - y;
  }

  return (
    <>
      {days && (
        <>
          <Line
            getElementsAtEvent={e => event(e)}
            data={{
              labels: days?.map(d => new Date(d.DyDate).toLocaleDateString()),
              datasets: [
                {
                  label: `Weight Over Time in ${
                    firstDayWithWeightInfo == undefined
                      ? '<No Weight Units found!>'
                      : `${firstDayWithWeightInfo?.WuName} (${firstDayWithWeightInfo?.WuLabel})`
                  }`,
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: days?.map(d => d.DyMorningWeight),
                },
              ],
            }}
          />

          {day && (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Body Composition Percentages {new Date(day?.DyDate).toLocaleDateString()} - {day.DyMorningWeight}{' '}
                  {day.WuLabel}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <PieBodyPercentage
                  data={[
                    day.DyMuscleMassPercentage,
                    day.DyBodyFatPercentage,
                    getOther(day.DyBodyFatPercentage, day.DyMuscleMassPercentage),
                  ]}
                  labels={['Muscle Mass', 'Body Fat', 'Other']}
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
      )}
    </>
  );
}
