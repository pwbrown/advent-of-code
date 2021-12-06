/**
 * 2021-12-04 Part 2
 */
 const { getBingoGame, markBoard } = require('./shared');

 getBingoGame().then(({ numbers, boards }) => {
   for (let i = 0; i < numbers.length; i += 1) {
     /** Last remaining board: Keep marking it until it wins */
     if (boards.length === 1) {
       const { answer, won } = markBoard(boards[0], numbers[i]);
       if (won) {
         console.log(`Answer: ${answer}`);
         process.exit();
       }
     } else {
       /** Filter boards until only 1 remains */
       boards = boards.filter(b => !markBoard(b, numbers[i]).won);
     }
   }
 });
 