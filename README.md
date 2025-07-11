# 🌙 Dream Akinator

A web-based prototype that analyzes your dreams and provides psychological interpretations, inspired by the classic Akinator game format. Now enhanced with **AI-powered analysis** for deeper insights!

## Features

- **Interactive Questioning System**: 8-12 adaptive questions to analyze your dream
- **Dream Type Detection**: Identifies common dream categories (flying, falling, being chased, etc.)
- **Psychological Interpretations**: Provides meaning based on dream psychology
- **🤖 AI-Enhanced Analysis**: Get personalized, detailed interpretations using OpenAI's GPT
- **Direct Dream Text Analysis**: Describe your dream and get instant AI analysis
- **Enhanced Interpretations**: AI-powered insights for deeper understanding
- **Symbol Recognition**: AI identifies and explains dream symbols
- **Dream Journal**: Save and review your interpreted dreams
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful UI**: Dreamy, starlit interface with smooth animations

## 🆕 AI Features

- **Enhanced Interpretations**: Get deeper, personalized insights for your dreams
- **Direct Text Analysis**: Input dream descriptions for instant AI analysis
- **Symbol Detection**: AI identifies and explains key dream symbols
- **Confidence Scoring**: See how confident the AI is in its analysis
- **Actionable Insights**: Get practical advice based on your dreams
- **Improved Journal**: Enhanced dream entries with AI-generated content

## Dream Types Covered

- 🕊️ Flying Dreams
- 🌊 Falling Dreams  
- 🏃 Being Chased
- 🌊 Water Dreams
- 💀 Death Dreams
- 🗺️ Being Lost
- 📚 Exam/Test Dreams
- 🐺 Animal Dreams

## Quick Start

### Basic Setup
```bash
# Navigate to the project directory
cd dream-akinator

# Start a local server (Python 3)
python -m http.server 8000

# Open browser to http://localhost:8000
```

### With AI Features
1. Follow the basic setup above
2. Get an OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys)
3. Open the app and go to "🤖 AI Analysis" tab
4. Click "Set API Key" and enter your key
5. Enable AI features and enjoy enhanced dream analysis!

See [AI_SETUP_GUIDE.md](./AI_SETUP_GUIDE.md) for detailed AI setup instructions.

### Option 3: Direct File Opening
Simply open `index.html` in your web browser (some features may be limited).

## Usage

1. **Start**: Click "Start Dreaming" on the welcome screen
2. **Answer Questions**: Respond honestly to 8-12 questions about your dream
3. **Get Results**: View your dream type and psychological interpretation
4. **Save Dreams**: Add interpretations to your personal dream journal
5. **Review Journal**: Access saved dreams anytime through the navigation

## Technical Architecture

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Storage**: LocalStorage for dream journal persistence
- **Algorithm**: Tag-based scoring system with keyword matching
- **UI/UX**: Responsive design with CSS animations and gradients

## Algorithm Details

The app uses a sophisticated tagging system:

1. Each answer contains semantic tags
2. Dream types have associated keywords
3. Scoring algorithm matches tags to keywords
4. Additional relationship mapping for related concepts
5. Early termination when confidence is high

## Customization

### Adding New Dream Types
Edit the `dreamDatabase` in `script.js`:

```javascript
newDreamType: {
    name: "🌟 Your Dream Type",
    interpretation: "Your interpretation...",
    meaning: "What this means...",
    keywords: ['keyword1', 'keyword2', 'keyword3']
}
```

### Adding New Questions
Extend the `questionTree` array:

```javascript
{
    question: "Your question here?",
    answers: [
        { text: "Answer option", tags: ['tag1', 'tag2'] },
        // ... more answers
    ]
}
```

## Future Enhancements

- **Backend Integration**: User accounts and cloud sync
- **AI/ML**: Improve dream detection accuracy
- **Social Features**: Share dreams anonymously
- **Advanced Analytics**: Pattern recognition over time
- **Mobile App**: Native iOS/Android versions
- **Voice Input**: Speak your dream descriptions
- **Lucid Dream Training**: Tips for lucid dreaming

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

Feel free to submit issues and enhancement requests! This is a prototype designed for demonstration and learning purposes.

## License

MIT License - feel free to use and modify for your projects.

---

*Sweet dreams! 🌙✨*