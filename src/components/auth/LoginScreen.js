import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth'
import validator from 'validator'
import Swal from 'sweetalert2'

export const LoginScreen = () => {
    
    const dispatch = useDispatch()
    
    const { loading } = useSelector( state => state.ui);
    
    const [ formValues, handelInputChange] = useForm({
        email: '',
        password: ''        
    })
    
    const {email, password} = formValues;
    
    const handleLogin = (e) => {
        e.preventDefault();
        if(isFormValid()){
            dispatch( startLoginEmailPassword(email, password));
        }
    }
    
    const showError = (err) => {
        Swal.fire('Error', err, 'error');
    }  
    
    const isFormValid = () => {
       if ( !validator.isEmail(email) ){
            showError('Email is not valid');
            return false;
        } else if ( password.trim().length === 0){
            showError('Password is not valid');
            return false;
        }
        
        return true;
    }
    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }
    
    return (
        <>
            <h3 className="auth__title">Login</h3>
            
            <form 
                className="animate__animated animate__fadeIn animate__faster"
                onSubmit={ handleLogin }
            >
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
                    
                <button
                    disabled={ loading }
                    type="submit"
                    className="btn btn-primary .btn-block"
                >
                    Login
                </button>
                
                
                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                
                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>
            </form>
        </>
    )
}
