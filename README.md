# OTP Sender Web Application

![OTP Sender](/frontend/public/otpsender.png)

A web application that allows users to send OTPs (One-Time Passwords) via SMS to a selected contact using the MSG91 API. The application is built with React for the frontend and Node.js for the backend.

## Project Flow

1. **Home Page**: 
   - The user is greeted with a welcoming interface.
   - A list of contacts is displayed on the left side.

2. **Select Contact**:
   - Users can click on any contact from the list to view their details (name and phone number).
   - The selected contact's details are displayed on the right side of the interface.

3. **Send OTP**:
   - Upon clicking the "Send OTP" button, a random 6-digit OTP is generated.
   - The OTP is sent to the selected contact's phone number via SMS using the MSG91 API.
   - A success message is displayed if the OTP is sent successfully.

4. **Sent Messages Log**:
   - Below the contact details, a list of all sent OTP messages is maintained.
   - Each entry shows the recipient's phone number, the OTP sent, and the timestamp of when it was sent.

## Features

- User-friendly interface with a modern design using Tailwind CSS.
- Real-time OTP sending functionality via SMS.
- Responsive design to ensure usability across various devices.
- Easy integration with the MSG91 SMS API for sending OTPs.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **API**: MSG91 for SMS sending
- **Database**: (optional) Could be extended with a database for persistent storage of contacts and messages.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd otp-sender
