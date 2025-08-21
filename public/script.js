document.addEventListener('DOMContentLoaded', () => {
	const chatWindow = document.getElementById('chat-window');
	const chatForm = document.getElementById('chat-form');
	const chatInput = document.getElementById('chat-input');
	const sendBtn = document.getElementById('send-btn');
	const statusIndicator = document.getElementById('status-indicator');
	const themeToggle = document.getElementById('theme-toggle');
	const clearChatBtn = document.getElementById('clear-chat');

	// Remove welcome message when first message is sent
	let isFirstMessage = true;

	function formatTime(date) {
		const h = String(date.getHours()).padStart(2, '0');
		const m = String(date.getMinutes()).padStart(2, '0');
		return `${h}:${m}`;
	}

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

		// Meta (timestamp)
		const meta = document.createElement('div');
		meta.className = 'message-meta';
		meta.textContent = formatTime(new Date());
		msgContent.appendChild(meta);
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

	// Theme
	function updateThemeIcon() {
		themeToggle.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
	}
	function applySavedTheme() {
		const saved = localStorage.getItem('theme');
		if (saved === 'light') document.body.classList.add('light');
		else document.body.classList.remove('light');
		updateThemeIcon();
	}
	applySavedTheme();

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

	// Theme toggle
	if (themeToggle) {
		themeToggle.addEventListener('click', () => {
			document.body.classList.toggle('light');
			const isLight = document.body.classList.contains('light');
			localStorage.setItem('theme', isLight ? 'light' : 'dark');
			updateThemeIcon();
		});
	}

	// Clear chat
	function renderWelcome() {
		chatWindow.innerHTML = '';
		const wrapper = document.createElement('div');
		wrapper.className = 'welcome-message';
		wrapper.innerHTML = '<div class="welcome-icon">👋</div><div class="welcome-text">Hello! How can I help you today?</div><div class="welcome-subtitle mt-2">Ask me anything and I\'ll do my best to help!</div>';
		chatWindow.appendChild(wrapper);
		chatWindow.scrollTop = 0;
		isFirstMessage = true;
	}
	if (clearChatBtn) {
		clearChatBtn.addEventListener('click', () => {
			renderWelcome();
		});
	}

	// Handle window resize for better mobile experience
	window.addEventListener('resize', () => {
		chatWindow.scrollTop = chatWindow.scrollHeight;
	});
});
