import React, { useState } from "react";
import '../Styles/Create_Doctor.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateDoctor() {
    const [file, setFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
    });

    // Form Submit Handler
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            toast.error('Please upload profile image before submitting!', {
                position: 'top-right', // Set the toast position
                autoClose: false,
                progress: false,
            });
            return;
        }
        else if (formData.firstName === '' || formData.lastName === '' || formData.phoneNumber === '' || formData.email === '' || formData.password === '') {
            toast.error('Please fill out all fields before submitting!', {
                position: 'top-right', // Set the toast position
                autoClose: false,
                progress: false,
            });
            return;
        }
        else if (isSelected === false) {
            toast.error('Please read terms and conditions and check agree option before submitting!', {
                position: 'top-right', // Set the toast position
                autoClose: false,
                progress: false,
            });
            return;
        }

        // Trim and concatenate firstName and lastName
        const name = `${formData.firstName.trim()} ${formData.lastName.trim()}`;

        const dataToSend = new FormData();
        dataToSend.append('profile_picture', file);
        dataToSend.append('username', name);
        dataToSend.append('email', formData.email);
        dataToSend.append('password', formData.password);
        dataToSend.append('number', formData.phoneNumber);

        // setIsLoading(true);
        fetch('https://carewave-a0d6829dab84.herokuapp.com/create-doctor', {
            method: 'POST',
            body: dataToSend
        })
            .then((res) => {
                console.log(res.status);
                if (res.status === 201) {
                    toast.success('Doctor Created Successfully!', {
                        position: 'top-right', // Set the toast position
                        autoClose: false,
                        progress: false,
                    });

                    // Clear the form data
                    setFormData({
                        firstName: "",
                        lastName: "",
                        phoneNumber: "",
                        email: "",
                        password: "",
                    });
                    setFile(null);
                }
                else if (res.status === 409) {
                    toast.error('Doctor with this email already exist!', {
                        position: 'top-right', // Set the toast position
                        autoClose: false,
                        progress: false,
                    });
                }
                else if (res.status === 500) {
                    toast.error('Failed to Save doctor!', {
                        position: 'top-right', // Set the toast position
                        autoClose: false,
                        progress: false,
                    });
                }
                else {
                    toast.error('Internal Server Error!', {
                        position: 'top-right', // Set the toast position
                        autoClose: false,
                        progress: false,
                    });
                }

            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    };

    //Updates Value after every chage
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // File Change Handler
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Perform validation on the selected file (e.g., file type, size, etc.)
            setFile(selectedFile);
        }
    };

    //Toggle Checkbox
    const toggleCheckbox = (e) => {
        console.log('Triggerd');
        console.log(e.target.checked);
        setIsSelected(e.target.checked);
    }
    return (
        <div className="doctor-app-container">
            <div className="main-content">
                <div className="doctor-profile">
                    <h2>Doctor Profile</h2>
                    <form>
                        <div className="Name">
                            <input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                className="firstname"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                className="lastname"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            className="input"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            className="input"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="input-field input"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="input-field input"
                        />
                        <div className="checkbox-section">
                            <input onChange={toggleCheckbox} checked={isSelected} className="input" type="checkbox" />
                            <label>Do you agree to the terms and conditions?</label>
                        </div>
                        <button onClick={handleSubmit} type="submit">Register NOW</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default CreateDoctor;
