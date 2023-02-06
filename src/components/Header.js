import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/Header.css';

class Header extends Component {
  render() {
    const { nameEmail, expensesTotal } = this.props;
    return (
      <div className="header-content">
        <h1 className="title-rico">
          Rico
          <span className="title-wallet">Wallet</span>
        </h1>
        <p data-testid="email-field">
          Email:
          { nameEmail }
        </p>
        <p data-testid="total-field">
          { expensesTotal.toFixed(2) }
          {' '}
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nameEmail: state.user.email,
  expensesTotal: state.wallet.totalExpenseValue,
});

Header.propTypes = {
  nameEmail: PropTypes.string.isRequired,
  expensesTotal: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
