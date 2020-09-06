import React, { useEffect, useState } from 'react'
import { AuthRouter } from './AuthRouter'
import { useDispatch } from 'react-redux';
import {
    Switch,
    Redirect,
    HashRouter
  } from "react-router-dom";
import { firebase } from '../firebase/firabase-config'
import { JournalScreen } from '../components/journal/JournalScreen'
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
    
    const dispatch = useDispatch();
    
    const [checking, setChecking] = useState(true);
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged( async(user) => {
            if( user?.uid ){
                dispatch( login(user.uid, user.displayName));
                setIsLoggedIn(true);
                
                dispatch( startLoadingNotes( user.uid ) );
                
            } else{
                setIsLoggedIn(false);
            }
            
            setChecking(false);
        })
       
    }, [dispatch, setChecking, setIsLoggedIn])
    
    if(checking){
        return (
            <h1>Wait...</h1>
        )
    }
    return (
        <HashRouter basename="/">
            <div>
            <Switch>
                <PublicRoute
                    path="/auth"
                    component={ AuthRouter }
                    isAuthenticated={ isLoggedIn} 
                />
                
                <PrivateRoute 
                    exact
                    isAuthenticated={ isLoggedIn } 
                    path="/"
                    component={ JournalScreen }
                />
                <Redirect to="/auth/login" />
            </Switch>
           
        </div>
        </HashRouter>
    )
}
