/**
 * 2021-12-16 Part 1
 */
const { getBits, parsePackets } = require('./shared');

const countVersions = (packets) => {
  let count = 0;
  packets.forEach(packet => {
    count += packet.version;
    if (packet.packets) count += countVersions(packet.packets);
  });
  return count;
}

getBits().then(bits => {
  const packets = parsePackets(bits);
  const count = countVersions(packets);

  console.log(`Answer: ${count}`);
});