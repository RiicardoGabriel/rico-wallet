import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense as deleteExpenseAction } from '../redux/actions';

class Table extends Component {
  deletarExp = (id) => {
    const { deleteExpense } = this.props;
    console.log(id);
    deleteExpense(id);
  };

  render() {
    const { expensesProp, deleteExpense } = this.props;
    return (
      <div>
        <table>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
          <tbody>
            { expensesProp.map(({ id, value, description,
              tag, method, currency, exchangeRates }) => {
              const { ask } = exchangeRates[currency];
              const toFixedFunc = Number(ask).toFixed(2);
              const cambio = Number(ask * value).toFixed(2);

              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>{ toFixedFunc }</td>
                  <td>{ cambio }</td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => deleteExpense(id) }
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expensesProp: PropTypes.array,
  dispatch: PropTypes.arrayOf(PropTypes.any).isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  expensesProp: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expenseId) => dispatch(deleteExpenseAction(expenseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
