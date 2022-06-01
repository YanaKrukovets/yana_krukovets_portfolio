import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {

    const showLinks = (event) => {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
      }

    return (
        <nav>
        <div className="topnav" id="myTopnav">
            <div className="header-right">
                <button type="button" className="icon" onClick={(event) => showLinks(event)}>
                    <GiHamburgerMenu />
                </button> 
                <a href="#welcome">Home</a>
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
            </div>
        </div>
    </nav>
    );
}

export default Navbar;