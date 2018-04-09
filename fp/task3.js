// BEFORE
function updateCurrencyAmount(amount) {
  const currencyAmount = document.querySelector('.chart-section__currency-amount');
  amount = (winrate * parseFloat(amount)).toFixed(2);
  amount = isNaN(amount) || amount <= 0 ? ' ' : amount;
  currencyAmount.textContent = `$ ${amount}`;
}

// AFTER


function amountControlPlusHandler() {
  const amountInput = document.querySelector('.chart-section__amount-input');
  let value = amountInput.value;
  value = parseFloat(value);
  if (isNaN(value) || value < 0) value = 0;
  amountInput.value = value + 1;
  updateCurrencyAmount(amountInput.value);
}


function historyButtonClickHandler() {
  leftBarToggleHandler(historyAside);
}


function renderInstruments(data) {
  let html = '';

  data = data.data;
  instruments = {};
  if (data.length < 1) return;

  setWinrate(data[0].win);

  html += `<option selected value=${data[0].id} data-winrate=${data[0].win}>${data[0].name}</option>`;
  instruments[data[0].id] = {
    name: data[0].name,
    length: data[0].length
  };

  for (let i = 1; i < data.length; i++) {
    html += `<option value=${data[i].id} data-winrate=${data[i].win}>${data[i].name}</option>`;
    instruments[data[i].id] = {
      name: data[i].name,
      length: data[i].length
    };
  }
  selectContainer.insertAdjacentHTML('beforeEnd', html);
}



// return is successful
function doBet(type) {
  if (bet.isActive) return false;
  let value = parseInt(
    document.querySelector('.chart-section__amount-input').value,
    10
  );
  bet.type = type;
  bet.value = value;
  bet.isActive = true;
  decreaseBalance(bet.value);
  Chart.addBetLine(type);
  return true;
}