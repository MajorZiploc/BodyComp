export interface TimeRange {
  timeStart: Date;
  timeEnd: Date | null;
}
// Example of Adding to previous interface with '&'
export type StatusChangeParams = TimeRange & {
  status: 'opened' | 'closed';
};

export type Day = {
  DyDate: string;
  DyCalories: number | null;
  DyMorningWeight: number | null;
  WuName: string | null;
  WuLabel: string | null;
  DyBodyFatPercentage: number | null;
  DyMuscleMassPercentage: number | null;
};

export type Weight = {
  WuId: number;
  WuLabel: string | null;
  WuName: string | null;
};

export type Auth = {
  clientId: string;
  clientRoot: string;
};

export type AppSettings = {
  apiUrl: string;
  auth: Auth;
  shouldMockData: boolean;
};
