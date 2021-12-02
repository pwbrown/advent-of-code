const { createReadStream } = require('fs');
const { join } = require('path');
const { createInterface } = require('readline');

/** 
 * Read series of commands to any array of arrays
 * where each array contains a direction and an integer
 */
exports.readCommandsToArray = () => new Promise(res => {
  const file = join(__dirname, 'commands.txt');
  const read = createReadStream(file, { encoding: 'utf-8' });
  const rl = createInterface(read);
  
  const commands = [];
  rl.on('line', (command) => {
    if (!command) return;
    const [direction, value] = command.split(' ');
    commands.push([direction, parseInt(value)]);
  });
  
  rl.on('close', () => res(commands));
});