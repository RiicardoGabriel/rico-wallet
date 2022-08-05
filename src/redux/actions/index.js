// Coloque aqui suas actions

import getCoins from '../getAPI/getCoins';

export const loginEmail = (email) => ({ type: 'LOGIN_ACTION', email });

export const expensesWallet = (expenses) => async (dispatch, getState) => {
  const currValue = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  delete currValue.USDT;
  const extraValue = expenses.valueExpenses * currValue[expenses.curr].ask;
  const state = getState();
  const count = state.wallet.expenses.length;

  const newExpense = {
    id: count,
    value: expenses.valueExpenses,
    currency: expenses.curr,
    method: expenses.paymentMethod,
    tag: expenses.tag,
    description: expenses.descriptionExpense,
    exchangeRates: currValue,
  };
  const ObjectToDispatch = {
    type: 'EXPENSES_ACTION',
    newExpense,
    extraValue,
  };
  dispatch(ObjectToDispatch);
};

export const receiveCoins = (coins) => ({
  type: 'RECEIVE_COINS',
  coins });

export const deleteExpense = (expenseId) => ({
  type: 'DELETE_EXPENSE',
  expenseId });

export const fetchCoins = () => async (dispatch) => {
  try {
    const currencies = await getCoins();
    const currNotUSDT = Object.keys(currencies)
      .filter((curr) => curr !== 'USDT');
    dispatch(receiveCoins(currNotUSDT));
  } catch (error) {
    return error;
  }
};
