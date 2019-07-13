const addOne = x => x + 1;
const pipe = (num, ...args) => [...args].reduce((acc, curr) => curr(acc), num);

console.log(pipe(1, addOne, addOne));
