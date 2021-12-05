export const parseReport = (report: string): number[] => {
  return report
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s !== '')
    .map((s) => parseInt(s, 10));
};

const countNumberOfTimesDepthMeasurementIncreases = (
  values: number[],
): number => {
  let count = 0;
  values.forEach((value, index) => {
    if (index === 0) return;
    const prevValue = values[index - 1];
    if (prevValue < value) count++;
  });
  return count;
};

export const createThreeMeasurementSlidingWindows = (
  values: number[],
): number[] => {
  const windows: number[] = [];

  values.forEach((value, index) => {
    if (index + 2 >= values.length) return;
    windows.push(value + values[index + 1] + values[index + 2]);
  });

  return windows;
};

const countNumberOfTimesThreeMeasurementSlidingWindowIncreases = (
  values: number[],
) => {
  const windows = createThreeMeasurementSlidingWindows(values);
  return countNumberOfTimesDepthMeasurementIncreases(windows);
};

export const processReport = (sonarSweepReport: string) => {
  const values = parseReport(sonarSweepReport);
  return countNumberOfTimesDepthMeasurementIncreases(values);
};

export const processReport2 = (sonarSweepReport: string) => {
  const values = parseReport(sonarSweepReport);
  return countNumberOfTimesThreeMeasurementSlidingWindowIncreases(values);
};
