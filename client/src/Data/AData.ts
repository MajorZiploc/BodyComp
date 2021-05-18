import { Day, Weight, AppSettings } from '../models';
import { DaysParams } from './dataParams';
import IData from './IData';
import urljoin from 'url-join';

export default abstract class AData implements IData {
  getConfig(): Promise<AppSettings> {
    const url = urljoin(__dirname, 'config.json');
    return fetch(url, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async r => {
      return await r.json();
    });
  }

  abstract getDays(queryParams?: DaysParams): Promise<Day[]>;

  abstract getWeights(): Promise<Weight[]>;

  abstract postDays(days: any[]): Promise<any>;

  abstract postDeleteDays(days: any[]): Promise<any>;
}
