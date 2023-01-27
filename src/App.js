import React, {Fragment, useMemo, useState} from "react";
import './App.css';

// routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Nav from "./components/Nav";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import RegisterRestaurant from "./components/RegisterRestaurant";
import { UserContext } from "./context/UserContext";
import { PermissionContext } from "./context/PermissionContext";
import Restaurant from "./components/Restaurant";

function App() {
  const [user, setUser] = useState("");
  const [permission, setPermission] = useState(0)
  const userProvider = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <Fragment>
      <Router>
        <UserContext.Provider value={userProvider}>
        <PermissionContext.Provider value={{permission, setPermission}}>
        <Nav/>
        
          <Routes>
            <Route path='/' element={<Homepage/> } />
            <Route path='/about' element={<About/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/register_restaurant/:token' element={<RegisterRestaurant/>} />
            <Route path='/restaurants/:user_id' element={<Restaurant/>} />
          </Routes>
        </PermissionContext.Provider>
        </UserContext.Provider>
      </Router>
    </Fragment>
  );
}

export default App;
