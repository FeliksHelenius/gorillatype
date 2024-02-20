let click1 = {
	one: new Audio('./src/typingSounds/sounds/click4_1.wav'),
	two: new Audio('./src/typingSounds/sounds/click4_2.wav'),
};
let click2 = {
	one: new Audio('./src/typingSounds/sounds/click4_2.wav'),
	two: new Audio('./src/typingSounds/sounds/click4_22.wav'),
};
let click3 = {
	one: new Audio('./src/typingSounds/sounds/click4_3.wav'),
	two: new Audio('./src/typingSounds/sounds/click4_33.wav'),
};
let click4 = {
	one: new Audio('./src/typingSounds/sounds/click4_4.wav'),
	two: new Audio('./src/typingSounds/sounds/click4_44.wav'),
};
let click5 = {
	one: new Audio('./src/typingSounds/sounds/click4_5.wav'),
	two: new Audio('./src/typingSounds/sounds/click4_55.wav'),
};
let click6 = {
	one: new Audio('./src/typingSounds/sounds/click4_6.wav'),
	two: new Audio('./src/typingSounds/sounds/click4_66.wav'),
};

const keyboardSounds = [click1, click2, click3, click4, click5, click6];

export default function playSound(key) {
	let randomIndex = (keyboardSounds.length * Math.random()) | 0;
	const randomChance = Math.random() < 0.2;

	let audioOne = keyboardSounds[randomIndex].one;
	let audioTwo = keyboardSounds[randomIndex].two;

	audioOne.play();
	audioOne.addEventListener('ended', () => {
		if (!randomChance) return;
		audioTwo.play();
	});

	// switch (key) {
	// 	case 'normal':
	// 		let audio =
	// 			keyboardSounds[(Math.random() * keyboardSounds.length) | 0].cloneNode();

	// 		audio.play();

	// 		break;
	// 	// case 'spacebar':
	// 	// 	click1.cloneNode().play();
	// 	// 	break;
	// 	// case 'backspace':
	// 	// 	backspaceSound.cloneNode().play();
	// 	// 	break;
	// }
}
