function getMin() {
  const sorted = [...arguments]
    .map(
      function() {
        return this.splice(this.indexOf(Math.min(...this)), 1)[0];
      },
      [...arguments].slice()
    );

  return sorted[0];
}

console.log(getMin(5, 2, 12, -2, 40, -15, 0));
