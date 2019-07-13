const isInteger = (a) => parseFloat(a) - parseInt(a) === 0;

console.log(isInteger(5.0));
console.log(isInteger(5.000000000000001));
