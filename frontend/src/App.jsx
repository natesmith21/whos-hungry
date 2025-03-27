import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import dbApi from './dbApi';
import Routes from './components/Routes';
import UserContext from './UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import { jwtDecode } from 'jwt-decode';
import LoadingPage from './components/LoadingPage';
import NavBar from './components/NavBar';
import { Nav } from 'reactstrap';

const TOKEN_STORAGE = 'user-token';

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE);
  const [userLoaded, setUserLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(function loadUser() {

    async function getCurrentUser() {
      if (token){
        try {
          let { username } = jwtDecode(token);
          dbApi.token = token;
          let currentUser = await dbApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (e) {
          console.error('error:', e)
          setCurrentUser(null);
        }
      }
      setUserLoaded(true);
    }
    setUserLoaded(false);
    getCurrentUser()
  }, [token]);

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  const login = async (data) => {
    const { token } = await dbApi.getToken(data);
    setToken(token);
    return {success: true};
  }
  const register = async (data) => {
    const token = await dbApi.makeUser(data);
    console.log(token);
  }

  if (!userLoaded) return <LoadingPage />;

  return (
    <div className='App'>
      <BrowserRouter>
      <UserContext.Provider value = {{ currentUser, setCurrentUser }}>
        <NavBar logout= { logout }/>
      <main>
          <Routes login={login} register={register} />
        </main>
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
