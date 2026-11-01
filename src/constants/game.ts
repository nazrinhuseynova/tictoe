export type Player = "X" | "O";

export type Cell = Player | null;

export type Scores = {
  X: number;
  O: number;
  draw: number;
};

export const WINNING_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const calculateWinner = (board: Cell[]) => {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const first = board[a];
    if (first && first === board[b] && first === board[c]) {
      return { player: first, line };
    }
  }
  return null;
};