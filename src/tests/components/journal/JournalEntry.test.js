const { mount } = require("enzyme")
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import '@testing-library/jest-dom';

import { MemoryRouter } from 'react-router-dom';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';


const nota = {
    id: 10,
    date: 0,
    title: 'Hola',
    body: 'Mundo',
    url: 'https://algunlugar.com/foto.jpg'
}

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {}


let store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount(
    
    <Provider store={ store }>
        <MemoryRouter>
            <JournalEntry { ...nota }/>
        </MemoryRouter>
    </Provider>    
);



describe('Pruebas en <JournalEntry />', () => {
    
    test('Debe de mostrarse correctamente ', () => {
        
        expect( wrapper ).toMatchSnapshot();
    })
    
    test('Debe de activar la nota', () => {
        wrapper.find('.journal__entry').prop('onClick')();
        
        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( nota.id, { ...nota })
        );
    })
    
    
})
