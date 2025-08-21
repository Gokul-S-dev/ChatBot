document.addEventListener('DOMContentLoaded', () => {
	const chatWindow = document.getElementById('chat-window');
	const chatForm = document.getElementById('chat-form');
	const chatInput = document.getElementById('chat-input');
	const sendBtn = document.getElementById('send-btn');
	const statusIndicator = document.getElementById('status-indicator');

	// Remove welcome message when first message is sent
	let isFirstMessage = true;

	function appendMessage(content, sender) {
		// Remove welcome message on first user message
		if (isFirstMessage && sender === 'user') {
			const welcomeMessage = document.querySelector('.welcome-message');
			if (welcomeMessage) {
				welcomeMessage.remove();
			}
			isFirstMessage = false;
		}

		const msgDiv = document.createElement('div');
		msgDiv.className = `chat-message ${sender} animate__animated animate__fadeInUp`;
		const msgContent = document.createElement('div');
		msgContent.className = 'message-content';
		msgContent.textContent = content;
		msgDiv.appendChild(msgContent);
		chatWindow.appendChild(msgDiv);
		chatWindow.scrollTop = chatWindow.scrollHeight;
	}

	// Enable/disable send button based on input
	function updateSendButton() {
		const hasText = chatInput.value.trim().length > 0;
		sendBtn.disabled = !hasText;
	}

	// Update status indicator
	function updateStatus(status) {
		statusIndicator.style.background = status === 'online' ? '#19c37d' : '#ff6b6b';
	}

	// Initialize
	updateSendButton();
	updateStatus('online');

	// Input event listeners
	chatInput.addEventListener('input', updateSendButton);
	chatInput.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			if (!sendBtn.disabled) {
				chatForm.dispatchEvent(new Event('submit'));
			}
		}
	});

	chatForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		const userMsg = chatInput.value.trim();
		if (!userMsg) return;
		
		appendMessage(userMsg, 'user');
		chatInput.value = '';
		updateSendButton();

		// Show bot typing...
		const botTyping = document.createElement('div');
		botTyping.className = 'chat-message bot animate__animated animate__fadeInUp';
		botTyping.innerHTML = '<div class="message-content typing-indicator"><span></span><span></span><span></span></div>';
		chatWindow.appendChild(botTyping);
		chatWindow.scrollTop = chatWindow.scrollHeight;

		// Update status
		updateStatus('typing');

		// Send message to backend
		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: userMsg })
			});
			const data = await res.json();
			botTyping.remove();
			
			if (res.ok) {
				appendMessage(data.reply || 'Sorry, I did not understand.', 'bot');
				updateStatus('online');
			} else {
				appendMessage('Error: ' + (data.reply || 'Server error'), 'bot');
				updateStatus('error');
			}
		} catch (err) {
			botTyping.remove();
			appendMessage('Error connecting to server.', 'bot');
			updateStatus('error');
		}
	});

	// Handle window resize for better mobile experience
	window.addEventListener('resize', () => {
		chatWindow.scrollTop = chatWindow.scrollHeight;
	});
});
