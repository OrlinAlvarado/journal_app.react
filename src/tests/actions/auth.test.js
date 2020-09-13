import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import '@testing-library/jest-dom';

const { login, logout, startLogout, startLoginEmailPassword } = require("../../actions/auth");
const { types } = require("../../types/types");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {}

let store = mockStore(initState);

describe('Pruebas con las acciones de Auth', () => {
    
    beforeEach(() => {
        store = mockStore(initState);
    })
    
    test('login y logout deben de crear la acción respectiva', () => {
        
        const uid = '123456';
        const displayName = 'Orlin';
        const loginAction = login(uid, displayName);
        const logoutAction = logout();  
        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });
        
        expect( logoutAction ).toEqual({
            type: types.logout
        });
    })
    
    test('Debe de realizar el logout', async () => {
        await store.dispatch( startLogout() );
        
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({ type: types.logout } );
        
        expect( actions[1] ).toEqual({ type: types.notesLogoutCleaning });
    })
    
    
    test('Debe iniciar el startLoginEmailPassword', async() => {
        
        await store.dispatch( startLoginEmailPassword('test@testing.com', '123456'));
        
        const actions = store.getActions();
        
        expect( actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'u8xXXhCH0BSuEN8gdu5B7OBNLuU2',
                displayName: null
            }
        })
    })
    
    
    
})
