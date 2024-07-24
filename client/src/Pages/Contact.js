import React from 'react';
import { useState, useRef } from 'react';
import '../Styles/main.css'

function Contact() {

    return (
        <div className="contact">
            <div className="main-panel">
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title"> Contact Administration</h4>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label className='contact-label' htmlFor="name">Subject:</label><br></br>
                                            <input type="text" className="form-control common-input" id="name" placeholder="Enter your Subject" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message">Message:</label><br></br>
                                            <textarea className="form-control common-input" id="message" rows="5" placeholder="Enter your message"></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
