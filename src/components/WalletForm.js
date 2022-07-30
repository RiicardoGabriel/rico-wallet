import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCoins as fetchCoinsThunk } from '../redux/actions';

class WalletForm extends React.Component {
  componentDidMount() {
    this.saveCurr();
  }

  saveCurr = async () => {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <input
          data-testid="value-input"
          placeholder="Adicione o valor da despesa"
        />
        <input
          data-testid="description-input"
          placeholder="Adicione a descrição da despesa"
        />
        <select data-testid="currency-input">
          { currencies.map((currs) => (
            <option key={ currs }>{currs}</option>
          )) }
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchCoinsThunk()),
});

WalletForm.propTypes = {
  fetchCoins: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
