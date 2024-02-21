//settingsElements
let wordSettings = document.querySelectorAll('.word-settings');
let wordSettingsSelected = 'word-settings-selected';
let monsterEnabledSetting = document.querySelector('.monster-toggle-setting ');
let monsterEnabled = document.querySelector('#monster-enabled');

let _Settings = {
	wordsToGenerate: parseInt(localStorage.getItem('wordsToGenerate')) || 10,
	infiniteMode: localStorage.getItem('infiniteMode') == true || false,
	monsterEnabled: true,
};

function updateSettingsHtml() {
	switch (_Settings.wordsToGenerate) {
		case 10:
			wordSettings[0].classList.add(wordSettingsSelected);
			break;
		case 25:
			wordSettings[1].classList.add(wordSettingsSelected);
			break;
		case 50:
			wordSettings[2].classList.add(wordSettingsSelected);
	}

	if (_Settings.monsterEnabled) {
		monsterEnabledSetting.classList.replace(
			'monster-disabled',
			'monster-enabled'
		);
		monsterEnabled.textContent = _Settings.monsterEnabled;
	} else {
		monsterEnabledSetting.classList.replace(
			'monster-enabled',
			'monster-disabled'
		);
		monsterEnabled.textContent = _Settings.monsterEnabled;
	}
}
updateSettingsHtml();

function updateSettings(
	wordsToGenerate = 10,
	infiniteMode = false,
	monsterEnabled = false
) {
	_Settings.wordsToGenerate = wordsToGenerate;
	_Settings.infiniteMode = infiniteMode;
	_Settings.monsterEnabled = monsterEnabled;

	localStorage.setItem('wordsToGenerate', `${_Settings.wordsToGenerate}`);
	localStorage.setItem('infiniteMode', `${_Settings.infiniteMode}`);
	localStorage.setItem('monsterEnabled', `${_Settings.monsterEnabled}`);

	updateSettingsHtml();
}

export default function Settings() {
	return [_Settings, updateSettings];
}
