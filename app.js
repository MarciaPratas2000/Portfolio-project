

function submitForm() {
    const form = document.getElementById('Form');
    const sendingMessage = document.getElementById('Sending');
    const receivedMessage = document.getElementById('Received');
    const errorMessage = document.getElementById('FormError');
    sendingMessage.style.display = 'none';
    receivedMessage.style.display = 'none';
    errorMessage.style.display = 'none';


    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission
        
        try {
            // Validate form fields
            const firstname = document.getElementById('firstname').value.trim();
            const lastname = document.getElementById('lastname').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Show sending message
            sendingMessage.style.display = 'block';

            // Construct the email body
            const emailBody = `Name: ${firstname} ${lastname}\nEmail: ${email}\nMessage: ${message}`;

            // Construct the mailto link
            const recipientEmail = 'marcia.pratas.2000@gmail.com'; // Replace with recipient email
            const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

            // Try to open the email link in a new window
            const openedWindow = window.open(mailtoLink, '_blank');

            if (openedWindow) {
                // Show received message after successful submission
                receivedMessage.style.display = 'block';
                form.reset(); // Reset form fields after successful submission
            } else {
                // Handle case where opening the mailto link failed
                throw new Error('Failed to open email client.');
            }
        } catch (error) {
            // Display error message to the user
            errorMessage.textContent = `An error occurred: ${error.message}`;
            errorMessage.style.display = 'block';
        } finally {
            // Always hide the sending message once submission is done (success or error)
            sendingMessage.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    
    submitForm();
});


