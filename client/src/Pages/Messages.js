import React from 'react';
import { useState, useRef } from 'react';
import '../Styles/main.css';
import Image1 from '../Images/doctor.jpg';
import Image2 from '../Images/faces/joe-gardner-2.jpg';

function Messages() {
    return (
        <div className="wrapper">
            <div className='main-panel'>
                <div className="content">
                    <div className="card">
                        <div className="card-body">
                            <div className="row bootstrap snippets bootdeys">
                                <div className="col-md-8 col-sm-12">
                                    <div className="comment-wrapper">
                                        <div className="panel panel-info">
                                            <div className="panel-body">

                                                <ul className="media-list">
                                                    <li className="media">
                                                        <a href="#" className="pull-left">
                                                            <img src={Image1} alt="" className="img-circle" />
                                                        </a>
                                                        <div className="media-body">
                                                            <span className="text-muted pull-right">
                                                                <small className="text-muted">30 min ago</small>
                                                            </span>
                                                            <strong className="text-success">Dr.Abdullah Al-Harbi</strong>
                                                            <p>
                                                                Good morning NursePro! I have a patient, Mr. Johnson with an ID 2392. Could you please ask him about his vital signs and gather some information about his symptoms during the last two week?
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li className="media">
                                                        <a href="#" className="pull-left">
                                                            <img src={Image2} alt="" className="img-circle" />
                                                        </a>
                                                        <div className="media-body">
                                                            <span className="text-muted pull-right">
                                                                <small className="text-muted">30 min ago</small>
                                                            </span>
                                                            <strong className="text-success">NursePro</strong>
                                                            <p>
                                                                Good morning, Doctor. Sure, I'll talk to Mr. Johnson right away. I'll summarize his temperature, blood pressure, pulse, and respiratory rate. I'll also ask him about the duration and severity of his symptoms and inform you.
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li className="media">
                                                        <a href="#" className="pull-left">
                                                            <img src={Image1} alt="" className="img-circle" />
                                                        </a>
                                                        <div className="media-body">
                                                            <span className="text-muted pull-right">
                                                                <small className="text-muted">30 min ago</small>
                                                            </span>
                                                            <strong className="text-success">Abdullah Al-Harbi</strong>
                                                            <p>
                                                                Thank you, Nurse. Additionally, please inquire if Mr. Johnson has any underlying medical conditions or if he has been in contact with someone who tested positive for COVID-19. It's important to assess his risk factors.
                                                            </p>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <hr />
                                                <textarea style={{ paddingLeft: "5px" }} className="form-control" placeholder="   write a comment..." rows="3"></textarea>
                                                <br />
                                                <button type="button" className="btn btn-info pull-right">Send</button>
                                                <div className="clearfix"></div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;
