import React,  { useState } from 'react';
import siteLogo from './assets/siteLogo.svg';
import { GoogleLogout, GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import './header.css';
const env = require('./environment/environment');

const Header = () => {
    const [user, setUser] = useState<GoogleLoginResponse["profileObj"]>();
    const loginSuccess = (response: any) => {
        console.log(response);
        if (response && response.profileObj) {
            setUser(response.profileObj);
        }
    };

    const loginFail = (error: any) => {
        console.log('Login failed with following message');
        console.log(error);
    }
    
    const logout = () => {
        setUser(undefined);
    }

    const headerContext = () => {
        if (user) {
            return (
                <span className="header-authed">
                    <h1 className="welcome-message">Welcome, {user.name}</h1>
                    <GoogleLogout
                        clientId={env.clientId}
                        buttonText="Logout"
                        onLogoutSuccess={logout}
                        />
                </span>
            )
        } else {
            return(
                <div>
                    <GoogleLogin
                        clientId={env.clientId} 
                        buttonText="Login" onSuccess={loginSuccess} 
                        onFailure={loginFail}
                        isSignedIn={true}
                        />
                </div>
            );
        }
    }

    return (
        <div className="app-header">
            <img src={siteLogo} className="Site-logo" alt="logo" />
            <div className="header-context">
                {headerContext()}    
            </div>
        </div>
    );
}

export default Header;