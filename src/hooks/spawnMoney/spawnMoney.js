import addMoney from './addMoney.js';
import Monster from '../../monster/monster.js';
const mainHtmlElement = document.querySelector('main');
const currencyHtmlElement = document.querySelector('.currency-icon');

export default function spawnMoney(iteration, amountOfMoney) {
	let monster = Monster('get');
	if (!monster) return;

	const monsterHitbox = document.querySelector('#monster-hitbox');

	// Recalculate positions within the function
	let monsterHitboxPosition = monsterHitbox.getBoundingClientRect();
	let currencyPosition = currencyHtmlElement.getBoundingClientRect();

	let coinFinalDestination = {
		x: currencyPosition.left,
		y: currencyPosition.top + currencyHtmlElement.clientHeight,
	};

	let fromCoordinates = {
		x: monsterHitboxPosition.x,
		y: monsterHitboxPosition.y,
	};

	// creating coin
	let coinElement = document.createElement('div');
	coinElement.className = 'coin';
	mainHtmlElement.appendChild(coinElement);

	// coin styles
	coinElement.style.left = `${fromCoordinates.x}px`;
	coinElement.style.top = `${fromCoordinates.y}px`;

	// keyframes
	const styleElement = document.createElement('style');
	styleElement.appendChild(
		document.createTextNode(`
        @keyframes coinAnimation {
            to {
                transform: translate(${
									coinFinalDestination.x - fromCoordinates.x
								}px, ${coinFinalDestination.y - fromCoordinates.y - 110}px);
            }
        }
        `)
	);

	document.head.appendChild(styleElement);

	// Apply the shared keyframe animation to all coins
	coinElement.style.animation = 'coinAnimation 0.8s linear forwards';
	coinElement.style.animationDelay = `${iteration * 50}ms`;

	coinElement.addEventListener('animationend', () => {
		coinElement.remove();
		styleElement.remove();

		addMoney(1); // 1 coin is worth 1 gold. in the future: maybe amountOfMoney/amountOfMoney?? but this is stupid...
	});
}
