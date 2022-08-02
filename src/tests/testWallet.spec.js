import React from "react";
import { screen } from '@testing-library/react';
// import userEvent from "@testing-library/user-event";

import Wallet from "../pages/Wallet";
// import App from "../App";

import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes da página de carteira', () => {
    it('Verifica se existe os inputs', () => {
        renderWithRouterAndRedux(<Wallet />)
        
        const valueInput = screen.getByTestId("value-input");
        const descriptionInput = screen.getByTestId("description-input");
        const btnEntrar = screen.getByText('Adicionar despesa');
        const options = screen.getByTestId("currency-input");
        const method = screen.getByTestId('method-input');
        const tag = screen.getByTestId('tag-input');

        expect(valueInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        expect(btnEntrar).toBeInTheDocument();
        expect(options).toBeInTheDocument();
        expect(method).toBeInTheDocument();
        expect(tag).toBeInTheDocument();
    })
})
