import addMoney from './addMoney.js';

const mainHtmlElement = document.querySelector('main');
const monsterHitbox = document.querySelector('#monster-hitbox');
const currencyHtmlElement = document.querySelector('.currency-icon');

let monsterHitboxPosition = monsterHitbox.getBoundingClientRect();
let currencyPosition = currencyHtmlElement.getBoundingClientRect();

let coinFinalDestination = {
	x: currencyPosition.left,
	y: currencyPosition.top + currencyHtmlElement.clientHeight,
};

function randomOffset() {
	return (Math.random() * 200) | 0;
}

export default function spawnMoney(iteration, amountOfMoney) {
	let fromCoordinates = {
		x: monsterHitboxPosition.x + randomOffset(),
		y: monsterHitboxPosition.y - 80 - randomOffset(),
	};

	//creating coin
	let coinElement = document.createElement('div');
	coinElement.className = 'coin';
	mainHtmlElement.appendChild(coinElement);

	//coin styles
	coinElement.style.left = `${fromCoordinates.x}px`;
	coinElement.style.top = `${fromCoordinates.y}px`;

	//keyframes
	const styleElement = document.createElement('style');
	styleElement.appendChild(
		document.createTextNode(`
        @keyframes coin {
            to {
                transform: translate(${
									coinFinalDestination.x - fromCoordinates.x
								}px, ${coinFinalDestination.y - fromCoordinates.y - 110}px)
            }
        }
        `)
	);

	document.head.appendChild(styleElement);

	coinElement.style.animation = `coin 0.8s linear forwards`;

	coinElement.addEventListener('animationend', () => {
		coinElement.remove();
		styleElement.remove();
		if (iteration == 0) {
			addMoney(amountOfMoney);
		}
	});
}
