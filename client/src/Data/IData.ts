import { Day, Weight } from '../models';
import { DaysParams } from './dataParams';

export default interface IDate {
  getDays(queryParams?: DaysParams): Promise<Day[]>;

  getWeights(): Promise<Weight[]>;

  postDays(days: any[]): Promise<any>;
}
