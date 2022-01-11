import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';

export function NavBar(props) {
  let navContent = null

  if(props.userState) {
    let firstName = props.userState.displayName.split(' ')[0]
    navContent = (
      <div className="container-fluid">
        <a className="navbar-brand" href="/#">
          <img src="img/noun_journal_2292490.png" alt="a journal icon" className="d-inline-block align-top" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active nav-tab" aria-current="page" exact to="/">My Journal</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/form">Daily Entry</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="/#">Explore</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">More</a>
            </li>
          </ul>
          <form className="d-flex">
            <label htmlFor="search_bar" className="labelhide">Search Bar</label>
            <input className="form-control me-2 move-back" id="search_bar" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit" aria-label="search"><AiOutlineSearch /></button>
          </form>
          <button className="btn btn-outline-success" type="submit" aria-label="account"><AiOutlineUser />{firstName}</button>
          <button className="btn btn-outline-success" type="submit" aria-label="log out" onClick={props.handleLogOut}>Log out</button>
        </div>
      </div>
    );

  } else {
    navContent = (
      <div className="container-fluid justify-content-center">
        <a className="navbar-brand" href="/#">
          <img src="img/noun_journal_2292490.png" alt="a journal icon" className="d-inline-block align-top" />
        </a>
      </div>
    );

  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light nav-color">
      {navContent}
    </nav>

  );

}


export function Footer() {
  return (
    <footer>
      <p>Author: Emelia Hughes, Jerry Wang, Jossie Choi</p>
      <p>&copy; Copyright 2021</p>
    </footer>

  );

}