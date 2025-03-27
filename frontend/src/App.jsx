import React, { useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import dbApi from './dbApi';
import Routes from './components/Routes';


function App() {
  const [token, setToken] = useState();


  const login = async (data) => {
    const { token } = await dbApi.getToken(data);
    setToken(token);
    return {success: true};
  }
  const register = async (data) => {
    const token = await dbApi.makeUser(data);
    console.log(token);
  }

  return (
    <>
      <BrowserRouter>
        <main>
          <Routes login={login} register={register} />
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
