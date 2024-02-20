import respawnMonster from './respawnMonster.js';
import playSound from './monsterSounds/playSound.js';

export default function damageMonster(rocketDamage) {
	const monsterHtmlElement = document.querySelector('#monster');
	const healthBar = document.querySelector('#monster-inner-health');

	let currentMonsterHealth =
		parseInt(monsterHtmlElement.dataset.health, 10) || 0;

	const newMonsterHealth = Math.max(
		0,
		currentMonsterHealth - Math.round(rocketDamage)
	);

	monsterHtmlElement.dataset.health = newMonsterHealth;

	updateHealthBar(newMonsterHealth, healthBar);

	playSound('damage');
	monsterHtmlElement.classList.add('damaged');
	setTimeout(() => {
		monsterHtmlElement.classList.remove('damaged');
	}, 200);
}

function updateHealthBar(health, healthBar) {
	if (health == 0) {
		return respawnMonster();
	}
	const maxWidth = 100;
	const widthPercentage = (health / 1000) * 100;

	healthBar.style.width = `${Math.min(maxWidth, widthPercentage)}%`;
	healthBar.style.transition = 'width 0.1s ease';
}
