import { config } from './config';
import urljoin from 'url-join';
import { jsonRefactor as jr } from 'json-test-utility';
import { Day, Weight } from './models';
import MockDays from './MockDays.json';

export interface DaysParams {
  minDate?: string;
  maxDate?: string;
}

function formatQueryParams(json?: any) {
  if (json === null || json === undefined) return '';
  const qps = jr.toKeyValArray(json).filter(kv => kv.value);
  return qps.length === 0 ? '' : '?' + qps.map(ele => ele.key + '=' + ele.value).join('&');
}

export async function getDays(queryParams?: DaysParams): Promise<Day[]> {
  const url = urljoin(config.apiUrl, 'day', formatQueryParams(queryParams));
  return fetch(url, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async r => {
    return await r.json();
  });
}

export async function getWeights(): Promise<Weight[]> {
  const url = urljoin(config.apiUrl, 'weight');
  return fetch(url, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async r => {
    return await r.json();
  });
}

export async function getMockDays(queryParams?: DaysParams): Promise<Day[]> {
  return MockDays.filter(
    d =>
      queryParams?.minDate === null ||
      (queryParams?.minDate === undefined ? true : new Date(d.DyDate) >= new Date(queryParams?.minDate))
  ).filter(
    d =>
      queryParams?.maxDate === null ||
      (queryParams?.maxDate === undefined ? true : new Date(d.DyDate) <= new Date(queryParams?.maxDate))
  );
}

export async function postDays(days: any[]) {
  console.log('here: ' + JSON.stringify(days));
  const url = urljoin(config.apiUrl, 'bulkUpload');
  return await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(days),
  })
    .then(e => console.log('hapi path ' + JSON.stringify(e)))
    .catch((e: any) => console.log('sad path ' + e));
}
