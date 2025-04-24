import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import dbApi from './dbApi';
import NavRoutes from './components/NavRoutes';
import UserContext from './UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import { jwtDecode } from 'jwt-decode';
import LoadingPage from './components/LoadingPage';
import NavBar from './components/NavBar';

const TOKEN_STORAGE = 'user-token';

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE);
  const [userLoaded, setUserLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState();

  useEffect(function loadUser() {

    async function getCurrentUser() {
      if (token){
        try {
          let { username } = jwtDecode(token);
          dbApi.token = token;
          let currentUser = await dbApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          const userSaves = await dbApi.getSavedRecipes(currentUser.username);
          setSavedRecipes(new Set(userSaves.recipesList))
        } catch (e) {
          console.error('error:', e)
          setCurrentUser(null);
        }
      }
      setUserLoaded(true);
    }
    setUserLoaded(false);
    getCurrentUser();
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
    setToken(token);
    return {success: true};
  }

  const hasSaved = (id) => savedRecipes.has(id);

  const addToSaves = (id, title) => {
    if (hasSaved(id)) return;

    dbApi.saveRecipe(id, {username: currentUser.username, recipeId: id, recipeTitle: title})
    setSavedRecipes(new Set([...savedRecipes, id]));
  }

  const removeFromSaves = (id) => {
    setSavedRecipes((savedRecipes) => {
      let savedArr = [...savedRecipes];
      return savedArr.filter(r => r !== id)
    })
    dbApi.removeSavedRecipe(currentUser.username, id)
  }

  if (!userLoaded) return <LoadingPage />;


  return (
    <div className='App'>
      <BrowserRouter>
      <UserContext.Provider value = {{ currentUser, setCurrentUser, hasSaved, addToSaves, removeFromSaves }}>
        <NavBar logout= { logout }/>
        <main>
          <NavRoutes login={login} register={register} />
        </main>
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
