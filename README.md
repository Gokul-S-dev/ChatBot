# 🤖 AI ChatBot with Gemini API

A modern, responsive web-based chatbot powered by Google's Gemini AI API. Built with Node.js, Express, and Bootstrap for a seamless user experience across all devices.

## ✨ Features

- **🤖 AI-Powered Conversations**: Integrated with Google Gemini 1.5 Flash API for intelligent responses
- **📱 Fully Responsive**: Mobile-first design that works perfectly on desktop, tablet, and mobile
- **🎨 Modern UI**: Dark theme with smooth animations and professional styling
- **⚡ Real-time Chat**: Live typing indicators and instant message delivery
- **🔧 Smart Input**: Auto-enable/disable send button, Enter key support
- **📊 Status Indicators**: Visual connection status and typing states
- **👋 Welcome Experience**: Engaging welcome message with animated elements

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5.3.2
- **AI Integration**: Google Gemini API
- **Styling**: Custom CSS with responsive breakpoints
- **Environment**: dotenv for secure API key management

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-chatbot.git
   cd ai-chatbot/chatbot-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
   ```

4. **Get your Gemini API key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file

5. **Start the server**
   ```bash
   npm start
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Start chatting with your AI assistant!

## 📱 Responsive Design

- **Desktop**: Centered layout with optimal chat experience
- **Tablet**: Full-height layout with adjusted spacing
- **Mobile**: Touch-optimized interface with compact design
- **Breakpoints**: 992px, 768px, 576px for seamless transitions

## 🎨 UI/UX Features

- **Dark Theme**: Easy on the eyes with professional appearance
- **Smooth Animations**: Fade-in effects and typing indicators
- **Smart Interactions**: Auto-scroll, input validation, status feedback
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Performance**: Optimized for fast loading and smooth operation

## 🔧 Configuration

The chatbot is highly configurable through:
- Environment variables for API keys
- Customizable styling via CSS
- Extensible JavaScript for additional features
- Bootstrap classes for responsive behavior

## 📁 Project Structure

```
chatbot-project/
├── server.js          # Express server with Gemini API integration
├── package.json       # Dependencies and scripts
├── .env              # Environment variables (create this)
└── public/
    ├── index.html    # Main HTML with Bootstrap integration
    ├── style.css     # Custom styling and responsive design
    └── script.js     # Frontend logic and API communication
```

## 🚀 Deployment

### Local Development
```bash
npm start
```

### Production
```bash
# Set NODE_ENV to production
NODE_ENV=production npm start
```

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Links

- **Live Demo**: [Add your deployed URL here]
- **Gemini API**: [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Bootstrap**: [Bootstrap 5.3.2](https://getbootstrap.com/)

## 🐛 Troubleshooting

### Common Issues

1. **"API key not configured"**
   - Make sure you have created a `.env` file with your Gemini API key

2. **"Error connecting to Gemini API"**
   - Verify your API key is valid and has proper permissions
   - Check your internet connection

3. **Chatbot not responding**
   - Check the browser console for errors
   - Verify the server is running on the correct port

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ using modern web technologies for an exceptional AI chat experience!**
