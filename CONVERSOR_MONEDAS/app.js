const convertButton = document.getElementById('convertButton');
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const resultDiv = document.getElementById('result');

// Tu API key de ExchangeRate-API
const API_KEY = 'TU_API_KEY';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

convertButton.addEventListener('click', async () => {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = 'Por favor, ingresa una cantidad válida.';
    return;
  }

  try {
    const response = await fetch(`${API_URL}${from}`);
    const data = await response.json();

    if (data.result === "success") {
      const rate = data.conversion_rates[to];
      const convertedAmount = (amount * rate).toFixed(2);
      resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } else {
      resultDiv.textContent = 'Error al obtener la tasa de cambio.';
    }
  } catch (error) {
    resultDiv.textContent = 'Error de conexión. Inténtalo de nuevo más tarde.';
  }
});
