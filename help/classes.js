
function createEnemy(health, damage) {
    return {
        health: health,
        damage: damage,
        attack: function (player) {
            player.health -= this.damage;
        },
        hit: function (damage) {
            this.health -= damage;
        },
    };
}

class Enemy {

    static count = 0;

    constructor(health, damage) {
        // let this = {};
        this.health = health;
        this.damage = damage;
        Enemy.count += 1;
        // return this;
    }

    attack(player) {
        player.health -= this.damage;
    }

    hit(damage) {
        this.health -= damage;
    }

    static getCount() {
        return this.count;
    }
}

let enemy1 = new Enemy(20, 5);
let enemy2 = new Enemy(25, 5);
let enemy3 = new Enemy(10, 3);

console.log(enemy1.health);

enemy1.hit(5);

console.log(enemy1.health);

enemy3.attack(enemy1);

console.log(enemy1.health);

console.log('count', Enemy.getCount());
console.log('count', Enemy.count);