import { Day } from '../models';
import React, { CSSProperties } from 'react';
import { useState, useEffect } from 'react';
import { data } from '../Data/DataFactory';
import SingleLineChart from './SingleLineChart';
import DatePicker from 'react-datepicker';
import { withRouter } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../Styles/Carousel.css';

const ml_10 = {
  marginLeft: '10.5%',
} as CSSProperties;

interface Summary {
  weightGainOrLoss: number;
  weightUnits: string;
  // avgWeight: number;
  // avgCalories: number;
}

function HomeCharts() {
  const [days, setDays] = useState<Day[]>();
  const firstDayWithWeightInfo = days?.find((d: any) => d.WuName && d.WuLabel);
  const labels = days?.map((d: Day) => new Date(d.DyDate).toLocaleDateString());
  const [day, setDay] = useState<Day>();
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [summary, setSummary] = useState<Summary>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const f = async () => {
      const ds = await data.getDays({
        minDate: startDate?.toLocaleDateString(),
        maxDate: endDate?.toLocaleDateString(),
      });
      setDays(ds);
      if (ds) {
        const weightUnits = ds.find(d => d.WuLabel)?.WuLabel ?? 'No weight units!';
        const daysWithMorningWeight = ds.filter(d => d.DyMorningWeight !== null && d.DyMorningWeight !== undefined);
        const lastDayWeight = daysWithMorningWeight[daysWithMorningWeight?.length - 1]?.DyMorningWeight;
        const firstDayWeight = daysWithMorningWeight[0]?.DyMorningWeight;
        if (lastDayWeight && firstDayWeight) {
          setSummary({
            weightGainOrLoss: lastDayWeight - firstDayWeight,
            weightUnits: weightUnits,
          });
        }
      }
    };
    f();
  }, [startDate, endDate]);

  function event(e: any) {
    if (e.length > 0 && days !== undefined) {
      const i = e[0]._index;
      setDay(days[i]);
      handleShow();
    }
  }

  return (
    <>
      <DatePicker selected={startDate} onChange={(d: Date) => setStartDate(d)} />
      <DatePicker selected={endDate} onChange={(d: Date) => setEndDate(d)} />

      <Carousel>
        {[
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
            data={days?.map((d: Day) => d.DyMorningWeight)}
          />,
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
            data={days?.map((d: Day) => d.DyCalories)}
          />,
        ].map((chart, index) => (
          <Carousel.Item className={'w-75 h-75 justify-content-center'} style={ml_10} key={index}>
            {chart}
          </Carousel.Item>
        ))}
      </Carousel>
      {summary && (
        <p>
          {summary.weightGainOrLoss > 0 ? 'Weight Gain: ' : 'Weight Loss: '}
          {Math.abs(summary.weightGainOrLoss).toFixed(2) + ' ' + summary.weightUnits}
        </p>
      )}
    </>
  );
}

export default withRouter(HomeCharts);
