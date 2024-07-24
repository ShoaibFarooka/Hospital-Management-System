import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSound from 'use-sound';
import notificationSound from './notificationSound.mp3';
import "./App.css";
import Dashboard from './Pages/Dashboard';
import Messages from './Pages/Messages';
import Alerts from './Pages/Alerts';
import Patient from './Pages/Patient';
import Doctor from './Pages/Doctor';
import Contact from './Pages/Contact';
import Slider from './Components/Slider';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';

function App() {
  const [page, setPage] = useState('1');
  const [notificationsFromServer, setNotificationsFromServer] = useState('');
  const [playNotification] = useSound(notificationSound);
  const [patientName, setPatientName] = useState('');

  useEffect(() => {

    //fetch Notifications
    fetch('https://carewave-a0d6829dab84.herokuapp.com/fetch-notifications')
      .then(response => response.json())
      .then(data => {
        setNotificationsFromServer(data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });

    const socket = io('https://carewave-a0d6829dab84.herokuapp.com');

    socket.on('connect', () => {
      console.log('Connected to Socket.IO Server');
    });

    socket.on('reportsGenerated', (response) => {
      const patient_name = response.User_Name;
      setPatientName(patient_name);
      const warning = response.Data_Monitoring_Service_Report.data;
      playNotification();
      toast.error(`${warning} \n Patient Name: ${patient_name}`, {
        position: 'top-right', // Set the toast position
        autoClose: false,
        progress: false,
        enableHtml: true,
        bodyClassName: 'toast-message',
      });
    });

    socket.on('AllNotifications', (response) => {
      setNotificationsFromServer(response);
    });

    socket.on('SensorNotification', (response) => {
      playNotification();
      toast.error(response, {
        position: 'top-right', // Set the toast position
        autoClose: false,
        progress: false,
        enableHtml: true,
        bodyClassName: 'toast-message',
      });
    });

    socket.on('error', (err) => {
      console.error('Socket.IO Error:', err);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Slider page={page} setPage={setPage} />
        <NavBar page={page} setPage={setPage} />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/alerts" element={<Alerts notifications={notificationsFromServer} />} />
          <Route path="/patient" element={<Patient patientName={patientName} setPatientName={setPatientName}/>} />
          <Route path="/doctor-profile" element={<Doctor />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
