import axios from "axios";
import React, { Fragment, useState, useEffect, useContext } from "react";
import {Link, useNavigate} from "react-router-dom";
import { PermissionContext } from "../context/PermissionContext";
import { UserContext } from "../context/UserContext";

const Nav = () => {
  const {user, setUser} = useContext(UserContext);
  const {permission, setPermission} = useContext(PermissionContext)

  const navigate = useNavigate();

  // LOG OUT FUNCTION
  const logout = async(e) => {
    e.preventDefault();

    const refreshToken = localStorage.getItem('token')

    axios.delete('http://localhost:3000/auth/logout', {
      headers: {
        token: refreshToken
      }
    })
    .then(() => {
      localStorage.removeItem('token')
      setUser("")
      setPermission(0)
      navigate('/')
    }, (error) => {
      console.log(error)
    })
  };
    
    return ( 
        <Fragment>
          <div><h5>{user.email}</h5><h4>{permission}</h4></div>
            
            <nav className="navbar navbar-expand-lg" id="main-nav">
                <div className="container-fluid">
                  <Link to="/">Crystal Coast Cuisine</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                          Where are you eating?
                        </a>
                        <ul className="dropdown-menu" role="menu" aria-labelledby="navbarDropdown">
                          <li><a className="dropdown-item" href="#">Atlantic Beach</a></li>
                          <li><a className="dropdown-item" href="#">Beaufort</a></li>
                          <li><a className="dropdown-item" href="#">Morehead City</a></li>
                          <li><hr className="dropdown-divider"/></li>
                          <li><a className="dropdown-item" href="#">What's open now?</a></li>
                          <li><hr className="dropdown-divider"/></li>
                          <li>
                            <a className="dropdown-item" href="#">Search by mealtime &raquo;</a>
                            <ul className="dropdown-menu dropdown-submenu">
                                <li><a className="dropdown-item" href="#" >Breakfast</a></li>
                                <li><a className="dropdown-item" href="#" >Lunch</a></li>
                                <li><a className="dropdown-item" href="#" >Dinner</a></li>
                            </ul>
                            </li>
                        </ul>
                      </li>
                    
                      <li className="nav-item dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-expanded="false">
                            User Options
                          </button>
                          <ul className="dropdown-menu" role="menu" aria-labelledby="navbarDropdown">
                            <li><p>Restaurant Page</p></li>
                            <li><p>Edit Page</p></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><p>Add Specials</p></li>
                            <li><p>Update/Delete Specials</p></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><p>Add Menu</p></li>
                            <li><p>Delete Menu</p></li>
                            <li><hr className="dropdown-divider"/></li>
                        </ul>
                      </li>
                      
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                       <li>
                        <Link to='/about'>About Us</Link>
                      </li>
                      {permission === 0 ? (
                        <li className="nav-item">
                        <Link to='/login'>Log In</Link>
                      </li>
                      ) : (
                        <li className="nav-item">
                          <button type="button" onClick={logout}>Log Out</button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
            </nav>

        </Fragment>
    );
}
 
export default Nav;