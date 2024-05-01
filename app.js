function submitForm() {
    const form = document.getElementById('Form');
    const errorMessage = document.getElementById('ErrorMessage');
    const sendingMessage = document.getElementById('Sending');
    const receivedMessage = document.getElementById('Received');
    const formErrorMessage = document.getElementById('FormError');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Reset error and message displays
        errorMessage.style.display = 'none';
        formErrorMessage.style.display = 'none';
        sendingMessage.style.display = 'none';
        receivedMessage.style.display = 'none';

        // Validate form fields
        const firstname = document.getElementById('firstname').value.trim();
        const lastname = document.getElementById('lastname').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!firstname || !lastname || !email || !message) {
            errorMessage.style.display = 'block';
        } else {
            // Show sending message
            sendingMessage.style.display = 'block';
              // Construct the email body
              const emailBody = `Name: ${firstname} ${lastname}\nEmail: ${email}\nMessage: ${message}`;

            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                // Simulate successful submission (replace with server-side handling)
                sendingMessage.style.display = 'none';
                receivedMessage.style.display = 'block';
                form.reset(); // Reset form fields after successful submission

                // Obfuscate email address and create mailto link
                const obfuscatedEmail = obfuscateEmail(email);
                const mailtoLink = 'mailto:' + obfuscatedEmail;

                // Open the email link in a new window
                window.open(mailtoLink, '_blank');
            }, 3000); // Simulate 3 seconds delay for sending
        }
    });
}
// Function to obfuscate email address
function obfuscateEmail(email) {
    let obfuscated = '';
    for (let i = 0; i < email.length; i++) {
        obfuscated += '&#' + email.charCodeAt(i) + ';';
    }
    return obfuscated;
}


// app.js
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());

// Endpoint to handle form submission
app.post('/sendEmail', (req, res) => {
    const { firstname, lastname, email, message } = req.body;

    // Validate form fields
    if (!firstname || !lastname || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail address
            pass: process.env.EMAIL_PASS // Your Gmail password or app-specific password
        }
    });

    // Construct email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL, // Your recipient email address
        subject: 'New Contact Form Submission',
        text: `
            Name: ${firstname} ${lastname}
            Email: ${email}
            Message: ${message}
        `
    };

    // Send email using Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

