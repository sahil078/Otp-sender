import React, { useState, useEffect } from 'react';
import { getContacts, sendOtp, getMessages } from './api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch contacts when the app loads
    getContacts().then((response) => setContacts(response.data));
  }, []);

  const handleSendOtp = (phoneNumber) => {
    sendOtp(phoneNumber)
      .then((response) => {
        if (response.data.success) {
          alert('OTP sent successfully!');
          fetchMessages();
        }
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        alert('Failed to send OTP');
      });
  };

  const fetchMessages = () => {
    getMessages().then((response) => setMessages(response.data));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Send OTP via SMS</h1>

        <div className="grid grid-cols-2 gap-8">
          {/* Contact List Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact List</h2>
            <ul className="space-y-4">
              {contacts.map((contact) => (
                <li
                  key={contact.id}
                  className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition duration-300 cursor-pointer"
                  onClick={() => setSelectedContact(contact)}
                >
                  {contact.firstName} {contact.lastName}
                </li>
              ))}
            </ul>
          </div>

          {/* Selected Contact & Send OTP Section */}
          <div>
            {selectedContact ? (
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Contact Details
                </h3>
                <p className="text-lg text-gray-600">
                  <strong>Name:</strong> {selectedContact.firstName} {selectedContact.lastName}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Phone:</strong> {selectedContact.phoneNumber}
                </p>
                <button
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                  onClick={() => handleSendOtp(selectedContact.phoneNumber)}
                >
                  Send OTP
                </button>
              </div>
            ) : (
              <p className="text-gray-500">Select a contact to view details</p>
            )}
          </div>
        </div>

        {/* Sent Messages Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sent Messages</h2>
          <ul className="space-y-4">
            {messages.map((message) => (
              <li key={message.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <p className="text-gray-800">
                  <strong>OTP:</strong> {message.otp} to {message.name}
                </p>
                <p className="text-gray-500">
                  Sent at: {new Date(message.time).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
