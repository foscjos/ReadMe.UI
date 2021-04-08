import logo from './logo.svg';
import './App.css';
import { GoogleLogout, GoogleLogin } from 'react-google-login';
import React, { useState } from 'react'
const env = require('./environment/environment');

function App() {
  const [user, setUser] = useState();
  const responseGoogle = (response) => {
    console.log(response);
    setUser(response.profileObj);
  };
  const logout = () => {
    setUser(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {user && (
          <h1>Welcome, {user.name}</h1>
        )}
        <GoogleLogin
          clientId={env.clientId} 
          buttonText="Login" onSuccess={responseGoogle} 
          onFailure={responseGoogle}
        />
        <GoogleLogout
          clientId={env.clientId}
          buttonText="Logout"
          onLogoutSuccess={logout}
        />
      </header>
    </div>
  );
}

export default App;
