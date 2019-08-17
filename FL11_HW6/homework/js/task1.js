const coordNames = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
const coord = {};
const err = 0.0000000001;
const findElement = (selectorElement, searchArea) => {
  return searchArea.querySelector(`${selectorElement}`);
};
let addText = findElement('.code', document);

for (let index = 0; index < coordNames.length; index++) {
  const current = prompt(`Input the coordinate ${coordNames[index]}: `, '');

  if (isNaN(+current) || !isFinite(+current) || current === null || current === '') {
    alert(`“${current}” - it is not figure, please press F5 and inject a figure`);
    break;
  } else {
    coord[coordNames[index]] = +current;
  }
}

let result = Math.abs(coord['a1'] + coord['b1'] - coord['c1'] - coord['c1']) < err &&
  Math.abs(coord['a2'] + coord['b2'] - coord['c2'] - coord['c2']) < err;

addText.innerText = `${result}`;
