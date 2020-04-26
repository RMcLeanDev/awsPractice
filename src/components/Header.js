import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/Header.scss';

function Header(){

  return(
    <div className="header">
      <Link to='/'>Home</Link>
      <h2>NKGL</h2>
    </div>
  )
}

export default Header
