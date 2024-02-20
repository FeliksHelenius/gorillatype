//import
import Settings from './settings/settings.js';
import inputHandler from './inputHandling/inputHandler.js';
import MainHook from './hooks/MainHook.js';
//html elements

const gameContainer = document.querySelector('#game-container');
const blurBanner = document.querySelector('#blur-banner');
const wordSettings = document.querySelectorAll('.word-settings');
let selectedWordSetting = wordSettings[0];
const restartButton = document.querySelector('#restart-button');

//initializing settings
let [_Settings, updateSettings] = Settings();

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
restartButton.addEventListener('keypress', (e) => {
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
