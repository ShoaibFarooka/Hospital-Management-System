import React from 'react';
import '../Styles/Slider.css';
import { NavLink } from 'react-router-dom';
import Image from '../Images/logo.png';
import Image1 from '../Images/doctor.jpg';
import Image2 from '../Images/patient.png';

function Slider() {
    return (
        <div className="Slider">
            <div className="sidebar">
                <div className='title-container'>
                    <img src={Image} alt='Loading...' />
                </div>
                <div className="profile-options">
                    <div className='doctor-profile'>
                        <NavLink to='/create-doctor' activeclassname='active-link'>
                            <img src={Image1} alt='Loading...' />
                            <p>Doctor Profile</p>
                        </NavLink>
                    </div>
                    <div className='patient-profile'>
                        <NavLink to='/create-patient' activeclassname='active-link'>
                            <img src={Image2} alt='Loading...' />
                            <p>Patient Profile</p>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slider;
