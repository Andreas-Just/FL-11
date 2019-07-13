// task 0

const getNumbers = (str) => {
  const regExp = /\d/g;
  const result = [];
  if (regExp.test(str)) {
    for (let item of [...str.match(regExp)]) {
      result.push(+item);
    }
  }
  return result;
};

console.log(getNumbers('string')); // returns []
console.log(getNumbers('n1um3ber95')); // returns [1,3,9,5]
