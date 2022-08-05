// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenseValue: 0,
};

const reOrderExpensesId = (state, expensesId) => state.expenses
  .filter((expense) => expense.id !== expensesId);

const decrementTotalExpenseValue = (state, expenseId) => {
  const expense = state.expenses.filter(({ id }) => id === expenseId)[0];
  const { value, currency, exchangeRates } = expense;
  const unityValue = Number(exchangeRates[currency].ask);

  return Math.abs(state.totalExpenseValue - Number(value) * unityValue);
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
  case 'DELETE_EXPENSE':
    return {
      ...state,
      totalExpenseValue: decrementTotalExpenseValue(state, action.expenseId),
      expenses: reOrderExpensesId(state, action.expenseId),
    };
  default:
    return state;
  }
}

export default wallet;
