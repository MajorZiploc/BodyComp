import { Day } from '../models';
import React, { CSSProperties } from 'react';
import { useState, useEffect } from 'react';
import { data } from '../Data/DataFactory';
import SingleLineChart from './SingleLineChart';
import DatePicker from 'react-datepicker';
import { withRouter } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../Styles/Carousel.css';

interface Summary {
  weightGainOrLoss?: number;
  weightUnits?: string;
  // avgWeight: number;
  // avgCalories: number;
}

export interface SummaryProps {
  days?: Day[];
}

function getWeightGainOrLoss(days?: Day[]) {
  if (days) {
    const daysWithMorningWeight = days.filter(d => d.DyMorningWeight !== null && d.DyMorningWeight !== undefined);
    const lastDayWeight = daysWithMorningWeight[daysWithMorningWeight?.length - 1]?.DyMorningWeight;
    const firstDayWeight = daysWithMorningWeight[0]?.DyMorningWeight;
    if (firstDayWeight && lastDayWeight) {
      return lastDayWeight - firstDayWeight;
    }
  }
  return undefined;
}

function getWeightUnits(days?: Day[]) {
  const weightUnits = days?.find(d => d.WuLabel)?.WuLabel ?? 'No weight units!';
  return weightUnits;
}

export default function Summary(summaryProps: SummaryProps) {
  const summary = {
    weightGainOrLoss: getWeightGainOrLoss(summaryProps.days),
    weightUnits: getWeightUnits(summaryProps.days),
  };

  return (
    <>
      {summary && summary.weightGainOrLoss && (
        <p>
          {summary.weightGainOrLoss > 0 ? 'Weight Gain: ' : 'Weight Loss: '}
          {Math.abs(summary.weightGainOrLoss).toFixed(2) + ' ' + summary.weightUnits}
        </p>
      )}
    </>
  );
}
