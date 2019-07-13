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

// task 1


// task 2
function executeforEach(arr, callback) {
  for (let item of arr) {
    callback(item);
  }
}

executeforEach([1,2,3], function(el) { console.log(el) });