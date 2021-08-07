const Enemy = require('../lib/Enemy.js');
const Potion = require('../lib/Potion.js');

jest.mock('../lib/Potion.js');

test('creates an enemy object', () => {
  const enemy = new Enemy('goblin', 'sword');

  expect(enemy.name).toBe('goblin');
  expect(enemy.weapon).toBe('sword');
  expect(enemy.health).toEqual(expect.any(Number));
  expect(enemy.strength).toEqual(expect.any(Number));
  expect(enemy.agility).toEqual(expect.any(Number));
  expect(enemy.potion).toEqual(expect.any(Object));
});

test("gets enemy's health value", () => {
  const enemy = new Enemy('goblin', 'sword');

  expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
});

test('checks if enemy is alive or not', () => {
  const enemy = new Enemy('goblin', 'sword');

  expect(enemy.isAlive()).toBeTruthy();

  enemy.health = 0;

  expect(enemy.isAlive()).toBeFalsy();
});

test("gets enemy's attack value", () => {
  const enemy = new Enemy('goblin', 'sword');
  enemy.strength = 10;

  expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
  expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});

test("subtracts from enemy's health", () => {
  const enemy = new Enemy('goblin', 'sword');
  const oldHealth = enemy.health;

  enemy.reduceHealth(5);

  expect(enemy.health).toBe(oldHealth - 5);

  enemy.reduceHealth(99999);

  expect(enemy.health).toBe(0);
});

test('gets a description of the enemy', () => {
  const enemy = new Enemy('goblin', 'sword');

  expect(enemy.getDescription()).toEqual(expect.stringContaining('goblin'));
  expect(enemy.getDescription()).toEqual(expect.stringContaining('sword'));
});

Enemy.prototype.getHealth = function() {
  return `The ${this.name}'s health is now ${this.health}!`;
};

Enemy.prototype.isAlive = function() {
  if (this.health === 0) {
    return false;
  }
  return true;
};

Enemy.prototype.getAttackValue = function() {
  const min = this.strength - 5;
  const max = this.strength + 5;

  return Math.floor(Math.random() * (max - min) + min);
};

Enemy.prototype.reduceHealth = function(health) {
  this.health -= health;

  if (this.health < 0) {
    this.health = 0;
  }
};

Enemy.prototype.getDescription = function() {
  return `A ${this.name} holding a ${this.weapon} has appeared!`;
};
