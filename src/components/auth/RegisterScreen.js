import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
// import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

   const dispatch = useDispatch()
   
   //const { msgError } = useSelector( state => state.ui);
   
   
    const showError = (err) => {
        Swal.fire('Error', err, 'error');
    }   
   const [ formValues, handelInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    
    const handleRegister = (e) => {
        e.preventDefault();
        
        if( isFormValid()){
            dispatch( startRegisterWithEmailPasswordName(email, password, name));
        } 

    }
    
    
    const isFormValid = () => {
        
        if(name.trim().length === 0){
            // dispatch(setError('Name is required'))
            showError('Name is required');
            return false;
        } else if ( !validator.isEmail(email) ){
            showError('Email is not valid');
            // dispatch(setError('Email is not valid'))
            return false;
        } else if ( password !== password2 || password.length < 5){
            showError('Email is not valid');
            // dispatch(setError('Password should be at least 6 charcaters and match each other'));
            return false;
        }
        
        //dispatch( removeError())
        return true;
    }
    const {name, email, password, password2} = formValues;
    return (
        <>
            <h3 className="auth__title">Register</h3>
            
            <form 
                className="animate__animated animate__fadeIn animate__faster"
                onSubmit={ handleRegister }
            >
                
                {/* {
                    msgError &&
                    (
                    <div className="auth__alert-error">
                        { msgError }
                    </div>
                    )
                } */}
                <input 
                    type="text"
                    placeholder="Name"
                    name="name" 
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handelInputChange }
                />
                
                <input 
                    type="text"
                    placeholder="Email"
                    name="email" 
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handelInputChange }
                />
                <input 
                    type="password"
                    placeholder="Password"
                    name="password" 
                    className="auth__input"
                    value={ password }
                    onChange={ handelInputChange }
                />
                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2" 
                    className="auth__input"
                    value={ password2 }
                    onChange={ handelInputChange }
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>
                
                
                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>
            </form>
        </>
    )
}
