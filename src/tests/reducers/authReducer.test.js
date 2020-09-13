const { authReducer } = require("../../reducers/authReducer")
const { types } = require("../../types/types")



describe('Pruebas en authReducer', () => {
    const initialState = {}
    
    test('Debe hacer el login', () => {
        const initialState = {}
                
        const action = {
            type: types.login,
            payload: {
                uid: 'orlin@prueba.com',
                displayName: 'Orlin Alvarado'
            }
        }
        const { uid, name } = authReducer( initialState, action );
        
        expect( uid ).toBe( action.payload.uid );
        expect( name ).toBe( action.payload.displayName );
        
    })
    
    test('Debe hacer el logout', () => {
        const initialState = {
            uid: '1234',
            name: 'Orlin'
        }
        
        const action = {
            type: types.logout
        }
        const state = authReducer( initialState, action );
        
        expect( state ).toEqual({});
        
    })

    test('Debe debe devolver el estado por defecto', () => {
        const initialState = {
            uid: '1234',
            name: 'Orlin'
        }
        
        const action = {
            type: types.notesActive
        }
        const state = authReducer( initialState, action );
        
        expect( state ).toEqual( initialState );
        
    })
    
})
