import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/Login.css';

import { loginEmail } from '../redux/actions';
import Contato from '../components/Contato';

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
  }

  render() {
    const { emailDisp } = this.props;
    const { email, password } = this.state;
    return (
      <div className="page-login">
        <div className="content-login">
          <form className="login-form">
            <h2>Login</h2>
            <label htmlFor="email">
              <input
                className="email"
                data-testid="email-input"
                type="email"
                name="email"
                value={ email }
                placeholder="Insira seu email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="password">
              <input
                className="password"
                data-testid="password-input"
                type="password"
                name="password"
                value={ password }
                placeholder="Senha"
                onChange={ this.handleChange }
              />
            </label>
            <Link to="/carteira">
              <button
                className="btn-login"
                type="button"
                disabled={ this.disabledBtn() }
                label="Entrar"
                onClick={ () => emailDisp(email) }
              >
                Entrar
              </button>
            </Link>
            <Contato cssName="login-contato" />
          </form>
        </div>
      </div>
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
