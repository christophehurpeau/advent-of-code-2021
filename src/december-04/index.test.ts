import fs from 'fs';
import { parseInput } from './parseInput';
import { findWinningBoard, findLoosingBoard } from '.';

const input = fs.readFileSync('./src/december-04/input.txt', 'utf-8');

const exampleInput = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

describe('part1', () => {
  test('parseInput', () => {
    expect(parseInput(exampleInput)).toMatchSnapshot();
  });

  test('example', () => {
    const res = findWinningBoard(exampleInput);
    expect(res).toBe(4512);
  });

  test('input', () => {
    const res = findWinningBoard(input);
    expect(res).toMatchInlineSnapshot('33462');
  });
});

describe('part2', () => {
  test('example', () => {
    const res = findLoosingBoard(exampleInput);
    expect(res).toBe(1924);
  });

  test('input', () => {
    const res = findLoosingBoard(input);
    expect(res).toMatchInlineSnapshot('30070');
  });
});
