const err = 12;
const triangleSides = ['a', 'b', 'c'];
const sidesLengths = {};

for (let index = 0; index < triangleSides.length; index++) {
  const current = +prompt(`Inject length of the party “${triangleSides[index]}” for triangle`, '');

  if (isNaN(current) || !isFinite(current) || current <= 0) {
    alert(`“${current}” - incorrect data. Please press F5 and inject a figure more zero`);
    break;
  } else {
    sidesLengths[triangleSides[index]] = current;
  }
}

if (
  (sidesLengths['a'] + sidesLengths['b']).toFixed(err) <= sidesLengths['c'].toFixed(err) ||
  (sidesLengths['a'] + sidesLengths['c']).toFixed(err) <= sidesLengths['b'].toFixed(err) ||
  (sidesLengths['c'] + sidesLengths['b']).toFixed(err) <= sidesLengths['a'].toFixed(err)
) {
  console.log('Triangle doesn’t exist');
} else if (
  sidesLengths['a'] === sidesLengths['b'] &&
  sidesLengths['b'] === sidesLengths['c']
) {
  console.log('Eequivalent triangle');
} else if (
  sidesLengths['a'] === sidesLengths['b'] ||
  sidesLengths['b'] === sidesLengths['c'] ||
  sidesLengths['c'] === sidesLengths['a']
) {
  console.log('Isosceles triangle');
} else {
  console.log('Normal triangle');
}
