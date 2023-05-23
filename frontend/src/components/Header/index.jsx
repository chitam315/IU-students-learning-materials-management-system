import React from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "../../config/PATH.JS";
// import Button from "../Button";
import "./style.scss";
import { AuthProvider, useAuth } from "../AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const _logout = (ev) => {
    ev.preventDefault();
    logout();
  };
  if (user) {
    return (
      <header id="header">
        <NavLink to={PATH.index} >
          <img src="/img/logo.jpg" alt="" />
        </NavLink>
        <div className="right">
          {/* <p>Hello {user.username}</p> */}
          <button onClick={_logout}>LOG OUT</button>
        </div>
      </header>
    );
  }

  return(
    <header id="header">
        <NavLink to={PATH.index} >
          <img src="/img/logo.jpg" alt="" />
        </NavLink>
      </header>
  )
  
}

export default Header;
