//All required Packages
const express = require('express');
const multer = require('multer');
const path = require('path');
const http = require('http');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { format, addHours } = require('date-fns');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const UserDetails = require('./Models/userdata');
const Notifications = require('./Models/notifications');
const Patients = require('./Models/patients');
const Doctors = require('./Models/doctors');
const OpenAIApi = require('openai');
// const host = '192.168.100.11';
const port = process.env.PORT || 3001;

//Express Server and Socket.IO setup
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
//Middlewares
app.use(bodyparser.json());
app.use(cors({
    origin: '*',
}));
//app.use(cors());
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

// Initialize the OpenAI API client with your API key
const openai = new OpenAIApi({
    key: process.env.OPENAI_API_KEY,
});

//Cofiguration of SgMail Service
const owner_email = process.env.OWNER_EMAIL;
const admin_email = process.env.ADMIN_EMAIL;
sgMail.setApiKey(process.env.SG_API_KEY);

//All Variables to store and retreive data
let Previous_JSON_Response = '';
let User_Name = '';
let Data_Monitoring_Service_Report = '';

// Function to send an email with the meet link
async function sendEmail(Admin_mail, title, body) {
    // Configure the email options
    const mailOptions = {
        to: Admin_mail,
        from: owner_email,
        subject: title,
        text: body,
    };
    // Send the email
    sgMail
        .send(mailOptions)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            return 1;
        });
}

// Connection URL
const DB = process.env.DB_URI;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB Atlas');

        //Server Current Status
        app.get("/", (req, res) => {
            console.log('Incoming Request....');
            res.status(200).send('Server is Up!');
        });

        //Send Last Reports Generated
        app.get("/get-reports", (req, res) => {
            if (Previous_JSON_Response) {
                console.log('Reports:', Previous_JSON_Response);
                res.status(200).json(Previous_JSON_Response);
            }
            else {
                res.status(404).send('No Data Found!');
            }
        });

        //Sending Temperature of Selected User
        app.post("/fetch-temperature", (req, res) => {
            // Fetch all notifications from databse
            UserDetails.find({ name: req.body.name })
                .then(patientrecord => {

                    //Send All Notifications from Server
                    res.status(200).json({ AllRecords: patientrecord });
                })
                .catch(error => {
                    console.error('Error fetching notifications:', error);
                    res.status(404).json({ error: 'Unable to fetch notifications.' });
                });
        });

        //Sending Notifications to React
        app.get("/fetch-notifications", (req, res) => {
            // Fetch all notifications from databse
            Notifications.find({})
                .then(notifications => {
                    console.log('All notifications:', notifications);

                    //Send All Notifications from Server
                    res.status(200).json(notifications);
                })
                .catch(error => {
                    console.error('Error fetching notifications:', error);
                    res.status(404).json({ error: 'Unable to fetch notifications.' });
                });
        });

        //Sending All Patients to React
        app.get("/fetch-patients", (req, res) => {
            // Fetch all notifications from databse
            Patients.find({})
                .then(patients => {
                    res.status(200).json(patients);
                })
                .catch(error => {
                    console.error('Error fetching patients:', error);
                    res.status(404).json({ error: 'Unable to fetch patients.' });
                });
        });

        //Receiving data from mobile app to generate reports using gpt 3.5 turbo
        app.post("/generate-reports", (req, res) => {
            console.log('Request Incoming....', req.body.temp, req.body.hb);
            User_Name = req.body.name;
            const bodyTemperature = req.body.temp;
            const heartBeat = req.body.hb;
            const currentDate = new Date();
            const formattedDate = format(currentDate, 'MM-dd-yyyy h:mm:ss a');
            // Create a new user instance and save it
            const newUserDetails = new UserDetails({
                name: User_Name,
                temperature: bodyTemperature,
                heartbeat: heartBeat,
                time: formattedDate,
            });

            newUserDetails.save()
                .then(async (savedUser) => {

                    //Generating Data Monitoring Report
                    const prompt = 'Remeber that normal person temprature is between 97 and 99 fahrenheit and normal heart beat rate is 60-100 beats per minute and if any person temprature or heart beat is outside the range then show warning. You strictly need to follow given range to analyze situation of patient. You act as a doctor assistant, our patients body temperature and heart beat is sent to you, now first thing you need to realize is that whether is it alarming situation or not, if any one from temprature or heart beat is outside the range then you will show warning, so your first word of response will be Warning: or Fine: only at start, depending on values of both temprature and heart beat whether they lie in given range or not, then you will tell reason and also its possible problem to patient in one to two lines and if it is warning then write that patient requires urgent checkup.';
                    const PromptMessage = [
                        { role: "system", content: prompt },
                        { role: "user", content: `The temprature of the user is ${bodyTemperature} fahrenheit and heartbeat rate of the user is ${heartBeat}` },
                    ];
                    const completion = await openai.chat.completions.create({
                        messages: PromptMessage,
                        model: "gpt-3.5-turbo",
                    });
                    const response = completion.choices[0].message.content;
                    console.log('Response: ', response);

                    // Split the report into words
                    const words = response.split(' ');
                    if (words[0].toLowerCase() === 'warning:' || words[0].toLowerCase() === 'warning') {
                        //All tasks
                        const currentDate = new Date();
                        const formattedDate = format(currentDate, 'MM-dd-yyyy h:mm a');

                        Data_Monitoring_Service_Report = {
                            date: formattedDate,
                            data: response,
                        };

                        // Create a JSON response object containing both reports and user name
                        const jsonResponse = {
                            User_Name: User_Name,
                            Data_Monitoring_Service_Report: Data_Monitoring_Service_Report
                        };
                        const newNotification = new Notifications({
                            name: jsonResponse.User_Name,
                            date: jsonResponse.Data_Monitoring_Service_Report.date,
                            data: jsonResponse.Data_Monitoring_Service_Report.data,
                        });

                        newNotification.save()
                            .then(async (savedUser) => {
                                console.log('Notification Saved!');

                                // Send reports to all connected clients via Socket.IO
                                io.emit('reportsGenerated', jsonResponse);

                                // Fetch all notifications from databse
                                Notifications.find({})
                                    .then(notifications => {
                                        console.log('All notifications:', notifications);

                                        //Send All Notifications from Server
                                        io.emit('AllNotifications', notifications);
                                    })
                                    .catch(error => {
                                        console.error('Error fetching notifications:', error);
                                        // Handle the error appropriately, e.g., send an error response
                                    });

                                //Send Reports via Email to Admin
                                const title = 'New Report From Care Wave';

                                // const body = JSON.stringify(jsonResponse); // Convert the object to a JSON string
                                const body = `This report includes the data monitoring service report generated at ${jsonResponse.Data_Monitoring_Service_Report.date} , this report is for patient name ${User_Name}.\n${jsonResponse.Data_Monitoring_Service_Report.data.replace(/\n/g, ' ')}`;
                                const email_status = await sendEmail(admin_email, title, body);
                                if (email_status === 1) {
                                    res.status(206).send('Reports are being generated but unable to send them to Admin.')
                                }
                                res.status(200).json(jsonResponse);
                                Previous_JSON_Response = jsonResponse;

                            })
                            .catch((error) => {
                                console.error('Error saving notifications:', error);
                            });
                    } else {
                        res.status(204).send('Report is fine.');
                    }
                })
                .catch((error) => {
                    console.error('Error saving user:', error);
                });
        });

        //Notify that sensors are disconnected
        app.post("/notify-user", (req, res) => {
            // Notify that sensors are not connected
            io.emit('SensorNotification', `Patient sensors are disconnected from the app, kindly check them ASAP.Patient Name: ${req.body.name}`);
            res.status(200).send('Notified!');
        });

        //User Login
        app.post('/login', (req, res) => {
            const { email, password } = req.body;
            console.log(req.body);
            Patients.findOne({ email: email })
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({ error: 'User not found' });
                    }
                    if (user.password !== password) {
                        return res.status(401).json({ error: 'Invalid password' });
                    }
                    // Construct the profile image URL
                    const profileImageURL = `/${user.profileurl}`;
                    console.log(profileImageURL);

                    // Return the user's name and profile image URL upon successful login
                    const responseData = {
                        name: user.name,
                        profileurl: profileImageURL,
                    };
                    return res.status(200).json(responseData);
                })
                .catch((err) => {
                    console.error('Error:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                });
        });

        //Saving files in Uploads directory
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'Uploads/'); // Set the destination folder for uploaded files
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname); // Set the filename for uploaded files
            },
        });
        const upload = multer({ storage });

        //Create Patients
        app.post("/create-patient", upload.single('profile_picture'), (req, res) => {
            console.log('Request is coming....');
            const profileImage = req.file ? req.file.path : null; // Store the image path in the database if it's provided
            console.log('Request: ', req.body);
            console.log('Image: ', profileImage);
            Patients.findOne({ email: req.body.email })
                .then((patient) => {
                    if (!patient) {
                        const user = new Patients({
                            name: req.body.username,
                            email: req.body.email,
                            password: req.body.password,
                            number: req.body.number,
                            profileurl: profileImage,
                        });

                        user.save()
                            .then((user) => {
                                res.status(201).send('Patient Created Successfully!');
                            })
                            .catch((error) => {
                                console.error('Error saving patient:', error);
                                res.status(500).send(error);
                            });

                    }
                    else {
                        return res.status(409).json({ error: 'Patient already exist' });
                    }
                })
                .catch((err) => {
                    console.error('Error:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                });
        });

        //Create Doctors
        app.post("/create-doctor", upload.single('profile_picture'), (req, res) => {
            const profileImage = req.file ? req.file.path : null; // Store the image path in the database if it's provided
            console.log('Request is coming....');
            console.log('Request: ', req.body);
            console.log('Image: ', profileImage);
            Doctors.findOne({ email: req.body.email })
                .then((user) => {
                    if (!user) {
                        const user = new Doctors({
                            name: req.body.username,
                            email: req.body.email,
                            password: req.body.password,
                            number: req.body.number,
                            profileurl: profileImage,
                        });

                        user.save()
                            .then((user) => {
                                res.status(201).send('Doctor Created Successfully!');
                            })
                            .catch((error) => {
                                console.error('Error saving doctor:', error);
                                res.status(500).send('Failed to save doctor');
                            });

                    }
                    else {
                        return res.status(409).json({ error: 'Doctor already exist' });
                    }
                })
                .catch((err) => {
                    console.error('Error:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                });
        });
        //Chat Endpoint
        app.post("/chat", async (req, res) => {
            const messageList = req.body.messagelist;
            const abstract = 'You will act as a Human Nurse Pro, a Professional nurse helping patients describe their SSI symptoms and provide them general information on their condition. You first greet the patient, ask them how they are feeling, and after they answered you regarding how they are feeling then proceed to ask them about their surgical site infection symptoms such as Drainage or Pus, The fever , the swilling and Redness , level of pain and other, then ask if they take any medications before You ask questions to clarify their surgical site infection symptoms and make them comfortable. You should not provide any diagnosis or medical advice but guide them to consult with a healthcare professional for accurate information. and After discussion let them know if there is any further assistant.';
            const transformedMessages = [
                {
                    role: 'system',
                    content: abstract,
                },
                ...messageList.map((message, index) => ({
                    role: index % 2 === 1 ? 'assistant' : 'user',
                    content: message,
                })),
            ];
            console.log(transformedMessages);
            const completion = await openai.chat.completions.create({
                messages: transformedMessages,
                model: "gpt-3.5-turbo",
            });
            const response = completion.choices[0].message.content;
            console.log('Response: ', response);

            res.status(200).json({ message: response });
        });


        server.listen(port,  () => {
            console.log(`Node/Express Server with Socket.IO is Up......\nPort: localhost:${port}`);
        });
    })
    .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));