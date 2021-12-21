import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export const DATA_PATH = join(__dirname, 'data');

/** Get raw string contents from an input file by day number */
export const getInput = (day: number) => {
  const file = join(DATA_PATH, `${day}.txt`);
  if (!existsSync(file)) {
    throw new Error('Input file does not exist');
  }
  const contents = readFileSync(file, { encoding: 'utf-8' });

  return contents;
}

/** Get all points around a single point in a grid */
export const around = (grid: any[][], row: number, col: number, corners = false) => {
  const points = [];
  const minRow = Math.max(row - 1, 0);
  const maxRow = Math.min(row + 1, grid.length - 1);
  const minCol = Math.max(col - 1, 0);
  const maxCol = Math.min(col + 1, grid[0].length - 1);
  for (let r = minRow; r <= maxRow; r += 1) {
    for (let c = minCol; c <= maxCol; c += 1) {
      /** Ignore center */
      if (r === row && c === col) {
        continue;
      }
      /** Ignore corners */
      if (!corners && r !== row && c !== col) {
        continue;
      }
      points.push({
        row: r,
        col: c,
        val: grid[r][c],
      });
    }
  }
  return points;
}