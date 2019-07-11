function isInteger(a) {
  return Math.abs(parseFloat(a) - parseInt(a)) < 0.0000000000000001;
}

console.log(isInteger(5.000000000000001));
