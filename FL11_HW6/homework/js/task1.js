const coordNames = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
const coord = {};
const err = 0.0000000001;


for (let index = 0; index < coordNames.length; index++) {
  const current = prompt(`Input the coordinate ${coordNames[index]}: `, '');

  if (isNaN(+current) || !isFinite(+current) || current === null || current === '') {
    alert(`«${current}» - it is not number, please press F5 and enter number`);
    break;
  } else {
    coord[coordNames[index]] = +current;
  }
}

console.log(
  Math.abs(coord['a1'] + coord['b1'] - coord['c1'] - coord['c1']) < err &&
  Math.abs(coord['a2'] + coord['b2'] - coord['c2'] - coord['c2']) < err
);



