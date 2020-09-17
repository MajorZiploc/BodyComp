export interface TimeRange {
  timeStart: Date;
  timeEnd: Date | null;
}
// Example of Adding to previous interface with '&'
export type StatusChangeParams = TimeRange & {
  status: 'opened' | 'closed';
};

export type Day = {
  DyDate: Date;
  DyCalories: Number;
  DyMorningWeight: Number;
  DyWeightUnits: String;
  DyBodyFatPercentage: Number;
  DyMuscleMassPercentage: Number;
};
