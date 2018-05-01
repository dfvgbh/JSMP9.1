// BEFORE
function updateCurrencyAmount(amount) {
  const currencyAmount = document.querySelector('.chart-section__currency-amount');
  amount = (winrate * parseFloat(amount)).toFixed(2);
  amount = isNaN(amount) || amount <= 0 ? ' ' : amount;
  currencyAmount.textContent = `$ ${amount}`;
}

function main() {
  updateCurrencyAmount(12);
}

// AFTER
function updateCurrencyAmount(container, amount, winrate) {
  const calculated = (winrate * amount).toFixed(2);
  container.textContent = `$ ${calculated}`;
}

function main() {
  const currencyAmountContainer = document.querySelector('.chart-section__currency-amount');
  const winrate = 0.72;
  const amount = 100;
  updateCurrencyAmount(currencyAmountContainer, amount, winrate);
}

// BEFORE
function amountControlPlusHandler() {
  const amountInput = document.querySelector('.chart-section__amount-input');
  let value = amountInput.value;
  value = parseFloat(value);
  if (isNaN(value) || value < 0) value = 0;
  amountInput.value = value + 1;
  updateCurrencyAmount(amountInput.value);
}

// AFTER
function amountControlPlusHandler() {
  const amountInput = document.querySelector('.chart-section__amount-input');
  const currencyAmountContainer = document.querySelector('.chart-section__currency-amount');
  const winrate = 0.72;

  let amount = parseFloat(amountInput.value);
  amount = isNaN(amount) || amount < 0 ? 1 : amount + 1;
  updateCurrencyAmount(currencyAmountContainer, amount, winrate);
  amountInput.value = amount;
}

// BEFORE
function historyButtonClickHandler() {
  leftBarToggleHandler(historyAside);
}

// AFTER
function historyButtonClickHandler() {
  const historyAside = document.querySelector('.chart-section__history-aside');
  leftBarToggleHandler(historyAside);
}

// BEFORE
function renderInstruments(data) {
  let html = '';

  data = data.data;
  instruments = {};
  if (data.length < 1) return;

  setWinrate(data[0].win);

  html += `<option selected value=${data[0].id} data-winrate=${data[0].win}>${data[0].content}</option>`;
  instruments[data[0].id] = {
    name: data[0].content,
    length: data[0].length
  };

  for (let i = 1; i < data.length; i++) {
    html += `<option value=${data[i].id} data-winrate=${data[i].win}>${data[i].content}</option>`;
    instruments[data[i].id] = {
      name: data[i].content,
      length: data[i].length
    };
  }
  selectContainer.insertAdjacentHTML('beforeEnd', html);
}

// AFTER
function renderInstruments({ data }) {
  const container = document.querySelector('.chart-section__instruments-select');
  const instruments = {};
  let html = '';

  if (data.length < 1) return;
  setWinrate(data[0].win);

  data.forEach(({ id, name, length }, index) => {
    html += `<option ${index === 0 ? 'selected' : ''} value=${id} data-winrate=${win}>${name}</option>`;
    instruments[id] = {
      name,
      length
    };
  });

  container.insertAdjacentHTML('beforeEnd', html);
}

// BEFORE
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

// AFTER
// return is successful
function doBet(type, bet) {
  if (bet.isActive) return false;
  const value = parseInt(
    document.querySelector('.chart-section__amount-input').value,
    10
  );
  decreaseBalance(value);
  Chart.addBetLine(type);
  return {
    type,
    value,
    isActive: true
  };
}