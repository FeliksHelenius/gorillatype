import Settings from '../settings/settings.js';

//html elements
const currencyHtmlElement = document.querySelector('#currency');
const monsterEnabledHtmlElement = document.querySelector('#monster-enabled');
const currentMonsterHtmlElement = document.querySelector('#monster-types');

let _userData = {
	currency: parseInt(localStorage.getItem('currency')) || 0,
	currentMonster: localStorage.getItem('currentMonster') || 'easy',
};

let [_Settings, updateSettings] = Settings();

function updateUserData(
	currency = _userData.currency,
	currentMonster = _userData.currentMonster
) {
	_userData.currency = currency;
	_userData.currentMonster = currentMonster;

	localStorage.setItem('currency', _userData.currency);
	localStorage.setItem('currentMonster', _userData.currentMonster);

	console.log('currency = ', localStorage.getItem('currency'));

	if (currency != 0) return;
	updateUserDataHtml(); // since the currency gets updated with an animation esque fashion, we have to check before updating the current monster.
}

function updateUserDataHtml() {
	currencyHtmlElement.textContent = _userData.currency;
	currentMonsterHtmlElement.value = _userData.currentMonster;
	monsterEnabledHtmlElement.textContent = _Settings.monsterEnabled;
}
updateUserDataHtml();

export default function userData() {
	return [_userData, updateUserData];
}
