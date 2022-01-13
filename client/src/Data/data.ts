import { Day, Weight } from '../models';
import { DaysParams } from './dataParams';
import { formatQueryParams } from './dataUtil';
import AData from './AData';

export default class Data extends AData {
  async postDeleteDays(days: any[]): Promise<any> {
    const config = await this.getConfig();
    const url = `${config.apiUrl}/bulkDelete`;
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

  async getDays(queryParams?: DaysParams): Promise<Day[]> {
    const config = await this.getConfig();
    const url = `${config.apiUrl}/day${formatQueryParams(queryParams)}`;
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
    const config = await this.getConfig();
    const url = `${config.apiUrl}/weight`;
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
    const config = await this.getConfig();
    console.log('here: ' + JSON.stringify(days));
    const url = `${config.apiUrl}/bulkUpload`;
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
