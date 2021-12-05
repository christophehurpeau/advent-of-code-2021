import { processPlannedCourse } from './part2';
import fs from 'fs';

const exampleInput = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`;
const input = fs.readFileSync('./src/december-02/input.txt', 'utf-8');

describe('part2', () => {
  test('example', () => {
    const res = processPlannedCourse(exampleInput);
    expect(res).toStrictEqual({
      depth: 60,
      horizontal: 15,
    });
    expect(res.horizontal * res.depth).toBe(900);
  });

  test('input', () => {
    const res = processPlannedCourse(input);
    expect(res).toMatchInlineSnapshot(`
      Object {
        "depth": 615654,
        "horizontal": 1911,
      }
    `);
    expect(res.horizontal * res.depth).toMatchInlineSnapshot(`1176514794`);
  });
});
