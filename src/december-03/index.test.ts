import { processDiagnosticResult } from './index';
import fs from 'fs';

const input = fs.readFileSync('./src/december-03/input.txt', 'utf-8');

const exampleInput = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;

describe.skip('part1', () => {
  test('example', () => {
    const res = processDiagnosticResult(exampleInput);
    expect(res).toStrictEqual({
      gammaRate: 22,
      epsilonRate: 9,
      powerConsumption: 198,
    });
  });

  test('input', () => {
    const res = processDiagnosticResult(input);
    expect(res).toMatchInlineSnapshot(`
      Object {
        "epsilonRate": 3154,
        "gammaRate": 941,
        "powerConsumption": 2967914,
      }
    `);
  });
});

describe('part2', () => {
  test('example', () => {
    const res = processDiagnosticResult(exampleInput);
    expect(res).toStrictEqual({
      gammaRate: 22,
      epsilonRate: 9,
      powerConsumption: 198,
      oxygenGeneratorRating: 23,
      co2ScrubberRating: 10,
      lifeSupportRating: 230,
    });
  });

  test('input', () => {
    const res = processDiagnosticResult(input);
    expect(res).toMatchInlineSnapshot(`
      Object {
        "co2ScrubberRating": 3654,
        "epsilonRate": 3154,
        "gammaRate": 941,
        "lifeSupportRating": 7041258,
        "oxygenGeneratorRating": 1927,
        "powerConsumption": 2967914,
      }
    `);
  });
});
