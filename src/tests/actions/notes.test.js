import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { startNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firabase-config';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn(() => {
        return 'https://hola-mundo.com/cosa.jpg'
        // return Promise.resolve('https://hola-mundo.com/cosa.jpg');
    })
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'PtzkdE7EqZp0rby9h7sR',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}

let store = mockStore(initState);


describe('Pruebas con las acciones de notes', () => {
    
    beforeEach( () => {
        store = mockStore(initState);
    })
    
    test('Debe de crear una nueva nota startNewNote', async () => {
        
        await store.dispatch( startNewNote() );
        
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
              }
        })
        
        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
              }
        })
        
        const uid = 'TESTING';
        const { id: docId } = actions[1].payload;
        await db.doc(`${ uid }/journal/notes/${ docId }`).delete();
    })
    
    test('startLoadingNotes debe cargar las notas', async() => {
        await store.dispatch( startLoadingNotes('TESTING') );
        
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type:types.notesLoad,
            payload: expect.any(Array)
        });
        
        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }
        
        expect( actions[0].payload[0]).toMatchObject( expected );
    })
    
    test('startSaveNote debe actualizar una nota', async() => {
        const note = {
            id: 'PtzkdE7EqZp0rby9h7sR',
            title: 'Titulo',
            body: 'body'
        }
        
        await store.dispatch( startSaveNote( note ));
        
        const actions = store.getActions();
        
        expect( actions[0].type ).toBe(types.notesUpdated);
        
        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();
        
        expect( docRef.data().title ).toBe( note.title );
        
        
    })
    
    test('startUploading debe actualizar el url', async() => {
        
        const file = new File([], 'foto.jpg');
        
        await store.dispatch( startUploading( file ) );
        
        
        const docRef = await db.doc('/TESTING/journal/notes/PtzkdE7EqZp0rby9h7sR').get();
        
        expect( docRef.data().url ).toBe('https://hola-mundo.com/cosa.jpg');
    })
    
    
    
    
})
