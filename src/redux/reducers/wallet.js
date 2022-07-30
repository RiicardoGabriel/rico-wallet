// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'RECEIVE_COINS':
    return {
      ...state,
      currencies: action.coins,
    };
  default:
    return state;
  }
}

export default wallet;
