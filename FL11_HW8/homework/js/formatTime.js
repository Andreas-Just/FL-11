const units = new Map([
  ['day', 24 * 60],
  ['hour', 60],
  ['minute', 1]
]);

const formatTime = (min) => {
  let result = '';

  units.forEach( (value, key) => {
    const time = Math.floor(min / value);
    result += ' ' + time + ' ' + key + '(s)';
    min %= value;
  });
  return result;
};

console.log(formatTime(120));
console.log(formatTime(59));
console.log(formatTime(3601));
