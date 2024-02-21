import userData from '../../userData/userData.js';

let [_userData, updateUserData] = userData();

export default function addMoney(amountOfMoney) {
	currency.textContent =
		parseInt(currency.textContent) + parseInt(amountOfMoney);
}
