import { getInput } from './utils';

interface Literal {
  version: number;
  type: 4;
  literal: number;
}

interface Operator {
  version: number;
  type: number;
  packets: Packet[];
}

type Packet = Literal | Operator;

const parsePacket = (string: string): [string, Packet] => {
  let packet: Packet;
  const version = parseInt(string.slice(0, 3), 2);
  const type = parseInt(string.slice(3, 6), 2);
  string = string.slice(6);
  /** parse literal */
  if (type === 4) {
    let literal = '';
    while(true) {
      let flag = string[0];
      literal += string.slice(1, 5);
      string = string.slice(5);
      if (flag === '0') break;
    }
    packet = {
      version,
      type,
      literal: parseInt(literal, 2),
    };
  } else {
    const lengthType = string[0];
    string = string.slice(1);
    let length = 0;
    if (lengthType === '0') {
      length = parseInt(string.slice(0, 15), 2);
      string = string.slice(15);
      packet = {
        version,
        type,
        packets: parsePackets(string.slice(0, length)),
      }
      string = string.slice(length);
    } else {
      length = parseInt(string.slice(0, 11), 2);
      string = string.slice(11);
      packet = {
        version,
        type,
        packets: [],
      };
      for (let i = 0; i < length; i += 1) {
        const [newString, newPacket] = parsePacket(string);
        packet.packets.push(newPacket);
        string = newString;
      }
    }
  }

  if (!/1/.test(string)) {
    string = '';
  }

  return [string, packet];
}

const parsePackets = (string: string): Packet[] => {
  const packets = [];
  while(string) {
    const [newString, packet] = parsePacket(string);
    packets.push(packet);
    string = newString;
  }

  return packets;
};

const evaluate = (packet: Packet): number => {
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
      return (packet as Literal).literal;
    case 5: /** greater than */
      const [gtLh, gtRh] = packet.packets.map(p => evaluate(p));
      return gtLh > gtRh ? 1 : 0;
    case 6: /** less than */
      const [ltLh, ltRh] = packet.packets.map(p => evaluate(p));
      return ltLh < ltRh ? 1 : 0;
    case 7: /** equal to */
      const [eqLh, eqRh] = packet.packets.map(p => evaluate(p));
      return eqLh === eqRh ? 1 : 0;
    default:
      return 0;
  }
};

const sumVersions = (packets: Packet[]) => {
  let count = 0;
  packets.forEach(packet => {
    count += packet.version;
    if ((packet as Operator).packets) {
      count += sumVersions((packet as Operator).packets);
    }
  });
  return count;
}

/** Turns hex input into a string of binary digits */
const bits = getInput(16)
  .split('')
  .reduce((p, c) => {
    const bits = parseInt(c, 16).toString(2).padStart(4, '0');
    return p + bits;
  }, '');

const packets = parsePackets(bits);
const versionSum = sumVersions(packets);

console.log(`Part 1: ${versionSum}`);
console.log(`Part 2: ${evaluate(packets[0])}`);