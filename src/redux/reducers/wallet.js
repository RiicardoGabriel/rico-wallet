// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenseValue: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'RECEIVE_COINS':
    return {
      ...state,
      currencies: action.coins,
    };
  case 'EXPENSES_ACTION':
    return {
      ...state,
      expenses: [...state.expenses, action.newExpense],
      totalExpenseValue: state.totalExpenseValue + action.extraValue,
    };
  default:
    return state;
  }
}

export default wallet;
