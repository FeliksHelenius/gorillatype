let damageSounds = [
	new Audio('./src/monster/monsterSounds/damage1.mp3'),
	new Audio('./src/monster/monsterSounds/damage2.mp3'),
];

let deathSound = new Audio('./src/monster/monsterSounds/deathSound.wav');
let dropCoinsSound = new Audio('./src/monster/monsterSounds/dropCoins.mp3');
deathSound.volume = 0.2;

export default function playSound(type) {
	switch (type) {
		case 'damage':
			let audio = damageSounds[(damageSounds * Math.random()) | 0].cloneNode();
			audio.volume = 0.2;
			audio.play();
			break;
		case 'death':
			deathSound.play();
			break;
		case 'dropCoins':
			dropCoinsSound.play();
			break;
	}
}
