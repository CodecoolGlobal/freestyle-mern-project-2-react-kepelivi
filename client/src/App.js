import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Pokedex from './components/Pokedex';
import Locations from './components/Locations';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import ErrorPage from './components/ErrorPage';
import User from './components/User';

function App() {
  const [loggedUser, setLoggedUser] = useState(undefined);
  const url = 'http://localhost:9000/pokemon/users';

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NavBar {...{ loggedUser }} />}>
          <Route index element={<Home />} />
          <Route path='pokedex' element={<Pokedex />}></Route>
          <Route path='locations' element={<Locations {...{ loggedUser, url }} />}></Route>
          <Route path='register' element={<Register {...{ url }} />}></Route>
          <Route path='login' element={<Login {...{ url, setLoggedUser }} />}></Route>
          <Route path='user' element={<User {...{ loggedUser, setLoggedUser, url }} />}></Route>
          <Route path='logout' element={<Logout {...{ setLoggedUser }} />}></Route>
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
