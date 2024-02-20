import playSound from './monsterSounds/playSound.js';
import spawnMoney from '../hooks/spawnMoney/spawnMoney.js';
const currency = document.querySelector('#currency');

export default function killMonster(amountOfMoney) {
	console.log('killing monster!');

	playSound('death');
	currency.dataset.currency =
		parseInt(currency.dataset.currency) + amountOfMoney;
	setTimeout(() => {
		playSound('dropCoins');
		for (let i = 0; i < amountOfMoney; i++) {
			spawnMoney(i, amountOfMoney);
		}
	}, 100);
}
