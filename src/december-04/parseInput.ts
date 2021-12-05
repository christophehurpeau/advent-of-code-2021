export interface Board {
  rows: number[][];
  columns: number[][];
}

export interface BingoGame {
  numbersToDraw: number[];
  boards: Board[];
}

export const parseInput = (input: string): BingoGame => {
  const lines = `${input.trim()}\n`.split('\n');
  const numbersToDraw = lines
    .shift()!
    .split(',')
    .map((v) => parseInt(v, 10));
  const boards: Board[] = [];
  let rows: number[][] = [];

  lines.shift();

  for (const line of lines) {
    if (line === '') {
      boards.push({
        rows,
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        columns: rows[0].map((_, index) => {
          return rows.map((row) => row[index]);
        }),
      });
      rows = [];
    } else {
      rows.push(
        line
          .trim()
          .split(/\s+/)
          .map((v) => parseInt(v, 10)),
      );
    }
  }

  return { numbersToDraw, boards };
};
