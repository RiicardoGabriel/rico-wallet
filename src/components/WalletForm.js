import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/WalletForm.css';

import { expensesWallet, fetchCoins as fetchCoinsThunk } from '../redux/actions';

const INITIAL_STATE = {
  valueExpenses: '',
  descriptionExpense: '',
  paymentMethod: 'Dinheiro',
  tag: 'Alimentação',
  curr: 'USD',
};

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.saveCurr();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  saveCurr = async () => {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  render() {
    const { currencies, expensesW } = this.props;
    const { valueExpenses, descriptionExpense, curr, tag, paymentMethod } = this.state;
    const walletE = { valueExpenses, descriptionExpense, curr, tag, paymentMethod };
    return (
      <form className="form-content">
        <label htmlFor="value">
          Valor
          <input
            className="value"
            data-testid="value-input"
            placeholder="Adicione o valor da despesa"
            onChange={ this.handleChange }
            value={ valueExpenses }
            name="valueExpenses"
            type="number"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            className="description"
            data-testid="description-input"
            placeholder="Adicione a descrição da despesa"
            onChange={ this.handleChange }
            value={ descriptionExpense }
            name="descriptionExpense"
          />
        </label>
        <div>
          Moeda
          <select
            data-testid="currency-input"
            name="curr"
            value={ curr }
            onChange={ this.handleChange }
          >
            { currencies.map((currs) => (
              <option key={ currs } value={ currs }>{currs}</option>
            )) }
          </select>
        </div>
        <div>
          Método de pagamento
          <select
            data-testid="method-input"
            value={ paymentMethod }
            name="paymentMethod"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </div>
        <div>
          Categoria
          <select
            data-testid="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </div>

        <button
          className="btn-wallet"
          type="button"
          onClick={ () => {
            this.setState({ ...INITIAL_STATE });
            expensesW(walletE);
          } }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchCoinsThunk()),
  expensesW: (walletE) => dispatch(expensesWallet(walletE)),
});

WalletForm.propTypes = {
  fetchCoins: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expensesW: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
