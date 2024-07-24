import React from 'react';
import { useState, useRef } from 'react';

function Footer() {
    return (
        <div className=''>
            <div className="main-panel">
                <footer className="footer footer-black  footer-white ">
                    <div className="container-fluid">
                        <div className="row">
                            <nav className="footer-nav">
                                <ul>
                                    <li><a href="https://www.creative-tim.com" target="_blank">Creative Tim</a></li>
                                    <li><a href="https://www.creative-tim.com/blog" target="_blank">Blog</a></li>
                                    <li><a href="https://www.creative-tim.com/license" target="_blank">Licenses</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Footer;
