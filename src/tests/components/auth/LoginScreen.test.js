const { mount } = require("enzyme")
const { LoginScreen } = require("../../../components/auth/LoginScreen")
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}))

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
                <LoginScreen />
            </MemoryRouter>
        </Provider>    
);

describe('Pruebas en <LoginScreen />', () => {
    
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })
    
   test('Debe de mostrarse correctamente', () => {
       expect( wrapper ).toMatchSnapshot();
   })
   
   test('Debe de disparar la accion startGoogleLogin', () => {
       wrapper.find('.google-btn').prop('onClick')();
       
       
       expect( startGoogleLogin ).toHaveBeenCalled();
       
   })
   
   test('Debe de disparar el StartLogin con los respectivos argumentos', () => {
      
      wrapper.find('input').at(0).simulate('change', {
        target: {
            name: 'email',
            value: 'test@testing.com'
        }
    });
    
    wrapper.find('input').at(1).simulate('change', {
        target: {
            name: 'password',
            value: '123456'
        }
    });
    
    wrapper.find('form').prop('onSubmit')({
        preventDefault(){}
    });
    
    
    expect( startLoginEmailPassword ).toHaveBeenCalledWith('test@testing.com', '123456');
    
    
      
   })
   
   
   
    
})
