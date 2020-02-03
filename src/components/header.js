
import React from "react";
import '../styles/header.css';
import { Link } from "gatsby";
import  withSession from './withSession';
import SignOut from './sign-out';
import $ from "jquery";






const Header = ({ getCurrentUser }) => {

const toggle = () => {
  $(".header_wrapper").slideToggle().css({display:"flex"})
}


if(!getCurrentUser){
  return (
    <header>
      <div className="toggleMenuWrapper">
    <img src ={require('../images/toggle.png')} alt="toggle" onClick={() => toggle()} className="toggleMenu"/>
    </div>
      <nav className="header_wrapper">
        <li><Link activeClassName="active" to="/"> Home </Link></li>
        <li><Link activeClassName="active" to="/search"> Search </Link></li>
        <li><Link activeClassName="active" to="/auth/sign-in"> LogIn </Link></li>
        <li><Link activeClassName="active" to="/auth/sign-up"> SignUp </Link></li>
      </nav>
    </header>
  )
};

return(
  <header>
    <h4>Welcome , <strong>{getCurrentUser.username}</strong></h4>
    <div className="toggleMenuWrapper">
    <img src ={require('../images/toggle.png')} alt="toggle" onClick={() => toggle()} className="toggleMenu"/>
    </div>
    <nav className="header_wrapper">
    <li><Link activeClassName="active" to="/"> Home </Link></li>
    <li><Link activeClassName="active" to="/search"> Search </Link></li>
    <li><Link activeClassName="active" to="/create-event"> Create_Event </Link></li>
    <li><Link activeClassName="active" to="/profile"> Profile </Link></li>
    <li><SignOut /></li>
    </nav>
  </header>
);
};



export default withSession(Header);
