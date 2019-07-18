const User = (() => {
  let role = 'user1';

  return class {
    name = 'Andre';

    test() {
      console.log(role);
    }
  };
})();

const andre = new User();
andre.test();
console.log(andre.name);
console.log(andre.role);

// variant 2
const factoryFromMisha = () => {
  let role = 'user2';

  return class {
    name = 'Misha';

    test() {
      console.log(role);
    }
  };
};

const User2 = factoryFromMisha();
const misha = new User2();

misha.test();
console.log(misha.name);
console.log(misha.role);


