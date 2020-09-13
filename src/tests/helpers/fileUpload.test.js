const { fileUpload } = require("../../helpers/fileUpload");
import cloudinary from 'cloudinary'


cloudinary.config({ 
    cloud_name: 'orlinalvarado', 
    api_key: '526958464121662', 
    api_secret: 'JwoqfQ3GjBYUKD0T2bfZoCypeww' 
  });
  
describe('Prueba en fileUpload', () => {
    
    test('Debe de cargar un archivo y retornar el URL', async(done) => {
        const resp = await fetch('https://cdn.icon-icons.com/icons2/930/PNG/512/camera_icon-icons.com_72364.png');
        const blob = await resp.blob();
        
        const file = new File([blob], 'foto.png');
        
        const url = await fileUpload( file);
        
        expect( typeof url ).toBe('string');
        
        //Borar imagen por ID
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.png', '');
        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done();
        });
    })
    
    test('Debe de retornar un error', async() => {
        
        const file = new File([], 'foto.png');
        
        const url = await fileUpload( file);
        
        expect( url ).toBe( null );
    })
    
})
