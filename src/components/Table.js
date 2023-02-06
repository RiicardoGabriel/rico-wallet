import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense as deleteExpenseAction } from '../redux/actions';
import '../css/Table.css';

class Table extends Component {
  deletarExp = (id) => {
    const { deleteExpense } = this.props;
    console.log(id);
    deleteExpense(id);
  };

  render() {
    const { expensesProp, deleteExpense } = this.props;
    return (
      <div className="table">
        <table data-testid="table-wallet">
          <thead className="header-table">
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Excluir</th>
            </tr>
          </thead>

          <tbody>
            { expensesProp.map(({ id, value, description,
              tag, method, currency, exchangeRates }) => {
              const { ask } = exchangeRates[currency];
              const toFixedFunc = Number(ask).toFixed(2);
              const cambio = Number(ask * value).toFixed(2);

              return (
                <tr key={ id }>
                  <td data-testid="td-desc">{ description }</td>
                  <td data-testid="td-tag">{ tag }</td>
                  <td data-testid="td-method">{ method }</td>
                  <td data-testid="td-value">{Number(value).toFixed(2)}</td>
                  <td data-testid="td-name">{ exchangeRates[currency].name }</td>
                  <td data-testid="td-cambio">{ toFixedFunc }</td>
                  <td data-testid="td-conversão">{ cambio }</td>
                  <td data-testid="td-real">Real</td>
                  <td>
                    <button
                      className="delete-btn"
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
