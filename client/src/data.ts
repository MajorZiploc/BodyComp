import { config } from './config';
import urljoin from 'url-join';
import { jsonRefactor as jr } from 'json-test-utility';
import { Day } from './models';

export interface DaysParams {
  minDate: string;
  maxDate: string;
}

function formatQueryParams(json: any) {
  const qps = jr.toKeyValArray(json);
  return qps.length == 0 ? '' : '?' + qps.map(ele => ele.key + '=' + ele.value).join('&');
}

export async function getDays(queryParams: DaysParams): Promise<Day[]> {
  const url = urljoin(config.apiUrl, 'days', formatQueryParams(queryParams));
  return fetch(url).then(r => r.json());
}
