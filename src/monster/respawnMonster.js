import killMonster from './killMonster.js';

const monster = document.querySelector('#monster');
const healthBar = document.querySelector('#monster-inner-health');

export default function respawnMonster(reset) {
	const monsterCoins = monster.dataset.coins;
	if (reset != true) killMonster(parseInt(monsterCoins));
	monster.dataset.health = 1000;
	healthBar.style.width = `100%`;
}
