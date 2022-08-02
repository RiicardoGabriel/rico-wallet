import React from "react";
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import Login from "../pages/Login";
// import App from "../App";

import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes da página de Login', () => {
    it('Verifica se existe os botões de email e senha', () => {
        renderWithRouterAndRedux(<Login />)
        
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Senha");
        const btnEntrar = screen.getByText('Entrar');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(btnEntrar).toBeInTheDocument();
    })
})

describe('Testes e verificações de login', () => {
    it('Verifica sem o botão continua desabilitado', () => {
        renderWithRouterAndRedux(<Login />);
        const email = screen.getByPlaceholderText("Email");
        const password = screen.getByPlaceholderText("Senha");
        const button = screen.getByRole('button', { name: 'Entrar'});
    
        userEvent.type(email, 'emailInvalido@');    
        expect(button).toHaveProperty('disabled', true);
        userEvent.type(password, '3245');    
        expect(button).toHaveProperty('disabled', true);
        userEvent.type(email, 'emailvalido@gmail.com');
        expect(button).toHaveProperty('disabled', true);
        userEvent.type(password, '123456');
        expect(button).toHaveProperty('disabled', false);
    })
})

describe('Teste de redirecionamento pós login', () => {
    it('Verifica se o botão redireciona para a página /carteira', () => {
        const { history } = renderWithRouterAndRedux(<Login />);

        const email = screen.getByPlaceholderText("Email");
        const password = screen.getByPlaceholderText("Senha");
        const button = screen.getByRole('button', { name: 'Entrar'});
    
    
        userEvent.type(email, 'emailvalido@gmail.com');
        userEvent.type(password, '123456');
        userEvent.click(button);
    
        const { pathname } = history.location;
        expect(pathname).toBe('/carteira');
      });
})
