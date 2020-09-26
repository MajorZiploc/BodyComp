import Data from './data';
import MockData from './mockData';
import { config } from '../config';
import IData from './IData';

export const data: IData = config.shouldMockData ? new MockData() : new Data();
