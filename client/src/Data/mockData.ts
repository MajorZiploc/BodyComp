import MockDays from '../MockDays.json';
import MockWeights from '../MockWeights.json';
import { DaysParams } from './dataParams';
import { Day, Weight } from '../models';
import IData from './IData';

export default class MockData implements IData {
  async postDeleteDays(days: any[]): Promise<any> {
    return { message: 'Successful mock upload' };
  }

  async getDays(queryParams?: DaysParams): Promise<Day[]> {
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
  async getWeights(): Promise<Weight[]> {
    return MockWeights;
  }

  async postDays(days: any[]): Promise<any> {
    return { message: 'Successful mock upload' };
  }
}
