const { readLines } = require('../utils');

/** 
 * Read series of commands to any array of arrays
 * where each array contains a direction and an integer
 */
exports.readCommands = () => readLines('day2/commands.txt', ['str', 'num']);