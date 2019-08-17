const err = 12;
const triangleSides = ['a', 'b', 'c'];
const sidesLengths = {};
const objectLength = 3;
const findElement = (selectorElement, searchArea) => {
  return searchArea.querySelector(`${selectorElement}`);
};
let addText = findElement('.code', document);

for (let index = 0; index < triangleSides.length; index++) {
  const current = +prompt(`Inject length of the party “${triangleSides[index]}” for triangle`, '');

  if (isNaN(current) || !isFinite(current) || current <= 0) {
    alert(`“${current}” - incorrect data. Please press F5 and inject a figure more zero`);
    break;
  } else {
    sidesLengths[triangleSides[index]] = current;
  }
}

if (Object.keys(sidesLengths).length === objectLength) {
  if (
    (sidesLengths['a'] + sidesLengths['b']).toFixed(err) <= sidesLengths['c'].toFixed(err) ||
    (sidesLengths['a'] + sidesLengths['c']).toFixed(err) <= sidesLengths['b'].toFixed(err) ||
    (sidesLengths['c'] + sidesLengths['b']).toFixed(err) <= sidesLengths['a'].toFixed(err)
  ) {
    addText.innerText = 'Triangle doesn’t exist';
    console.log('Triangle doesn’t exist');
  } else if (
    sidesLengths['a'] === sidesLengths['b'] &&
    sidesLengths['b'] === sidesLengths['c']
  ) {
    addText.innerText = 'Eequivalent triangle';
    console.log('Eequivalent triangle');
  } else if (
    sidesLengths['a'] === sidesLengths['b'] ||
    sidesLengths['b'] === sidesLengths['c'] ||
    sidesLengths['c'] === sidesLengths['a']
  ) {
    addText.innerText = 'Isosceles triangle';
    console.log('Isosceles triangle');
  } else {
    addText.innerText = 'Normal triangle';
    console.log('Normal triangle');
  }
}
