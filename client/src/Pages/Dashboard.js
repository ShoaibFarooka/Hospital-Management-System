import React from 'react';
import { useState, useEffect } from 'react';
import '../Styles/main.css';
import { RxUpdate } from "react-icons/rx";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsStopwatch } from "react-icons/bs";
import { TfiWorld } from "react-icons/tfi";
import { TbReportSearch } from "react-icons/tb";
import { FiAlertOctagon } from "react-icons/fi";
import { BsHeart } from "react-icons/bs";



function Dashboard() {
    useEffect(() => {
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
    }, []);
    return (
        <div className="dashboard">
            <div className="wrapper ">
                <div className="main-panel">
                    <div className="content">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-body ">
                                        <div className="row">
                                            <div className="col-5 col-md-4">
                                                <div className="icon-big text-center icon-warning">

                                                    <TfiWorld style={{color:'orange'}} />                                                </div>
                                            </div>
                                            <div className="col-7 col-md-8">
                                                <div className="numbers">
                                                    <p className="card-category">Patients</p>
                                                    <p className="card-title">1</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer ">
                                        <hr />
                                        <div className="stats">
                                            <RxUpdate className='new-mini-icons' />
                                            Update Now
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-body ">
                                        <div className="row">
                                            <div className="col-5 col-md-4">
                                                <div className="icon-big text-center icon-warning">
                                                <TbReportSearch color='green'/>                                                </div>
                                            </div>
                                            <div className="col-7 col-md-8">
                                                <div className="numbers">
                                                    <p className="card-category">Reports</p>
                                                    <p className="card-title"> 2</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer ">
                                        <hr />
                                        <div className="stats">
                                            <AiOutlineCalendar className='new-mini-icons' />
                                            Last day
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-body ">
                                        <div className="row">
                                            <div className="col-5 col-md-4">
                                                <div className="icon-big text-center icon-warning">
                                                <FiAlertOctagon style={{color:'red'}}/>                                                </div>
                                            </div>
                                            <div className="col-7 col-md-8">
                                                <div className="numbers">
                                                    <p className="card-category">Alerts</p>
                                                    <p className="card-title">2</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer ">
                                        <hr />
                                        <div className="stats">
                                            <BsStopwatch className='new-mini-icons' />
                                            In the last hour
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-body ">
                                        <div className="row">
                                            <div className="col-5 col-md-4">
                                                <div className="icon-big text-center icon-warning">
                                                    <BsHeart color='3DE1DE'/>
                                                </div>
                                            </div>
                                            <div className="col-7 col-md-8">
                                                <div className="numbers">
                                                    <p className="card-category">Feedbacks</p>
                                                    <p className="card-title">0</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer ">
                                        <hr />
                                        <div className="stats">
                                            <RxUpdate className='new-mini-icons' />
                                            Update now
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-chart">
                                    <div className="card-header">
                                        <h5 className="card-title">Dynamic urgent Cases</h5>
                                        <p className="card-category">Line Chart with Points</p>
                                    </div>
                                    <div className="card-body">
                                        <div id="chartContainer" style={{ 'height': '370px', 'width': '100' }}></div>
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

                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title"> Patients list </h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Name
                                                        </th>
                                                        <th>
                                                            Details
                                                        </th>
                                                        <th>
                                                            Department
                                                        </th>
                                                        <th className="text-right">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            Ahmed Al-Fahad
                                                        </td>
                                                        <td>
                                                            <a href="./patient.html">
                                                                <p>Link</p>
                                                            </a>
                                                        </td>
                                                        <td>
                                                            Heart
                                                        </td>
                                                        <td className="text-right">
                                                            Abnormal
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Fatima Abdullah
                                                        </td>
                                                        <td>
                                                            <a href="./patient.html">
                                                                <p>Link</p>
                                                            </a>
                                                        </td>
                                                        <td>
                                                            Heart
                                                        </td>
                                                        <td className="text-right">
                                                            Normal
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

export default Dashboard;
