const father = {
  firstName: 'Nick',
  lastName: 'Hrynko',

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  },
};

/*
User.prototype = father;
function User(name) {
  // this = {};
  // this.__proto__ = father;

  this.firstName = name;
  // return this;
}

class User {
  constructor(name) {
    // this = {};
    this.firstName = name;
    this.__proto__ = father;
    // return this;
  }
}
*/

class User2 {
  constructor(name) {
    //  this.__proto__ = father;
    this.firstName = name;
    // Object.setPrototypeOf(this, father);
  }
  sayHi() {}
}
Object.setPrototypeOf(User2.prototype, father);

const me = new User2('Misha');
console.log(me);