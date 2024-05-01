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
        const email = document.getElementById('email').value.trim(); // Fixed variable name
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

            // Show sending message
            sendingMessage.style.display = 'block';

            // Construct the email body
            const emailBody = `Name: ${firstname} ${lastname}\nEmail: ${email}\nMessage: ${message}`;

            // Construct the mailto link
            const recipientEmail = 'marcia.pratas.2000@gmail.com'; // Replace with recipient email
            const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

            // Open the email link in a new window
            window.open(mailtoLink, '_blank');
            form.reset(); // Reset form fields after successful submission
    });
}

document.addEventListener('DOMContentLoaded', function() {
    submitForm();
});// Call the submitForm function when the DOM is fully loaded

