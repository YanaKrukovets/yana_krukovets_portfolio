import React from 'react';
import Trees from './Trees';
import Navbar from './Navbar';

const HeaderBanner = () => {
  
    return (<> 
        <Navbar />
        <div id="welcome" className="center-text">
            <img />
                <h1>Hello! My name is Yana.</h1>
                <h2>I am a Web Developer</h2>
                <h3>Let&apos;s make a new life in the Network</h3>
                <a className="my-work-btn" href="#projects">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Check my work
                </a>
                <a className="my-work-btn" href="mailto:webmaster@example.com">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Contact me
                </a>
        </div>
        <Trees />
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
           
        <div className="pPos">
            <div className="pyramid one"></div>
            <div className="pyramid two"></div>
            <div className="pyramid three"></div>
        </div> 
    </>);
}

export default HeaderBanner;
