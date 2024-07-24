import React from 'react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/main.css'
import Image from '../Images/logo.png';
import { BsBank } from "react-icons/bs";
import { AiOutlineMail } from 'react-icons/ai';
import { BsBell } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { BiMessageDots } from "react-icons/bi";



function Slider({ page, setPage }) {
    const handleClick = (page_number) => {
        setPage(page_number);
    }
    return (
        <div className="slider">
            <div className="sidebar">
                <div className="logo">
                    <Link onClick={(e) => handleClick('1')} to="/" className="">
                        <div className="">
                            <img style={{width:'300px', height:'100px'}} src={Image} />
                        </div>
                    </Link>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav slider-list">
                        <li onClick={(e) => handleClick('1')} className={page === '1' ? 'active' : 'non-active'}>
                            <Link to="/">
                                <div className='icon-container'>
                                    <BsBank className='slider-icon' />
                                    <p className='icon-title'>Dashboard</p>
                                </div>
                            </Link>
                        </li>
                        <li onClick={(e) => handleClick('2')} className={page === '2' ? 'active' : 'non-active'}>
                            <Link to="/messages">
                                <div className='icon-container'>
                                    <AiOutlineMail className='slider-icon' />
                                    <p className='icon-title'>Messages</p>
                                </div>
                            </Link>
                        </li>
                        <li onClick={(e) => handleClick('3')} className={page === '3' ? 'active' : ''}>
                            <Link to="/alerts">
                                <div className='icon-container'>
                                    <BsBell className='slider-icon' />
                                    <p className='icon-title'>Alerts</p>
                                </div>

                            </Link>
                        </li>
                        <li onClick={(e) => handleClick('4')} className={page === '4' ? 'active' : ''}>
                            <Link to="/patient">
                                <div className='icon-container'>
                                    <IoPersonCircleOutline className='slider-icon' />
                                    <p className='icon-title'>Patient</p>
                                </div>

                            </Link>
                        </li>
                        <li onClick={(e) => handleClick('5')} className={page === '5' ? 'active' : ''}>
                            <Link to="/doctor-profile">
                                <div className='icon-container'>
                                    <IoPerson className='slider-icon' />
                                    <p className='icon-title'>Doctor Profile</p>
                                </div>
                            </Link>
                        </li>
                        <li onClick={(e) => handleClick('6')} className={page === '6' ? 'active' : ''}>
                            <Link to="/contact">
                                <div className='icon-container'>
                                    <BiMessageDots className='slider-icon' />
                                    <p className='icon-title'>Contact</p>
                                </div>

                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    );
}

export default Slider;
