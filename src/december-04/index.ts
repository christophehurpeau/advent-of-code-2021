import { appLogger } from 'nightingale-app-console';
import type { Board } from './parseInput';
import { parseInput } from './parseInput';

const isBoardWinning = (board: Board, drawnNumbers: number[]): boolean => {
  const winningLine = [...board.rows, ...board.columns].find((line) =>
    line.every((value) => drawnNumbers.includes(value)),
  );
  if (winningLine) {
    appLogger.log('found winning line', { winningLine });
    return true;
  }
  return false;
};

type Score = number;

const calculateScore = (winningBoard: Board, drawnNumbers: number[]): Score => {
  const unmarkedNumbers = [];

  for (const row of winningBoard.rows) {
    unmarkedNumbers.push(...row.filter((v) => !drawnNumbers.includes(v)));
  }

  let sum = 0;

  for (const unmarkedNumber of unmarkedNumbers) {
    sum += unmarkedNumber;
  }

  const lastDrawnNumber = drawnNumbers[drawnNumbers.length - 1];

  appLogger.log('calc score', {
    sum,
    lastDrawnNumber,
  });
  return sum * lastDrawnNumber;
};

export const findWinningBoard = (input: string): Score => {
  const game = parseInput(input);
  const drawnNumbers: number[] = [];

  for (const drawnNumber of game.numbersToDraw) {
    drawnNumbers.push(drawnNumber);
    const winningBoard = game.boards.find((board) =>
      isBoardWinning(board, drawnNumbers),
    );
    if (winningBoard) {
      appLogger.log('found winning board', {
        board: winningBoard.rows.map((row) => row.join(' ')).join('\n'),
      });
      return calculateScore(winningBoard, drawnNumbers);
    }
  }

  throw new Error('Found no winning board');
};

export const findLoosingBoard = (input: string): Score => {
  const game = parseInput(input);
  const drawnNumbers: number[] = [];
  let boardLeft: Board[] = game.boards;

  for (const drawnNumber of game.numbersToDraw) {
    drawnNumbers.push(drawnNumber);
    const newBoardLeft = boardLeft.filter(
      (board) => !isBoardWinning(board, drawnNumbers),
    );
    if (boardLeft.length === 0) throw new Error('No boards left');
    if (boardLeft.length === 1 && newBoardLeft.length === 0) {
      const loosingBoard = boardLeft[0];
      appLogger.log('found loosing board', {
        board: loosingBoard.rows.map((row) => row.join(' ')).join('\n'),
      });
      return calculateScore(loosingBoard, drawnNumbers);
    }

    boardLeft = newBoardLeft;
  }

  throw new Error('Found no loosing board');
};
