class Fighter {
  constructor(element) {
    this._el = element;
    this._initiallyHP = this._el.hp;
    this._wins = 0;
    this._losses = 0;
  }
  getName() {
    return this._el.name;
  }
  getDamage() {
    return this._el.damage;
  }
  getHealth() {
    return this._el.hp;
  }
  getAgility() {
    return this._el.agility;
  }
  attack(fighter) {
    const maxLikeliness = 100;
    const likeliness = maxLikeliness - fighter.getAgility();
    const chanceAttack = Math.round(Math.random() * maxLikeliness);

    if (chanceAttack <= likeliness) {
      fighter.dealDamage(this.getDamage());
      console.log(
        `${this.getName()} make ${this.getDamage()} damage to ${fighter.getName()}`
      );
    } else {
      console.log(`${this.getName()} attack missed`);
    }
  }
  logCombatHistory() {
    console.log(
      `Name: ${this._el.name}, Wins: ${this._wins}, Losses: ${this._losses}`
    );
  }
  heal(hp) {
    if (this._el.hp + hp > this._initiallyHP) {
      this._el.hp = this._initiallyHP;
    } else {
      this._el.hp += hp;
    }
    return this._el.hp;
  }
  dealDamage(hp) {
    if (this._el.hp - hp < 0) {
      this._el.hp = 0;
    } else {
      this._el.hp -= hp;
    }
    return this._el.hp;
  }
  addWin() {
    return this._wins++;
  }
  addLoss() {
    return this._losses++;
  }

}

const battle = (fighter1, fighter2) => {
  if (!fighter1.getHealth() || !fighter2.getHealth()) {
    const nameOfDead = !fighter1.getHealth()
      ? fighter1.getName()
      : fighter2.getName();
    return console.log(`${nameOfDead} is dead and can't fight`);
  }

  while (fighter1.getHealth() > 0 && fighter2.getHealth() > 0) {
    fighter1.getHealth() > 0 ? fighter1.attack(fighter2) : null;
    fighter2.getHealth() > 0 ? fighter2.attack(fighter1) : null;
  }

  fighter1.getHealth() > 0 ? fighter1.addWin() : fighter1.addLoss();
  fighter2.getHealth() > 0 ? fighter2.addWin() : fighter2.addLoss();
};

const john = new Fighter(
  {name: 'John', damage: 20, agility: 25, hp: 100}
);
const jim = new Fighter(
  {name: 'Jim', damage: 10, agility: 40, hp: 120}
);

battle(john, jim);
john.logCombatHistory();
jim.logCombatHistory();

const magicNumberHP = {oneHundredThirty: 130, fifty: 50};
john.heal(magicNumberHP.fifty);
jim.heal(magicNumberHP.oneHundredThirty);
console.log(`John HP: ${john.getHealth()}, Jim HP: ${jim.getHealth()}`);

battle(john, jim);
john.logCombatHistory();
jim.logCombatHistory();
