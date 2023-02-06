import React, { Component } from 'react';
import PropTypes from 'prop-types';
import linkedIn from './img/linkedin.png';
import gitHub from './img/github.png';
import '../css/Contato.css';

export default class Contato extends Component {
  render() {
    const { cssName } = this.props;
    return (
      <div className={ cssName }>
        <div>
          <a href="https://github.com/RiicardoGabriel" target="_blank" rel="noreferrer">
            <img width="50px" src={ gitHub } alt="LinkedIn" />
            <p>GitHub</p>
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/riicardogabriel/" target="_blank" rel="noreferrer">
            <img width="50px" src={ linkedIn } alt="LinkedIn" />
            <p>LinkedIn</p>
          </a>
        </div>
      </div>
    );
  }
}

Contato.propTypes = {
  cssName: PropTypes.string.isRequired,
};
