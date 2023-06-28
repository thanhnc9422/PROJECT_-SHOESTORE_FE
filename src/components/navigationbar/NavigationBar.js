import React from 'react';
import './NavigationBar.scss';
import {Link, NavLink} from 'react-router-dom';
const NavigationBar = () => {
    return (
        <div class="topnav">
        {/* <a class="active" href="/todos">Todos</a> */}
        <NavLink to="/todos" activeClassName="active" exact ={true}>Todos</NavLink>
        <NavLink to="/listperson" activeClassName="active" exact ={true}>List Person</NavLink>
        {/* <a href="/todos">Todos</a>
        <a href="/listperson">List Person</a> */}
        {/* <a href="#contact">Contact</a>
        <a href="#about">About</a> */}
      </div>
    );
};

export default NavigationBar;