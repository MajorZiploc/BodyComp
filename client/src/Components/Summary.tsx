import { Day } from '../models';
import React, { CSSProperties } from 'react';
import { useState, useEffect } from 'react';
import { data } from '../Data/DataFactory';
import SingleLineChart from './SingleLineChart';
import DatePicker from 'react-datepicker';
import { withRouter } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../Styles/Carousel.css';

interface SummaryState {
  weightGainOrLoss?: number;
  weightUnits?: string;
  muscleGainOrLoss?: number;
  bodyFatGainOrLoss?: number;
  avgWeight?: number;
  avgCalories?: number;
}

export interface SummaryProps {
  days?: Day[];
}

function notNullOrUndefined(thing: any) {
  return thing !== null && thing !== undefined;
}

function gainOrLoss(l: number) {
  return (l > 0 ? 'Gain' : 'Loss') + ': ';
}

function formartGainOrLossNumber(n: number) {
  return Math.abs(n).toFixed(2);
}

function getAvgCalories(days?: Day[]) {
  if (days) {
    const daysWithCals = days.filter(d => notNullOrUndefined(d.DyCalories));
    const avgCals = days.reduce((acc, ele) => acc + (ele.DyCalories ?? 0), 0) / daysWithCals.length;
    return avgCals;
  }
  return undefined;
}

function getAvgWeight(days?: Day[]) {
  if (days) {
    const daysWithWeight = days.filter(d => notNullOrUndefined(d.DyMorningWeight));
    const avgWeight = days.reduce((acc, ele) => acc + (ele.DyMorningWeight ?? 0), 0) / daysWithWeight.length;
    return avgWeight;
  }
  return undefined;
}

function getWeightGainOrLoss(days?: Day[]) {
  if (days) {
    const daysWithMorningWeight = days.filter(d => notNullOrUndefined(d.DyMorningWeight));
    const lastDayWeight = daysWithMorningWeight[daysWithMorningWeight?.length - 1]?.DyMorningWeight;
    const firstDayWeight = daysWithMorningWeight[0]?.DyMorningWeight;
    if (firstDayWeight && lastDayWeight) {
      return lastDayWeight - firstDayWeight;
    }
  }
  return undefined;
}

function getMuscleMassGainOrLoss(days?: Day[]) {
  if (days) {
    const dWithWMM = days.filter(d => [d.DyMorningWeight, d.DyMuscleMassPercentage].every(notNullOrUndefined));
    const lastDay = dWithWMM[dWithWMM?.length - 1];
    const firstDay = dWithWMM[0];
    const lastDayWeight = lastDay?.DyMorningWeight;
    const firstDayWeight = firstDay?.DyMorningWeight;
    const lastDayMM = lastDay?.DyMuscleMassPercentage;
    const firstDayMM = firstDay?.DyMuscleMassPercentage;
    if (firstDayWeight && lastDayWeight && lastDayMM && firstDayMM) {
      const firstDayMMInWeight = firstDayWeight * firstDayMM * 0.01;
      const lastDayMMInWeight = lastDayWeight * lastDayMM * 0.01;
      return lastDayMMInWeight - firstDayMMInWeight;
    }
  }
  return undefined;
}

function getBodyFatGainOrLoss(days?: Day[]) {
  if (days) {
    const dWithWBF = days.filter(d => [d.DyMorningWeight, d.DyBodyFatPercentage].every(notNullOrUndefined));
    const lastDay = dWithWBF[dWithWBF?.length - 1];
    const firstDay = dWithWBF[0];
    const lastDayWeight = lastDay?.DyMorningWeight;
    const firstDayWeight = firstDay?.DyMorningWeight;
    const lastDayBF = lastDay?.DyBodyFatPercentage;
    const firstDayBF = firstDay?.DyBodyFatPercentage;
    if (firstDayWeight && lastDayWeight && lastDayBF && firstDayBF) {
      const firstDayBFInWeight = firstDayWeight * firstDayBF * 0.01;
      const lastDayBFInWeight = lastDayWeight * lastDayBF * 0.01;
      return lastDayBFInWeight - firstDayBFInWeight;
    }
  }
  return undefined;
}

function getWeightUnits(days?: Day[]) {
  const weightUnits = days?.find(d => d.WuLabel)?.WuLabel ?? 'No weight units!';
  return weightUnits;
}

export default function Summary(summaryProps: SummaryProps) {
  const summary: SummaryState = {
    weightGainOrLoss: getWeightGainOrLoss(summaryProps.days),
    weightUnits: getWeightUnits(summaryProps.days),
    bodyFatGainOrLoss: getBodyFatGainOrLoss(summaryProps.days),
    muscleGainOrLoss: getMuscleMassGainOrLoss(summaryProps.days),
    avgCalories: getAvgCalories(summaryProps.days),
    avgWeight: getAvgWeight(summaryProps.days),
  };

  return (
    <>
      {summary && (
        <p>
          {summary.weightGainOrLoss && (
            <>
              {'Weight ' + gainOrLoss(summary.weightGainOrLoss)}
              {formartGainOrLossNumber(summary.weightGainOrLoss) + ' ' + summary.weightUnits}
            </>
          )}
          <br />
          {summary.bodyFatGainOrLoss && (
            <>
              {'Body Fat ' + gainOrLoss(summary.bodyFatGainOrLoss)}
              {formartGainOrLossNumber(summary.bodyFatGainOrLoss) + ' ' + summary.weightUnits}
            </>
          )}
          <br />
          {summary.muscleGainOrLoss && (
            <>
              {'Muscle Mass ' + gainOrLoss(summary.muscleGainOrLoss)}
              {formartGainOrLossNumber(summary.muscleGainOrLoss) + ' ' + summary.weightUnits}
            </>
          )}
          <br />
          {summary.avgCalories && (
            <>
              {'Average Calories: '}
              {formartGainOrLossNumber(summary.avgCalories)}
            </>
          )}
          <br />
          {summary.avgWeight && (
            <>
              {'Average Weight: '}
              {formartGainOrLossNumber(summary.avgWeight) + ' ' + summary.weightUnits}
            </>
          )}
        </p>
      )}
    </>
  );
}
