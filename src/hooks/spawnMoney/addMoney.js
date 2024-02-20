const currency = document.querySelector('#currency');

export default function addMoney(amountOfMoney) {
	const newCurrency = parseInt(currency.dataset.currency);
	const oldCurrency = newCurrency - amountOfMoney;

	for (let i = oldCurrency; i < newCurrency + 1; i++) {
		setTimeout(() => {
			currency.textContent = i;
		}, 100 + i * 10);
	}
}
