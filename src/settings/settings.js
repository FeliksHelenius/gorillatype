//settingsElements
let wordSettings = document.querySelectorAll('.word-settings');
let wordSettingsSelected = 'word-settings-selected';

let _Settings = {
	wordsToGenerate: parseInt(localStorage.getItem('wordsToGenerate')) || 10,
	infiniteMode: localStorage.getItem('infiniteMode') == true || false,
	monsterEnabled: localStorage.getItem('monsterEnabled') == true || true, //change later
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
}

export default function Settings() {
	return [_Settings, updateSettings];
}
