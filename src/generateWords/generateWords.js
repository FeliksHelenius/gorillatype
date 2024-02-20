//imports
import wordsCollection from './wordsCollection.js';
import Settings from '../settings/settings.js';

function getRandomWords(amount) {
	let wordsObject = {};

	for (let i = 0; i < amount; i++) {
		wordsObject[`word${i}`] =
			wordsCollection[(wordsCollection.length * Math.random()) | 0];
	}
	return wordsObject;
}

export default function Words() {
	let [_Settings, updateSettings] = Settings();
	let randomWords = getRandomWords(_Settings.wordsToGenerate);
	return randomWords;
}
