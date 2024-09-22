const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Static list of contacts (You can replace this with real data)
const contacts = [
    { id: 1, firstName: 'John', lastName: 'Doe', phoneNumber: '+919876543210' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', phoneNumber: '+919123456789' },
    { id: 3, firstName: 'Alice', lastName: 'Johnson', phoneNumber: '+919876543211' },
    { id: 4, firstName: 'Bob', lastName: 'Brown', phoneNumber: '+919876543212' },
    { id: 5, firstName: 'Charlie', lastName: 'Davis', phoneNumber: '+919876543213' },
    { id: 6, firstName: 'Diana', lastName: 'Miller', phoneNumber: '+919876543214' },
  ];
  

let sentMessages = [];

// MSG91 credentials
const authKey = '430925AmrhL5ZhUD9h66f014fcP1';
const senderId = 'Sahil01';
const route = '4'; // Transactional route

// Function to send SMS using MSG91 HTTP API
const sendSms = (phoneNumber, otp) => {
  const message = `Hi. Your OTP is: ${otp}`;
  
  const data = {
    sender: senderId,
    route: route,
    country: '91', // Country code for India
    sms: [
      {
        message: message,
        to: [phoneNumber],
      }
    ]
  };

  return axios({
    method: 'POST',
    url: 'https://api.msg91.com/api/v2/sendsms',
    headers: {
      'authkey': authKey,
      'Content-Type': 'application/json',
    },
    data: data,
  });
};

// Endpoint to get list of contacts
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// Endpoint to send OTP via MSG91
app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit OTP

  try {
    await sendSms(phoneNumber, otp);

    // Log the sent message
    sentMessages.push({
      id: sentMessages.length + 1,
      name: phoneNumber,
      time: new Date().toISOString(),
      otp: otp
    });

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// Endpoint to get list of sent messages
app.get('/messages', (req, res) => {
  res.json(sentMessages);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
