// Coloque aqui suas actions

import getCoins from '../getAPI/getCoins';

export const loginEmail = (email) => ({ type: 'LOGIN_ACTION', email });

export const receiveCoins = (coins) => ({
  type: 'RECEIVE_COINS',
  coins });

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
