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
const executeforEach = (arr, callback) => {
  for (let item of arr) {
    callback(item);
  }
};

executeforEach([1, 2, 3], function(el) {
  console.log(el)
}); // logs 1 2 3

// task 3
const mapArray = (arr, callback) => {
  const result = [];
  executeforEach(arr,el => result.push(callback(el)));
  return result;
};

console.log(
  mapArray([2, 5, 8], el => el + 3) // returns [5, 8, 11]
);

// task 4
const filterArray = (arr, callback) => {
  let result = [];
  executeforEach(arr,el => callback(el) ? result.push(el) : null);
  return result;
};

console.log(
  filterArray([2, 5, 8], el => el > 3) // returns [5, 8]
);