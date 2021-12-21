import { getInput } from './utils';

/** Gets first generation from lanternfish.txt file */
const FIRST_GEN = getInput(6)
  .split(',')
  .map(n => parseInt(n));

/** Returns the number of fish after a certain number of days */
const countFishAfterDays = (days: number) => {
  /** Set array of fish counts where index = timer value */
  const groups = Array(9).fill(0);
  
  /**
   * Populate first generation by incrementing values
   * at array indices indicated by first gen value
   */
  FIRST_GEN.forEach(f => { groups[f] += 1 });

  /** Loop through each day */
  for (let day = 0; day < days; day += 1) {
    /** Set the number of offspring generated during this day */
    let offspring = 0;
    for (let i = 0; i < groups.length; i += 1) {
      switch(i) {
        /** Timer 6 is where all timer 0 (parents = offspring) and timer 7 will end up */
        case 6:
          groups[i] = offspring + groups[i + 1];
          break;
        /** Timer 8 is where all timer 0 (offspring) will end up */
        case 8:
          groups[i] = offspring;
          break;
        /** Timer 0 represents parents that generate offspring */
        case 0:
          offspring = groups[i]; // Don't break in order to use default behavior for timer 0
        /** Default behavior is for a timer value to be set to the next highest timer count */
        default:
          groups[i] = groups[i + 1];
      }
    }
  }

  /** Return the sum of all values in the groups array as the final count of fish */
  return groups.reduce((p, c) => p + c, 0);
}

console.log(`Part 1: ${countFishAfterDays(80)}`);
console.log(`Part 2: ${countFishAfterDays(256)}`);