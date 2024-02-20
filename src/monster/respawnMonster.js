const monster = document.querySelector('#monster');
const healthBar = document.querySelector('#monster-inner-health');

export default function respawnMonster() {
	monster.dataset.health = 100;
	healthBar.style.width = `100%`;
}
