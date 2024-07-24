import React from 'react';
import { useState, useRef } from 'react';
import '../Styles/main.css';
import { BsBell } from "react-icons/bs";

function Alerts({ notifications }) {
    return (
        <div className="patient">
            <div className=''>
                <div className='main-panel'>
                    <div className="content">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title">Alerts</h5>
                                        <p className="card-category">This sections list all the notifications and alerts related to Patients</p>
                                    </div>
                                    {notifications.slice().reverse().map((notification) => (
                                        <div style={{ margin: '0px', padding: '0px' }} key={notification._id} className="card-body">
                                            <div style={{ margin: '0px', padding: '0px' }} className="row">
                                                <div className="col-md-12">
                                                    <div className="card-body">
                                                        <div className="alert alert-danger alert-with-icon alert-dismissible fade show alert-div" data-notify="container">
                                                            <span data-notify="icon" className=""><BsBell style={{ marginBottom: '20px', fontSize: '25px' }} /></span>
                                                            <span data-notify="message">Patient Name: {notification.name}<br />{notification.data}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Alerts;
