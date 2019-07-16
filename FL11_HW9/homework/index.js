const numbers = {
  two: 2,
  three: 3,
  five: 5,
  eight: 8,
  twentyFour: 24,
  sixty: 60,
  thousand: 1000
};

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
console.log(getNumbers('string'));
console.log(getNumbers('n1um3ber95'));

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
console.log(
  findTypes('number', null, numbers.five, getNumbers('um3ber95')[1], {})
);
console.log(
  findTypes(getNumbers('string'), numbers.five, 'hello', [], getNumbers)
);

// task 2
const executeforEach = (arr, callback) => {
  for (let item of arr) {
    callback(item);
  }
};
executeforEach(
  [1, numbers.two, numbers.three],
  (el) => console.log(el)
);

// task 3
const mapArray = (arr, callback) => {
  const result = [];
  executeforEach(arr,el => result.push(callback(el)));
  return result;
};
console.log(
  mapArray(
    [numbers.two, numbers.five, numbers.eight],
    el => el + numbers.three
  )
);

// task 4
const filterArray = (arr, callback) => {
  let result = [];
  executeforEach(arr,el => callback(el) ? result.push(el) : null);
  return result;
};
console.log(
  filterArray(
    [numbers.two, numbers.five, numbers.eight],
    el => el > numbers.three
  )
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
console.log(canConvertToDate('2016-13-18T00:00:00'));
console.log(canConvertToDate('2016-03-18T00:00:00'));

// task 7
const daysBetween = (dateBefore, dateAfter) => {
  const diff = Math.abs(dateAfter - dateBefore);
  const day = numbers.thousand * numbers.sixty * numbers.sixty * numbers.twentyFour;
  return Math.ceil( diff / day);
};
console.log(
  daysBetween(
    new Date('2016-03-18T00:00:00'),
    new Date('2016-04-19T00:00:00')
  )
);

// task 8
const person = [
  {
    '_id': '5b5e3168c6bf40f2c1235cd6',
    'index': 0,
    'birthday': '2016-03-18T00:00:00',
    'eyeColor': 'green',
    'name': 'Stein',
    'favoriteFruit': 'apple'
  },
  {
    '_id': '5b5e3168e328c0d72e4f27d8',
    'index': 1,
    'birthday': '1991-02-11T00:00:00',
    'eyeColor': 'blue',
    'name': 'Cortez',
    'favoriteFruit': 'strawberry'
  },
  {
    '_id': '5b5e3168cc79132b631c666a',
    'index': 2,
    'birthday': '1984-04-17T00:00:00',
    'eyeColor': 'blue',
    'name': 'Suzette',
    'favoriteFruit': 'apple'
  },
  {
    '_id': '5b5e31682093adcc6cd0dde5',
    'index': 3,
    'birthday': '1994-04-17T00:00:00',
    'eyeColor': 'green',
    'name': 'George',
    'favoriteFruit': 'banana'
  }
];

const getAmountOfAdultPeople = (arr) => {
  const years18InDays = 6574;
  return filterArray(arr, item =>
    daysBetween(new Date(item.birthday), new Date()) > years18InDays
  ).length;
};
console.log(getAmountOfAdultPeople(person));

// task 9
const keys = (obj) => {
  const result = [];
  for (let item in obj) {
    if (obj.hasOwnProperty(item)) {
      result.push(item);
    }
  }
  return result;
};
console.log(keys(numbers));

// task 10
const values = (obj) => {
  const result = [];
  for (let item in obj) {
    if (obj.hasOwnProperty(item)) {
      result.push(obj[item]);
    }
  }
  return result;
};
console.log(values(numbers));