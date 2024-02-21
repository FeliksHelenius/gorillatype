import Monster from '../monster/monster.js';
//html elements
const mainHtmlElement = document.querySelector('main');
const wpmElem = document.querySelector('#wpm');
//variables

export default function spawnRocket(fromHtmlElement) {
	let monster = Monster('get');
	//if there is no monster
	if (monster == false) return;
	//if there is a monster
	let monsterHitbox = document.querySelector('#monster-hitbox');
	let monsterHitboxPosition = monsterHitbox.getBoundingClientRect();
	// rocket
	const rocketOffset = { x: 5, y: 105 };
	const rocketWidth = 16; //px
	const rocketHeight = 16; //px
	let rocketDamage;
	let initialRocketDamage = 15;
	let rocketFinalDestination = {
		x: monsterHitboxPosition.left,
		y: monsterHitboxPosition.top - rocketOffset.y + monsterHitbox.clientHeight,
	};
	//scale rocketdamage with current wpm
	let wpm = parseInt(wpmElem.textContent);
	rocketDamage = initialRocketDamage + 1.02 ** Math.round(wpm);

	let fromCoordinatesBoundingClient = fromHtmlElement.getBoundingClientRect();
	let fromCoordinates = {
		x: fromCoordinatesBoundingClient.x - rocketOffset.x,
		y: fromCoordinatesBoundingClient.y - rocketOffset.y,
	};

	const angle = Math.atan2(
		rocketFinalDestination.y - fromCoordinates.y,
		rocketFinalDestination.x - fromCoordinates.x
	);

	const angleInDegrees = (angle * 180) / Math.PI;

	const correctedAngle =
		angleInDegrees + (rocketFinalDestination.x < fromCoordinates.x ? 180 : 0);

	//creating rocket
	let rocketElement = document.createElement('div');
	rocketElement.className = 'rocket';
	rocketElement.id = `${~~fromCoordinates.x}${~~fromCoordinates.y}`;
	mainHtmlElement.appendChild(rocketElement);

	//rocket styles
	rocketElement.style.width = `${rocketWidth}px`;
	rocketElement.style.height = `${rocketHeight}px`;
	rocketElement.style.left = `${fromCoordinates.x}px`;
	rocketElement.style.top = `${fromCoordinates.y}px`;

	//keyframes style

	const keyframeID = `${rocketElement.id}`;

	const styleElement = document.createElement('style');
	styleElement.appendChild(
		document.createTextNode(`
        @keyframes rocket${keyframeID} {
            to {
                transform: translate(${
									rocketFinalDestination.x - fromCoordinates.x
								}px, ${
			rocketFinalDestination.y - fromCoordinates.y
		}px) rotate(${-correctedAngle}deg);
            }
        }
    `)
	);

	document.head.appendChild(styleElement);

	rocketElement.style.animation = `rocket${keyframeID} 0.8s linear forwards`;

	//remove rocket
	rocketElement.addEventListener('animationend', () => {
		monster.damageMonster(rocketDamage);
		rocketElement.remove();
		styleElement.remove();
	});
}
