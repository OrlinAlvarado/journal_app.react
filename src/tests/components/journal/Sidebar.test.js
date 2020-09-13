const { mount } = require("enzyme")
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import '@testing-library/jest-dom';

import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from '../../../components/journal/Sidebar';

import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes'



jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}))

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn(),
}))





const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth:{},
    ui: {
        loading: false,
        msgError: null
    },
    notes:{
        active: {
            id: 'ABC'
        },
        notes: []
    }
}

let store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount(
    
    <Provider store={ store }>
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    </Provider>    
);

describe('Pruebas en <Sidebar />', () => {
    
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })
    
    
    test('Debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    })
    
    
    test('Debe de llmar el startLogout ', () => {
        
        wrapper.find('button').prop('onClick')();
        
        expect( startLogout ).toHaveBeenCalled();
    })
    
    test('Debe de llamar el startNewNote ', () => {
        
        wrapper.find('.journal__new-entry').prop('onClick')();
        
        expect( startNewNote ).toHaveBeenCalled();
    })
    
      
    
    
    
})
