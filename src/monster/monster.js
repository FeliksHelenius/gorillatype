import spawnMoney from '../hooks/spawnMoney/spawnMoney.js';
import userData from '../userData/userData.js';
import playSound from './monsterSounds/playSound.js';
//html elements
const monsterContainer = document.querySelector('.monster-container');

const monsterTypeData = {
	easy: {
		health: 300,
		coins: 2,
		svg: './src/assets/fairy.svg',
		width: '3.7rem',
		height: '10rem',
	},
	normal: {
		health: 1000,
		coins: 10,
		svg: './src/assets/monster.svg',
		width: '10rem',
		heigth: '10rem',
	},
	hard: {
		health: 2000,
		coins: 25,
		svg: './src/assets/devil.svg',
		width: '4rem',
		height: '10rem',
	},
};

class _Monster {
	health;
	maxHealth;
	coins;
	type; //or difficulty
	//html elements
	monsterHtmlElement;
	healthBarHtmlElement;

	constructor(type) {
		switch (type) {
			case 'easy':
				this.health = this.maxHealth = monsterTypeData.easy.health;
				this.coins = monsterTypeData.easy.coins;
				break;
			case 'normal':
				this.health = this.maxHealth = monsterTypeData.normal.health;
				this.coins = monsterTypeData.normal.coins;
				break;
			case 'hard': {
				this.health = this.maxHealth = monsterTypeData.hard.health;
				this.coins = monsterTypeData.hard.coins;
			}
		}
		this.type = type;
		this.createMonsterHtmlElement();
	}

	updateHealthBar() {
		const maxWidth = 100;
		const widthPercentage = (this.health / this.maxHealth) * 100;

		this.healthBarHtmlElement.childNodes[0].style.width = `${Math.min(
			maxWidth,
			widthPercentage
		)}%`;
		this.healthBarHtmlElement.style.transition = 'width 0.1s ease-out';
	}

	damageMonster(rocketDamage) {
		this.health = Math.max(0, this.health - Math.round(rocketDamage)); // updating health

		//damaging
		playSound('damage');
		this.monsterHtmlElement.classList.add('damaged');
		setTimeout(() => {
			this.monsterHtmlElement.classList.remove('damaged');
		}, 200);
		//respawning monster
		if (this.health == 0) {
			return this.respawnMonster();
		}
		console.log(
			`rocketdamage: ${rocketDamage}, health: ${this.health}, maxHealth: ${this.maxHealth}`
		);

		//update healthbar
		this.updateHealthBar();
	}

	killMonster() {
		playSound('death');

		updateUserData(_userData.currency + this.coins);

		this.monsterHtmlElement.classList.add('monster-death');

		this.monsterHtmlElement.addEventListener('animationend', () => {
			this.monsterHtmlElement.classList.remove('monster-death');
		});

		setTimeout(() => {
			playSound('dropCoins');

			for (let i = 0; i < this.coins; i++) {
				spawnMoney(i, this.coins);
			}
		}, 100);
	}

	respawnMonster(failedToKill) {
		if (failedToKill != true) {
			this.killMonster();
		}
		this.health = this.maxHealth;
		this.updateHealthBar();
	}

	createMonsterHtmlElement() {
		this.monsterHtmlElement = document.createElement('div');
		this.healthBarHtmlElement = document.createElement('div');

		let monsterHitbox = document.createElement('div');
		let monsterInnerHealth = document.createElement('div');

		//styles

		this.monsterHtmlElement.style.backgroundImage = `url(${
			monsterTypeData[this.type].svg
		})`;
		this.monsterHtmlElement.style.width = monsterTypeData[this.type].width;
		this.monsterHtmlElement.style.height = monsterTypeData[this.type].height;
		this.healthBarHtmlElement.style.width = `${this.maxHealth / 3}px`;

		this.healthBarHtmlElement.dataset.health = `${this.health}/${this.maxHealth}`;

		//classnames and ids
		this.monsterHtmlElement.id = 'monster';
		monsterHitbox.id = 'monster-hitbox';

		this.healthBarHtmlElement.id = 'monster-health';
		monsterInnerHealth.id = 'monster-inner-health';

		//appending children
		this.monsterHtmlElement.appendChild(monsterHitbox);
		this.healthBarHtmlElement.appendChild(monsterInnerHealth);

		//appending to parent
		monsterContainer.appendChild(this.monsterHtmlElement);
		monsterContainer.appendChild(this.healthBarHtmlElement);
	}
	removeMonsterHtmlElement() {
		this.monsterHtmlElement.remove();
		this.healthBarHtmlElement.remove();
	}
}

//the main function of monster.js
let [_userData, updateUserData] = userData();

let monster = false;

export default function Monster(action) {
	switch (action) {
		case 'create':
			if (monster) return; //if there already is a monster;
			return (monster = new _Monster(_userData.currentMonster));
		case 'get':
			return monster;
		case 'remove':
			if (!monster) return;
			monster.removeMonsterHtmlElement();
			monster = false;
	}

	return monster;
}
