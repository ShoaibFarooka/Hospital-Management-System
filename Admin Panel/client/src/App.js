import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Slider from './Components/Slider';
import CreatePatient from './Pages/Create_Patient';
import CreateDoctor from './Pages/Create_Doctor';

function App() {

  return (
    <div className="App">
      <Slider />
      <Routes>
        <Route path="/" element={<CreatePatient />} />
        <Route path="/create-patient" element={<CreatePatient />} />
        <Route path="/create-doctor" element={<CreateDoctor/>} />
      </Routes>

    </div>
  );
}

export default App;
