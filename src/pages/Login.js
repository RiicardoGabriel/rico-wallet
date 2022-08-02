import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { loginEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({
        [name]: value,
      });
    }

  verifyEmail = () => {
    const { email } = this.state;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!reg.test(email)) {
      return true;
    }
  }

  verifyPassword = () => {
    const { password } = this.state;
    const minPassword = 6;

    if (password.length < minPassword) {
      return true;
    }
  }

  disabledBtn = () => {
    if (this.verifyEmail() || this.verifyPassword()) {
      return true;
    }
    return false;
  }

  render() {
    const { emailDisp } = this.props;
    const { email, password } = this.state;
    return (
      <>
        <div>Login</div>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          placeholder="Email"
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          placeholder="Senha"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ this.disabledBtn() }
            label="Entrar"
            onClick={ () => emailDisp(email) }
          >
            Entrar
          </button>
        </Link>
      </>
    );
  }
}

Login.propTypes = {
  emailDisp: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  emailDisp: (email) => dispatch(loginEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
