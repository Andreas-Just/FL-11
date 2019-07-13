const reverseNumber = (num) => {
  const sign = num < 0 ? -1 : 1;
  let result = 0;
  num = Math.abs(num);

  while(num > 0){
    result = 10 * result + num % 10;
    num = Math.floor(num / 10);
  }
  return result * sign;
};

console.log(reverseNumber(123));
console.log(reverseNumber(-456));
console.log(reverseNumber(1000));
