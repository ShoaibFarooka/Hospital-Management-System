import React from 'react';
import { useState, useEffect } from 'react';
import '../Styles/main.css';
import Image1 from '../Images/damir-bosnjak.jpg';
import Image2 from '../Images/patient.png';
import Image3 from '../Images/doctor.jpg';
import Image4 from '../Images/faces/joe-gardner-2.jpg';

const serverUrl2 = 'http://192.168.100.11:3001';
const serverUrl = 'https://carewave-a0d6829dab84.herokuapp.com';

function Patient({ patientName, setPatientName }) {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedPatientTemperature, setSelectedPatientTemperature] = useState('');

    //Choose Seleced Patient
    const handleChange = (event) => {
        const selectedPatientId = event.target.value;
        const patient = patients.find((patient) => patient._id === selectedPatientId);
        setSelectedPatient(patient);
    };
    useEffect(() => {

        //Fetch All Users
        fetch('https://carewave-a0d6829dab84.herokuapp.com/fetch-patients')
            .then(response => response.json())
            .then(data => {
                setPatients(data);
            })
            .catch(error => {
                console.error('Error fetching patients:', error);
            });
    }, []);

    useEffect(() => {
        if (patientName !== '' && selectedPatient) {
            if (selectedPatient.name === patientName) {
                console.log('Triggered In...');
                const requestBody = {
                    name: selectedPatient.name
                };

                // Send a POST request with the selected patient's name
                fetch('https://carewave-a0d6829dab84.herokuapp.com/fetch-temperature', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                })
                    .then(response => response.json())
                    .then(data => {
                        // Formatting time and extracting temperature data
                        setSelectedPatientTemperature(data.AllRecords);
                        const formattedData = data.AllRecords.map(data => {
                            const formattedTime = new Date(data.time);
                            return {
                                y: data.temperature,
                                x: formattedTime
                            };
                        });
                        console.log(formattedData);
                        // const formattedData2 = [
                        //     { x: new Date("2023-10-17 10:00:00"), y: 98 },
                        //     { x: new Date("2023-10-17 16:00:00"), y: 102 },
                        //     { x: new Date("2023-10-18 12:00:00"), y: 95 },
                        //     { x: new Date("2023-10-19 13:00:00"), y: 104 },
                        //     // Add more data points as needed
                        // ];
                        var chart = new window.CanvasJS.Chart("chartContainer", {
                            theme: 'light2',
                            title: {
                                text: 'Temperature Tracking',
                            },
                            axisX: {
                                title: 'Time',
                            },
                            axisY: {
                                title: 'Temperature (°F)',
                            },
                            data: [
                                {
                                    type: 'line',
                                    xValueFormatString: 'YYYY-MM-DD HH:mm:ss',
                                    dataPoints: formattedData,
                                },
                            ],
                        });

                        chart.render();
                        setPatientName('');
                        // Clean up the chart when the component unmounts
                        return () => {
                            console.log('Unmount...');
                            chart.destroy()
                        };
                    })
                    .catch(error => {
                        console.error('Error fetching temperature data:', error);
                    });
            }
        }
    }, [patientName]);

    useEffect(() => {
        if (selectedPatient) {
            const requestBody = {
                name: selectedPatient.name
            };

            // Send a POST request with the selected patient's name
            fetch('https://carewave-a0d6829dab84.herokuapp.com/fetch-temperature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
                .then(response => response.json())
                .then(data => {
                    setSelectedPatientTemperature(data.AllRecords);
                    console.log(data.AllRecords);
                    // Formatting time and extracting temperature data
                    const formattedData = data.AllRecords.map(data => {
                        const formattedTime = new Date(data.time);
                        return {
                            y: data.temperature,
                            x: formattedTime
                        };
                    });
                    console.log(formattedData);
                    // const formattedData2 = [
                    //     { x: new Date("2023-10-17 10:00:00"), y: 98 },
                    //     { x: new Date("2023-10-17 16:00:00"), y: 102 },
                    //     { x: new Date("2023-10-18 12:00:00"), y: 95 },
                    //     { x: new Date("2023-10-19 13:00:00"), y: 104 },
                    //     // Add more data points as needed
                    // ];
                    var chart = new window.CanvasJS.Chart("chartContainer", {
                        theme: 'light2',
                        title: {
                            text: 'Temperature Tracking',
                        },
                        axisX: {
                            title: 'Time',
                        },
                        axisY: {
                            title: 'Temperature (°F)',
                        },
                        data: [
                            {
                                type: 'line',
                                xValueFormatString: 'YYYY-MM-DD HH:mm:ss',
                                dataPoints: formattedData,
                            },
                        ],
                    });

                    chart.render();

                    // Clean up the chart when the component unmounts
                    return () => chart.destroy();
                })
                .catch(error => {
                    console.error('Error fetching temperature data:', error);
                });
        }
        else {
            var dps = []; // dataPoints
            var chart = new window.CanvasJS.Chart("chartContainer", {
                title: {
                    text: ""
                },
                data: [{
                    type: "line",
                    dataPoints: dps
                }]
            });

            var xVal = 0;
            var yVal = 100;
            var updateInterval = 1000;
            var dataLength = 20; // number of dataPoints visible at any point

            var updateChart = function (count) {

                count = count || 1;

                for (var j = 0; j < count; j++) {
                    yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
                    dps.push({
                        x: xVal,
                        y: yVal
                    });
                    xVal++;
                }

                if (dps.length > dataLength) {
                    dps.shift();
                }

                chart.render();
            };

            updateChart(dataLength);
            const intervalId = setInterval(() => {
                updateChart();
            }, updateInterval);

            // Clear the interval when the component is unmounted
            return () => clearInterval(intervalId);

        }
    }, [selectedPatient]);

    useEffect(() => {
        if (!selectedPatient) {
            var dps = []; // dataPoints
            var chart = new window.CanvasJS.Chart("chartContainer", {
                title: {
                    text: ""
                },
                data: [{
                    type: "line",
                    dataPoints: dps
                }]
            });

            var xVal = 0;
            var yVal = 100;
            var updateInterval = 1000;
            var dataLength = 20; // number of dataPoints visible at any point

            var updateChart = function (count) {

                count = count || 1;

                for (var j = 0; j < count; j++) {
                    yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
                    dps.push({
                        x: xVal,
                        y: yVal
                    });
                    xVal++;
                }

                if (dps.length > dataLength) {
                    dps.shift();
                }

                chart.render();
            };

            updateChart(dataLength);
            const intervalId = setInterval(() => {
                updateChart();
            }, updateInterval);

            // Clear the interval when the component is unmounted
            return () => clearInterval(intervalId);
        }
    }, []);
    return (
        <div className="patient">
            <div className='wrapper'>
                <div className='main-panel'>
                    <div className="content">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card card-user">
                                    <div className="image">
                                        <img src={Image1} alt="..." />
                                    </div>
                                    <div className="card-body">
                                        <div className="author">
                                            <a href="#">
                                                <img className="avatar border-gray" src={selectedPatient ? `${serverUrl}/${selectedPatient.profileurl}` : Image2} alt="Loading..." />
                                                <h5 className="title">{selectedPatient ? selectedPatient.name : 'NA'}</h5>
                                            </a>
                                            <p className="description">
                                                Patient from Saudia
                                            </p>
                                        </div>
                                        <p className="description text-center">
                                            Short Description
                                        </p>
                                    </div>

                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Doctor / Nurse Responsibles</h4>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-unstyled team-members">
                                            <li>
                                                <div className="row">
                                                    <div className="col-md-2 col-2">
                                                        <div className="avatar">
                                                            <img src={Image3} alt="Circle Image" className="img-circle img-no-padding img-responsive" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7 col-7">
                                                        Abdullah Al-Harbi  ( DOCTOR )
                                                        <br />
                                                        <span className="text-muted"><small>Offline</small></span>
                                                    </div>
                                                    <div className="col-md-3 col-3 text-right">
                                                        <button className="btn btn-sm btn-outline-success btn-round btn-icon"><i className="fa fa-envelope"></i></button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div className="col-md-2 col-2">
                                                        <div className="avatar">
                                                            <img src={Image4} alt="Circle Image" className="img-circle img-no-padding img-responsive" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7 col-7">
                                                        Sara Al-Mutairi  ( NURSE )
                                                        <br />
                                                        <span className="text-success"><small>Available</small></span>
                                                    </div>
                                                    <div className="col-md-3 col-3 text-right">
                                                        <button className="btn btn-sm btn-outline-success btn-round btn-icon"><i className="fa fa-envelope"></i></button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div>Select any patient: &nbsp;
                                    <select onChange={handleChange} style={{ width: '150px' }}>
                                        <option value="">Select Patient</option>
                                        {patients.map((patient) => (
                                            <option key={patient._id} value={patient._id}>
                                                {patient.name}
                                            </option>
                                        ))}
                                    </select>                                </div>
                                <div className="card card-user">
                                    <div className="card-header text-center">
                                        <h5 className="card-title">Patient Profile</h5>
                                    </div>
                                    <div className="card-body">

                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Param
                                                    </th>
                                                    <th>
                                                        Value
                                                    </th>
                                                    <th>
                                                        Comment
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        Full name
                                                    </td>
                                                    <td>
                                                        {selectedPatient ? selectedPatient.name : 'NA'}
                                                    </td>
                                                    <td>
                                                        NA
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        Age
                                                    </td>
                                                    <td>
                                                        27
                                                    </td>
                                                    <td>
                                                        NA
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        Address
                                                    </td>
                                                    <td>
                                                        Riyadh
                                                    </td>
                                                    <td>
                                                        NA
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        Illness
                                                    </td>
                                                    <td>
                                                        Fever
                                                    </td>
                                                    <td>
                                                        NA
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        Phone Number
                                                    </td>
                                                    <td>
                                                        {selectedPatient ? selectedPatient.number : 'NA'}
                                                    </td>
                                                    <td>
                                                        NA
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        Doctor
                                                    </td>
                                                    <td>
                                                        Abdullah Al-Harbi
                                                    </td>
                                                    <td>
                                                        NA
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        Nurse
                                                    </td>
                                                    <td>
                                                        Sara Al-Mutairi
                                                    </td>
                                                    <td>
                                                        NA
                                                    </td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- row --> */}
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <hr />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="places-buttons">
                                            <div className="row">
                                                <div className="col-md-6 ml-auto mr-auto text-center">
                                                    <h4 className="card-title">
                                                        Temperature Tracking
                                                    </h4>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="card card-chart">
                                                        <div className="card-header">
                                                        </div>
                                                        <div className="card-body">
                                                            <div id="chartContainer" style={{ "height": "370px", "width": "100%" }}></div>
                                                        </div>

                                                        <div className="card-footer">
                                                            <div className="chart-legend">
                                                                <i className="fa fa-circle text-info"></i> Predicted values
                                                                <i className="fa fa-circle text-warning"></i> Measured values
                                                            </div>
                                                            <hr />
                                                            <div className="card-stats">
                                                                <i className="fa fa-check"></i> Data information Stored
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

                        {/* Working Fine */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="title">Patient Temperature status </h5>
                                        <p className="category">Filled by the doctor</p>
                                    </div>
                                    <div className="card-body">
                                        <div className="typography-line">
                                            <span>Doctor Feedback</span>
                                            <blockquote>
                                                <textarea style={{ width: '100%', paddingLeft: '5px' }} />
                                            </blockquote>
                                        </div>
                                        <div className="typography-line">
                                            <div className='typography-line-child'>
                                                <span>Status</span>
                                                <h2>Normal</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <hr />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="places-buttons">
                                            <div className="row">
                                                <div className="col-md-6 ml-auto mr-auto text-center">
                                                    <h4 className="card-title">
                                                        Temperature History
                                                        {selectedPatient &&
                                                            <table style={{ marginTop: '20px' }}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Time</th>
                                                                        <th>Temperature</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {selectedPatientTemperature &&
                                                                        selectedPatientTemperature.map(item => (
                                                                            <tr key={item._id}>
                                                                                <td style={{ fontSize: '15px' }}>{new Date(item.time).toLocaleString()}</td>
                                                                                <td style={{ fontSize: '15px' }}>{item.temperature}</td>
                                                                            </tr>
                                                                        ))}
                                                                </tbody>
                                                            </table>
                                                        }
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <hr />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8 ml-auto mr-auto">
                                <div className="card card-upgrade">
                                    <div className="card-header text-center">
                                        <h4 className="card-title">Report Generation</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive table-upgrade">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th className="text-center">Num</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Temperature Sensor record</td>
                                                        <td className="text-center">4000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Temperature abnormal cases</td>
                                                        <td className="text-center">16</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">
                                                        </td>
                                                        <td className="text-center">
                                                            <a target="_blank" href="" className="btn btn-round btn-primary">PRINT</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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

export default Patient;
