import respawnMonster from './respawnMonster.js';

export default function damageMonster(rocketDamage) {
	const monsterHtmlElement = document.querySelector('#monster');
	const healthBar = document.querySelector('#monster-inner-health');

	const currentMonsterHealth =
		parseInt(monsterHtmlElement.dataset.health, 10) || 0;

	const newMonsterHealth = Math.max(0, currentMonsterHealth - rocketDamage);

	monsterHtmlElement.dataset.health = newMonsterHealth;

	updateHealthBar(newMonsterHealth, healthBar);

	monsterHtmlElement.classList.add('damaged');
	setTimeout(() => {
		monsterHtmlElement.className = '';
	}, 200);
}

function updateHealthBar(health, healthBar) {
	if (health <= 0) {
		return respawnMonster();
	}
	const maxWidth = 100;
	const widthPercentage = (health / 100) * 100;

	healthBar.style.width = `${Math.min(maxWidth, widthPercentage)}%`;
	healthBar.style.transition = 'width 0.5s ease';
}
