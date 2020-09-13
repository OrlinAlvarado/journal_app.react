const { types } = require("../../types/types")

describe('Prueba de types', () => {
    test('Debe mostrar los tipos correctamente', () => {
        const tipos = {
            login: '[Auth] Login',
            logout: '[Auth] Logout',
            
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
            
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
            
            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set active notes',
            notesLoad: '[Notes] Load notes',
            notesUpdated: '[Notes] Updated note',
            notesFileUrl: '[Notes] Updated image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout Cleaning',
            
        }
        
        expect( types ).toEqual( tipos );
    })
    
})
