import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const valueInitial = 0;
    const { nameEmail } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          Email:
          { nameEmail }
        </p>
        <p data-testid="total-field">
          Valor total das despesas:
          { valueInitial }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nameEmail: state.user.email });

Header.propTypes = {
  nameEmail: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Header);
