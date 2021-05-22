import { Day, Weight, AppSettings } from '../models';
import { DaysParams } from './dataParams';

export default interface IData {
  getConfig(): Promise<AppSettings>;

  getDays(queryParams?: DaysParams): Promise<Day[]>;

  getWeights(): Promise<Weight[]>;

  postDays(days: any[]): Promise<any>;

  postDeleteDays(days: any[]): Promise<any>;
}
