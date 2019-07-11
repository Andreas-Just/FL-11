function reverseNumber(num) {
  let result = num < 0 ? '-' : '';
  num = Math.abs(num);

  while(num > 0){
    result = result + (num % 10);
    num = parseInt(num / 10);
  }

  return +result;
}

console.log(reverseNumber(123));
console.log(reverseNumber(-456));
console.log(reverseNumber(1000));
