import React from 'react';
import Image from 'next/image';
import { AiFillGithub } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';

const About = () => {
    return (<div id="about" className="about margin-pos">
        <Image className="profile-img"
            src="/images/yana_krukovets.jpg"
            height={160} 
            width={155} 
            alt="Yana Krukovets photo"
        />
        <h3>Who am I?</h3>
        <p>My name is Yana. I am a Web Developer based in Ottawa, Canada.
            I like to code things from scratch, and enjoy bringing ideas to life in the browser.
        </p>

        <h3>Skills</h3>
        <p>HTML, CSS, JavaScript, ReactJS, jQuery, Bootstrap, PHP, mySQL</p>

        <h3>Experience</h3>
        <p><span className="bold">Jan 2013 - May 2016:</span> Frontend Developer at 
        <a href="https://www.softserveinc.com" className="italic"> SoftServe </a>Dnipro, Ukraine</p>
        <p><span className="bold">2011 - 2013:</span> Teacher C++ at 
        <a href="https://itstep.org" className="italic"> IT Academy "Step" </a>Dnipro, Ukraine</p>
        <a href="https://github.com/YanaKrukovets"><AiFillGithub className="social-media" /></a>
        <a href="https://www.linkedin.com/in/yana-krukovets-25658260/"><AiFillLinkedin className="social-media" /></a>

    </div>);
}

export default About;