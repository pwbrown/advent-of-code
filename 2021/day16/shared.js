const { readLines } = require('../utils');

exports.getBits = () => readLines('bits.txt').then(input => {
  return input[0]
    .split('')
    .reduce((p, c) => {
      const bits = parseInt(c, 16).toString(2).padStart(4, '0');
      return p + bits;
    }, '');
});

const parsePacket = (string) => {
  let packet;
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

const parsePackets = exports.parsePackets = (string) => {
  const packets = [];
  while(string) {
    const [newString, packet] = parsePacket(string);
    packets.push(packet);
    string = newString;
  }

  return packets;
};