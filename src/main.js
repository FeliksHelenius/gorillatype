//import
import Settings from './settings/settings.js';
import inputHandler from './inputHandling/inputHandler.js';
import MainHook from './hooks/MainHook.js';
import userData from './userData/userData.js';
import Monster from './monster/monster.js';
//html elements

const gameContainer = document.querySelector('#game-container');
const blurBanner = document.querySelector('#blur-banner');
const wordSettings = document.querySelectorAll('.word-settings');
const monsterEnabledSetting = document.querySelector('.monster-enabled');
const monsterDifficultySettings = document.querySelector('#monster-types');
let selectedWordSetting = wordSettings[0];
const restartButton = document.querySelector('#restart-button');

//initializing settings
let [_Settings, updateSettings] = Settings();

//initializing userData
let [_userData, updateUserData] = userData();

//initializing monster
if (_Settings.monsterEnabled) {
	let monster = Monster('create');
}
//variables
let gameContainerFocused = false;
let mainHook = MainHook();

//eventlistener

wordSettings.forEach((elem) => {
	elem.addEventListener('click', handleWordSettings);
	elem.addEventListener('keypress', handleWordSettings);
	function handleWordSettings(e) {
		const enterKey = 13;
		let datasetWords = elem.dataset.words;

		if (e.type == 'click' || e.keyCode == enterKey) {
			selectedWordSetting.className = 'word-settings';
			e.target.classList.add('word-settings-selected');
			selectedWordSetting = e.target;
			updateSettings(datasetWords);
			mainHook = MainHook('reset');
		}
	}
});

monsterDifficultySettings.addEventListener('change', (e) => {
	updateUserData(_userData.currency, e.target.value);
	location.reload();
});

gameContainer.addEventListener('focus', () => {
	gameContainerFocused = true;
	blurBanner.style.display = 'none';
	if (!mainHook) return;
	window.addEventListener('keydown', inputHandler);
});
gameContainer.addEventListener('blur', () => {
	gameContainerFocused = false;
	blurBanner.style.display = 'block';
	window.removeEventListener('keydown', inputHandler);
});

restartButton.addEventListener('click', (e) => {
	mainHook = MainHook('reset');
});
restartButton.addEventListener('keydown', (e) => {
	const enterKey = 13;
	if (e.keyCode == enterKey) {
		mainHook = MainHook('reset');
	}
});

window.addEventListener('keydown', (e) => {
	if (document.activeElement == document.body && mainHook.doneTyping) {
	} else if (mainHook.doneTyping == false) {
		gameContainer.focus();
	}
});
