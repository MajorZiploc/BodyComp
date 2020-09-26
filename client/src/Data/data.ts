import { config } from '../config';
import urljoin from 'url-join';
import { Day, Weight } from '../models';
import { DaysParams } from './dataParams';
import { formatQueryParams } from './dataUtil';
import IData from './IData';

export default class Data implements IData {
  postDeleteDays(days: any[]): Promise<any> {
    throw new Error('Method not implemented.');
  }

  getDays(queryParams?: DaysParams): Promise<Day[]> {
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

  async getWeights(): Promise<Weight[]> {
    const url = urljoin(config.apiUrl, 'weight');
    return await fetch(url, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async r => {
      return await r.json();
    });
  }

  async postDays(days: any[]): Promise<any> {
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
}
