const keyboardSounds = [
	new Audio('./src/typingSounds/sounds/click4_1.wav'),
	new Audio('./src/typingSounds/sounds/click4_2.wav'),
	new Audio('./src/typingSounds/sounds/click4_3.wav'),
	new Audio('./src/typingSounds/sounds/click4_4.wav'),
	new Audio('./src/typingSounds/sounds/click4_5.wav'),
	new Audio('./src/typingSounds/sounds/click4_6.wav'),
	new Audio('./src/typingSounds/sounds/click4_11.wav'),
	new Audio('./src/typingSounds/sounds/click4_22.wav'),
	new Audio('./src/typingSounds/sounds/click4_33.wav'),
	new Audio('./src/typingSounds/sounds/click4_44.wav'),
	new Audio('./src/typingSounds/sounds/click4_55.wav'),
	new Audio('./src/typingSounds/sounds/click4_66.wav'),
];
export default function playSound(key) {
	switch (key) {
		case 'normal':
			let audio =
				keyboardSounds[(Math.random() * keyboardSounds.length) | 0].cloneNode();

			audio.play();

			break;
		// case 'spacebar':
		// 	click1.cloneNode().play();
		// 	break;
		// case 'backspace':
		// 	backspaceSound.cloneNode().play();
		// 	break;
	}
}
