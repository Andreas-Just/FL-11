function getMin() {
  return Math.min.apply(null, arguments);
}

console.log(getMin(5, 2, 12, -2, 40, -15, 0));
