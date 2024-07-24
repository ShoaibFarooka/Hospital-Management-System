import React from 'react';
import { useState, useEffect } from 'react';
import { BiSearchAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { BsBank } from "react-icons/bs";
import { AiOutlineMail } from 'react-icons/ai';
import { BsBell } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { GrContact } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";
import { BsGrid1X2 } from "react-icons/bs";


function NavBar({ page, setPage }) {

    const [isMobile, setIsMobile] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        }
        else {
            setIsMobile(false);
        }
    }, []);
    useEffect(() => {
        setShowMenu(false);
    }, [page]);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }
    const handleClick = (page_number) => {
        setPage(page_number);
    }
    return (
        <div className=''>
            {isMobile ?
                <>
                    <div className="main-panel">
                        {/* <!-- Navbar --> */}
                        <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent mobile-navbar">
                            <div className="container-fluid">
                                <div className="navbar-wrapper">
                                    <div className="navbar-toggle">
                                        <button onClick={toggleMenu} type="button" className="navbar-toggler">
                                            <span className="navbar-toggler-bar bar1"></span>
                                            <span className="navbar-toggler-bar bar2"></span>
                                            <span className="navbar-toggler-bar bar3"></span>
                                        </button>
                                    </div>
                                    <Link className="navbar-brand" to="#">{page === '1' ? 'Doctor Dashboard' : page === '2' || page === '4' ? 'Patient Dashboard' : 'Paper Dashboard 2'}</Link>
                                </div>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-bar navbar-kebab"></span>
                                    <span className="navbar-toggler-bar navbar-kebab"></span>
                                    <span className="navbar-toggler-bar navbar-kebab"></span>
                                </button>
                            </div>
                            {showMenu &&
                                <div className='mobile-slider'>
                                    <div className="mobile-menu" data-color="white" data-active-color="danger">
                                        <div className="">
                                            <ul className="mobile-slider-list">
                                                <li onClick={(e) => handleClick('1')} className={page === '1' ? 'mobile-active' : ''}>
                                                    <Link to="/">
                                                        <div className='icon-container'>
                                                            <BsBank className='slider-icon' />
                                                            <p className='icon-title'>Dashboard</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li onClick={(e) => handleClick('2')} className={page === '2' ? 'mobile-active' : ''}>
                                                    <Link to="/messages">
                                                        <div className='icon-container'>
                                                            <AiOutlineMail className='slider-icon' />
                                                            <p className='icon-title'>Messages</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li onClick={(e) => handleClick('3')} className={page === '3' ? 'mobile-active' : ''}>
                                                    <Link to="/alerts">
                                                        <div className='icon-container'>
                                                            <BsBell className='slider-icon' />
                                                            <p className='icon-title'>Alerts</p>
                                                        </div>

                                                    </Link>
                                                </li>
                                                <li onClick={(e) => handleClick('4')} className={page === '4' ? 'mobile-active' : ''}>
                                                    <Link to="/patient">
                                                        <div className='icon-container'>
                                                            <IoPersonCircleOutline className='slider-icon' />
                                                            <p className='icon-title'>Patient</p>
                                                        </div>

                                                    </Link>
                                                </li>
                                                <li onClick={(e) => handleClick('5')} className={page === '5' ? 'mobile-active' : ''}>
                                                    <Link to="/doctor-profile">
                                                        <div className='icon-container'>
                                                            <IoPerson className='slider-icon' />
                                                            <p className='icon-title'>Doctor Profile</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li onClick={(e) => handleClick('6')} className={page === '6' ? 'mobile-active' : ''}>
                                                    <Link to="/contact">
                                                        <div className='icon-container'>
                                                            <GrContact opacity={0.6} className='slider-icon mob-icon' />
                                                            <p className='icon-title'>Contact</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            }
                        </nav>
                        {/* <!-- End Navbar --> */}

                    </div>
                </> :
                <div className="main-panel">
                    {/* <!-- Navbar --> */}
                    <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
                        <div className="container-fluid">
                            <div className="navbar-wrapper">
                                <Link className="navbar-brand" to="#">{page === '1' ? 'Doctor Dashboard' : page === '2' || page === '4' ? 'Patient Dashboard' : 'Paper Dashboard 2'}</Link>
                            </div>
                            <div style={{marginBottom:'15px'}} className="collapse navbar-collapse justify-content-end" id="navigation">
                                <form>
                                    <div className="input-group no-border">
                                        <input style={{ backgroundColor: 'white' }} type="text" className="form-control" placeholder="Search..." />
                                        <BiSearchAlt className='search-icon' />
                                    </div>
                                </form>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link btn-magnify" href="#">
                                        <BsGrid1X2 style={{fontSize:'17px'}}/>
                                        </a>
                                    </li>
                                    <li className="nav-item btn-rotate dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <BsBell style={{fontSize:'17px', marginRight:'5px'}}/>
                                            <p>
                                                <span className="d-lg-none d-md-block">Some Actions</span>
                                            </p>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link btn-rotate" href="#">
                                        <FiSettings style={{fontSize:'17px'}}/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    {/* <!-- End Navbar --> */}
                </div>
            }
        </div>
    );
}

export default NavBar;
