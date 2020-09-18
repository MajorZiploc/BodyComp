import { config } from './config';
import urljoin from 'url-join';
import { jsonRefactor as jr } from 'json-test-utility';
import { Day } from './models';

export interface DaysParams {
  minDate?: string;
  maxDate?: string;
}

function formatQueryParams(json?: any) {
  if (json === null || json === undefined) return '';
  const qps = jr.toKeyValArray(json);
  return qps.length == 0 ? '' : '?' + qps.map(ele => ele.key + '=' + ele.value).join('&');
}

export async function getDays(queryParams?: DaysParams): Promise<any> {
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
