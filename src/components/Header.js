import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { nameEmail, expensesTotal } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          Email:
          { nameEmail }
        </p>
        <p data-testid="total-field">
          { expensesTotal.toFixed(2) }
        </p>
        <p data-testid="header-currency-field">
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
