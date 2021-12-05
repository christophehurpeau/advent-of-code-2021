import {
  createThreeMeasurementSlidingWindows,
  parseReport,
  processReport,
  processReport2,
} from './index';
import fs from 'fs';

const exampleInput = `
199
200
208
210
200
207
240
269
260
263
`;
const input = fs.readFileSync('./src/december-01/input.txt', 'utf-8');

describe('part1', () => {
  test('example', () => {
    expect(processReport(exampleInput)).toBe(7);
  });

  test('input', () => {
    expect(processReport(input)).toBe(1121);
  });
});

describe('part2', () => {
  test('createThreeMeasurementSlidingWindows', () => {
    const values = parseReport(exampleInput);
    expect(createThreeMeasurementSlidingWindows(values)).toStrictEqual([
      607, 618, 618, 617, 647, 716, 769, 792,
    ]);
  });

  test('example', () => {
    expect(processReport2(exampleInput)).toBe(5);
  });

  test('input', () => {
    expect(processReport2(input)).toBe(1065);
  });
});
