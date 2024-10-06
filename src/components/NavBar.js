import React from 'react';
import '../stylesheets/NavBar.css';

const Navbar2 = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href = "/"><img src= 'https://i.imgur.com/UzM1Uxd.png'></img></a>
        {}
      </div>
      <div className="navbar-links">
        <ul>
          <li><a href="/quiz"><b>Quiz</b></a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar2;
