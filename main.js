// Replace this with your actual Microsoft Bot Framework Direct Line Secret
const directLineSecret = 'JBUB2TM6ivY.wB-NhzIozP71ouCVV9auaDvEzTVYdsXdsRcHcgiQpEo';

const botConnection = new window.WebChat.createDirectLine({ token: directLineSecret });

function appendMessage(user, text) {
    const chatbox = document.getElementById('chatbox');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${user}:</strong> ${text}`;
    chatbox.appendChild(messageElement);
}

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const userMessage = userInput.value.trim();

    if (userMessage !== '') {
        appendMessage('You', userMessage);
        userInput.value = '';

        // Send the user message to the bot
        botConnection.postActivity({ type: 'message', text: userMessage }).subscribe(
            id => console.log('Message sent successfully:', id),
            error => console.log('Error sending message:', error)
        );

        // Receive and display the bot's response
        botConnection.activity$
            .filter(activity => activity.type === 'message' && activity.from.role === 'bot')
            .subscribe(activity => {
                appendMessage('Bot', activity.text);
            });
    }
}
