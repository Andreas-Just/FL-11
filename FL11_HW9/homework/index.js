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
const findTypes = (...args) => {
  const result = {};
  for (let item of args) {
    item = typeof item;
    if (!result.hasOwnProperty(item)) {
      result[item] = 1;
    } else {
      result[item]++;
    }
  }
  return result;
};

console.log(findTypes('number', 5, 5, {}));
console.log(findTypes(null, 5, 'hello', [], getNumbers));



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

// task 5
const showFormattedDate = (date) => {
  const variant = {day: '2-digit', month: 'short'};
  const dateFormat = date.toLocaleDateString('en-US', variant);
  return `'Date: ${dateFormat} ${date.getFullYear()}'`;
};

console.log(showFormattedDate(new Date('2019-01-27T01:10:00')));
console.log(showFormattedDate(new Date('2019-02-29T01:10:00')));

// task 6
const canConvertToDate = (str) => {
  return !isNaN(Date.parse(str));
};

console.log(canConvertToDate('2016-13-18T00:00:00')); // false
console.log(canConvertToDate('2016-03-18T00:00:00')); // true

// task 7
const daysBetween = (dateBefore, dateAfter) => {
  const diff = Math.abs(dateAfter - dateBefore);
  const day = 1000 * 60 * 60 * 24;
  return Math.ceil( diff / day);
};

console.log(
  daysBetween(new Date('2016-03-18T00:00:00'), new Date('2016-04-19T00:00:00'))
); // 32

