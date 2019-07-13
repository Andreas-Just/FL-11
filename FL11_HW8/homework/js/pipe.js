const addOne = x => x + 1;

function pipe(num) {
  const [, ...callbacks] = arguments;

  return [...callbacks].reduce((acc, curr) => curr(acc), num);
}

console.log(pipe(1, addOne, addOne));
