/**
 * 2021-12-16 Part 2
 */
const { getBits, parsePackets } = require('./shared');

const evaluate = (packet) => {
  switch(packet.type) {
    case 0: /** sum */
      return packet.packets.reduce((p, c) => p + evaluate(c), 0);
    case 1: /** product */
      return packet.packets.reduce((p, c) => p * evaluate(c), 1);
    case 2: /** minimum */
      return Math.min(...packet.packets.map(p => evaluate(p)));
    case 3: /** maximum */
      return Math.max(...packet.packets.map(p => evaluate(p)));
    case 4: /** literal */
      return packet.literal;
    case 5: /** greater than */
      const [gtLh, gtRh] = packet.packets.map(p => evaluate(p));
      return gtLh > gtRh ? 1 : 0;
    case 6: /** less than */
      const [ltLh, ltRh] = packet.packets.map(p => evaluate(p));
      return ltLh < ltRh ? 1 : 0;
    case 7: /** equal to */
      const [eqLh, eqRh] = packet.packets.map(p => evaluate(p));
      return eqLh === eqRh ? 1 : 0;
  }
};

getBits().then(bits => {
  const packets = parsePackets(bits);
  const result = evaluate(packets[0]);

  console.log(`Answer: ${result}`);
});