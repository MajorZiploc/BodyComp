import { Day, Weight, AppSettings } from '../models';
import { DaysParams } from './dataParams';
import IData from './IData';
import { join } from 'path';

export default abstract class AData implements IData {
  private _config: Promise<AppSettings>;

  constructor() {
    const url = join(__dirname, 'config.json');
    this._config = fetch(url, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async r => {
      return await r.json();
    });
  }

  getConfig(): Promise<AppSettings> {
    return this._config;
  }

  abstract getDays(queryParams?: DaysParams): Promise<Day[]>;

  abstract getWeights(): Promise<Weight[]>;

  abstract postDays(days: any[]): Promise<any>;

  abstract postDeleteDays(days: any[]): Promise<any>;
}
