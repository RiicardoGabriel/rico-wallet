import { renderWithRouterAndRedux } from './helpers/renderWith';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import React from 'react';
import mockData from './helpers/mockData';

import App from '../App';
import Wallet from '../pages/Wallet';

const fillExpenseForm = ({ description, value, method, tag, currency }) => {
    userEvent.type(screen.getByTestId('value-input'), value);
    userEvent.type(screen.getByTestId('currency-input'), currency);
    userEvent.type(screen.getByTestId('method-input'), method);
    userEvent.type(screen.getByTestId('tag-input'), tag);
    userEvent.type(screen.getByTestId('description-input'), description);
}

const addExpense = (data) => {
  if (Array.isArray(data)) {
    return data.forEach(addExpense);
  }

  fillExpenseForm(data);
  userEvent.click(screen.getByText(/Adicionar despesa/i));
}

describe('Testes de renderização de telas', () => {
  it('Verifica se a página de login é renderizada no inicio da aplicação', () => {
    renderWithRouterAndRedux(<App />);

    const title = screen.getByRole('heading', { level: 2 });
    const emailInput = screen.getByPlaceholderText('Email');
    const senhaInput = screen.getByPlaceholderText('Senha');
    const btnEntrar = screen.getByText('Entrar');

    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(senhaInput).toBeInTheDocument();
    expect(btnEntrar).toBeInTheDocument();
  });

  it('Verifica se a página de \'Carteira\' é renderizada com seus devidos componentes',() => {
    renderWithRouterAndRedux(<Wallet />);

    const campoValor = screen.getByTestId('value-input');
    expect(campoValor).toBeInTheDocument();

    const campoMoeda = screen.getByTestId('currency-input');
    expect(campoMoeda).toBeInTheDocument();

    const campoMetodo = screen.getByTestId('method-input');
    expect(campoMetodo).toBeInTheDocument();

    const campoTag = screen.getByTestId('tag-input');
    expect(campoTag).toBeInTheDocument();

    const campoDesc = screen.getByTestId('description-input');
    expect(campoDesc).toBeInTheDocument();
  });
});

describe('Validações do botão de entrar na página de login', () => {
  const tryOn = (email = 'teste@teste.com', senha = '123456') => {
    renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId('email-input'), email);
    userEvent.type(screen.getByTestId('password-input'), senha);

    const btnEntrar = screen.getByText('Entrar');
    expect(btnEntrar).toHaveProperty('disabled', true);
  };

  it('Verifica se um email sem \'@\' mantém o botão desabilitado', () => {
    tryOn('teste.com');
  });
  
  it('Verifica se um email sem \'.com\' mantém o botão desabilitado', () => {
    tryOn('teste@teste');
  });
  
  it('Verifica se uma senha curta mantém o botão desabilitado', () => {
    tryOn(undefined, '12345');
  });
});


describe('Testando chamadas de funções', () => {
  it('Verifica se toda vez que o botão \'Adicionar despesa\' a função fetch é chamada', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />);

    const dataTest = [
      {
        value: 23,
        currency: 'EUR',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: 'Vinte e três euros',
      },
      {
        value: 41,
        currency: 'BTC',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'Quarenta e um bitcoin',
      }
    ];

    addExpense(dataTest);
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });
});

describe('Comportamento da tabela de Despesas',() => {
  it('Verifica o funcionamento do botão \'Excluir\'', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const dataTest = [
      {
        value: 10,
        currency: 'EUR',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: 'Dez euros',
      },
      {
        value: 51,
        currency: 'DOGE',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'Cinquenta e um DOGE',
      }
    ];

    // addExpense(dataTest);
    // const deleteButtons = await screen.getByTestId('delete-btn');
    // expect(deleteButtons).toHaveLength(2);
    // userEvent.click(deleteButtons[0]);
    // expect(deleteButtons[0]).not.toBeInTheDocument();
  });
});