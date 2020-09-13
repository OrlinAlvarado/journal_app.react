const { mount } = require("enzyme")
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import { RegisterScreen } from '../../../components/auth/RegisterScreen';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth:{},
    ui: {
        loading: false,
        msgError: null
    }
}

let store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount(
    
        <Provider store={ store }>
            <MemoryRouter>
                <RegisterScreen />
            </MemoryRouter>
        </Provider>    
);


describe('Pruebas en <RegisterScreen />', () => {
    
    test('Debe de mostrase correctamente', () => {
      
        expect( wrapper ).toMatchSnapshot();
        
    })
     
})
