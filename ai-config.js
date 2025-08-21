class DreamGeminiAI {
    constructor() {
        this.apiKey = localStorage.getItem('AIzaSyAph4-atl_TmOC7nASgGmOAOA1pdN0Rjjg');
        this.isEnabled = localStorage.getItem('ai_enabled') === 'true';
        this.apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
    }

    setApiKey(key) {
        this.apiKey = key;
        localStorage.setItem('gemini_api_key', key);
        this.isEnabled = true;
        localStorage.setItem('ai_enabled', 'true');
    }

    async analyzeDreamText(dreamText) {
        if (!this.apiKey || !this.isEnabled) {
            throw new Error('Gemini AI not configured');
        }

        const prompt = `As a dream analyst with expertise in psychology and neuroscience, analyze this dream:

"${dreamText}"

Please provide a comprehensive analysis in the following JSON format:
{
    "themes": ["list of 3-5 main themes/topics in the dream"],
    "interpretation": "detailed psychological interpretation based on dream research and neuroscience",
    "emotional_insights": "analysis of emotional processing and what the brain might be working through",
    "actionable_advice": ["3-4 practical insights for personal growth and understanding"],
    "confidence_score": number from 1-10,
    "symbols_found": ["key symbols present in the dream"],
    "dream_category": "primary category (anxiety, empowerment, relationships, transformation, creative, symbolic, memory, healing)",
    "neuroscience_insight": "brief explanation of what brain processes might be involved"
}

Focus on being helpful, insightful, and scientifically grounded while maintaining an encouraging tone.`;

        try {
            const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1500,
                        topP: 0.8,
                        topK: 40
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Gemini API Error: ${errorData.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();
            const generatedText = data.candidates[0]?.content?.parts[0]?.text;
            
            if (!generatedText) {
                throw new Error('No response generated');
            }

            return this.parseGeminiResponse(generatedText);
        } catch (error) {
            console.error('Gemini AI Analysis Error:', error);
            throw error;
        }
    }

    parseGeminiResponse(response) {
        try {
            // Try to extract JSON from the response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            
            // If JSON extraction fails, try parsing the whole response
            return JSON.parse(response);
        } catch (error) {
            console.log('JSON parsing failed, using fallback parsing');
            
            // Fallback: Create structured response from text
            return this.createFallbackResponse(response);
        }
    }

    createFallbackResponse(response) {
        // Extract information using text parsing as fallback
        const sections = response.split('\n\n');
        
        return {
            themes: this.extractListItems(response, 'themes', ['transformation', 'emotional processing', 'subconscious exploration']),
            interpretation: this.extractSection(response, 'interpretation') || response.slice(0, 300) + '...',
            emotional_insights: this.extractSection(response, 'emotional') || 'Your dream reflects important emotional processing happening in your subconscious mind.',
            actionable_advice: this.extractListItems(response, 'advice', [
                'Reflect on the emotions present in your dream',
                'Consider what recent experiences might have influenced this dream',
                'Journal about the symbols and their personal meaning to you',
                'Trust your intuition about what the dream represents for your life'
            ]),
            confidence_score: 7,
            symbols_found: this.extractSymbols(response),
            dream_category: this.determineCategoryFromText(response),
            neuroscience_insight: this.extractSection(response, 'neuroscience') || 'Your brain processes experiences and emotions during REM sleep, creating meaningful dream narratives.'
        };
    }

    extractSection(text, keyword) {
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].toLowerCase().includes(keyword)) {
                // Return the next few lines as the section
                return lines.slice(i + 1, i + 4).join(' ').trim();
            }
        }
        return null;
    }

    extractListItems(text, keyword, fallback) {
        const lines = text.split('\n');
        const items = [];
        
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].toLowerCase().includes(keyword)) {
                // Look for bullet points or numbered items in following lines
                for (let j = i + 1; j < lines.length && j < i + 8; j++) {
                    const line = lines[j].trim();
                    if (line.match(/^[-•*]\s+/) || line.match(/^\d+\.\s+/)) {
                        items.push(line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, ''));
                    } else if (line === '') {
                        break;
                    }
                }
                break;
            }
        }
        
        return items.length > 0 ? items : fallback;
    }

    extractSymbols(text) {
        const commonSymbols = ['water', 'flying', 'falling', 'animals', 'family', 'house', 'car', 'fire', 'death', 'mirror', 'chase', 'school', 'work'];
        const foundSymbols = [];
        
        const lowerText = text.toLowerCase();
        commonSymbols.forEach(symbol => {
            if (lowerText.includes(symbol)) {
                foundSymbols.push(symbol);
            }
        });
        
        return foundSymbols;
    }

    determineCategoryFromText(text) {
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes('anxi') || lowerText.includes('fear') || lowerText.includes('stress')) {
            return 'anxiety';
        } else if (lowerText.includes('empower') || lowerText.includes('confident') || lowerText.includes('success')) {
            return 'empowerment';
        } else if (lowerText.includes('relation') || lowerText.includes('family') || lowerText.includes('love')) {
            return 'relationships';
        } else if (lowerText.includes('change') || lowerText.includes('transform') || lowerText.includes('growth')) {
            return 'transformation';
        } else if (lowerText.includes('creative') || lowerText.includes('artistic') || lowerText.includes('imagin')) {
            return 'creative';
        } else if (lowerText.includes('symbol') || lowerText.includes('spiritual') || lowerText.includes('meaning')) {
            return 'symbolic';
        } else {
            return 'memory';
        }
    }

    async enhanceExistingResult(dreamResult, userAnswers) {
        if (!this.isEnabled) return dreamResult;

        try {
            // Create a summary of the user's answers for context
            const answerSummary = userAnswers.map(answer => answer.text).join('; ');
            
            const enhancementPrompt = `Based on this dream analysis result and user responses, provide 3 additional personalized insights:

Dream Type: ${dreamResult.type}
User Responses: ${answerSummary}

Provide exactly 3 brief, actionable insights that build upon the existing analysis. Focus on practical guidance and deeper understanding.`;

            const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: enhancementPrompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.6,
                        maxOutputTokens: 300,
                        topP: 0.8
                    }
                })
            });

            if (!response.ok) throw new Error('Enhancement request failed');

            const data = await response.json();
            const enhancementText = data.candidates[0]?.content?.parts[0]?.text || '';

            // Parse the enhancement text into insights
            const additionalInsights = enhancementText
                .split('\n')
                .filter(line => line.trim().length > 10)
                .slice(0, 3)
                .map(insight => `🤖 AI: ${insight.replace(/^\d+\.\s*/, '').trim()}`);

            return {
                ...dreamResult,
                aiEnhanced: true,
                enhancedInsights: [
                    ...dreamResult.insights,
                    ...additionalInsights
                ]
            };
        } catch (error) {
            console.error('Enhancement failed:', error);
            return dreamResult;
        }
    }

    async testConnection() {
        if (!this.apiKey) {
            throw new Error('No API key provided');
        }

        try {
            const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: "Hello! Please respond with 'Connection successful' to test the API."
                        }]
                    }],
                    generationConfig: {
                        maxOutputTokens: 10
                    }
                })
            });

            if (response.ok) {
                return { success: true, message: 'Gemini AI connected successfully!' };
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Connection failed');
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    getStatus() {
        return {
            configured: !!this.apiKey,
            enabled: this.isEnabled,
            ready: !!(this.apiKey && this.isEnabled)
        };
    }
}

// Enhanced Dream Akinator with Gemini AI
class GeminiEnabledDreamAkinator extends DreamAkinator {
    constructor() {
        super();
        this.ai = new DreamGeminiAI();
        this.initializeAIInterface();
    }

    initializeAIInterface() {
        // Add AI tab to navigation
        const nav = document.querySelector('.navigation');
        const aiTab = document.createElement('button');
        aiTab.id = 'nav-ai';
        aiTab.className = 'nav-btn';
        aiTab.innerHTML = '🤖 AI Analysis';
        nav.insertBefore(aiTab, nav.lastElementChild);

        // Add AI screen
        this.createAIScreen();
        
        // Add event listeners
        aiTab.addEventListener('click', () => {
            this.showScreen('ai-screen');
            this.updateNavigation('nav-ai');
        });
    }

    createAIScreen() {
        const aiScreen = document.createElement('div');
        aiScreen.id = 'ai-screen';
        aiScreen.className = 'screen';
        aiScreen.innerHTML = `
            <div class="ai-container">
                <h2>🤖 Gemini AI Dream Analysis</h2>
                <div class="ai-intro">
                    <p>Get deeper insights into your dreams with Google's advanced Gemini AI! 
                    Simply get your free API key from Google AI Studio and unlock personalized dream analysis.</p>
                </div>
                
                <div id="ai-status" class="ai-status">
                    <div class="status-indicator">
                        <span id="status-icon">❌</span>
                        <span id="status-text">AI Not Configured</span>
                    </div>
                    <button id="configure-ai-btn" class="secondary-btn">Setup Gemini AI</button>
                </div>
                
                <div id="ai-config" class="ai-config" style="display: none;">
                    <h3>🔧 Setup Gemini AI Integration</h3>
                    <div class="setup-steps">
                        <ol>
                            <li>Visit <a href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</a></li>
                            <li>Sign in with your Google account</li>
                            <li>Click "Create API Key" and copy it</li>
                            <li>Paste it below and start analyzing!</li>
                        </ol>
                    </div>
                    <input type="password" id="api-key-input" placeholder="Paste your Gemini API key here">
                    <div class="config-buttons">
                        <button id="test-connection-btn" class="secondary-btn">Test Connection</button>
                        <button id="save-api-key-btn" class="primary-btn">Save & Enable AI</button>
                    </div>
                    <div id="connection-status" class="connection-status"></div>
                </div>

                <div id="dream-analysis-section" class="dream-analysis-section" style="display: none;">
                    <h3>✨ Describe Your Dream</h3>
                    <div class="dream-input-help">
                        <p><strong>💡 Tips for better analysis:</strong></p>
                        <ul>
                            <li>Include emotions you felt during the dream</li>
                            <li>Describe key people, places, and objects</li>
                            <li>Mention colors, sounds, or unusual elements</li>
                            <li>Add context about your current life situation</li>
                        </ul>
                    </div>
                    <textarea id="dream-text-input" 
                             placeholder="I dreamed that I was flying over a beautiful landscape. I felt incredibly free and powerful as I soared through the clouds. Below me, I could see a vast ocean with crystal clear water. There were people I recognized from my childhood waving at me from the shore. The sun was setting, painting everything in golden colors, and I felt a deep sense of peace and accomplishment..."
                             rows="8"></textarea>
                    <button id="analyze-dream-btn" class="primary-btn">🔍 Analyze with Gemini AI</button>
                    
                    <div id="ai-results" class="ai-results" style="display: none;">
                        <div id="ai-analysis-content"></div>
                        <div class="result-actions">
                            <button id="save-ai-analysis-btn" class="secondary-btn">💾 Save Analysis</button>
                            <button id="share-analysis-btn" class="secondary-btn">📤 Export Analysis</button>
                            <button id="analyze-another-btn" class="primary-btn">🔄 Analyze Another Dream</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.querySelector('.app-container').insertBefore(
            aiScreen, 
            document.querySelector('.navigation')
        );

        this.initializeAIEventListeners();
        this.updateAIStatus();
    }

    initializeAIEventListeners() {
        document.getElementById('configure-ai-btn').addEventListener('click', () => {
            document.getElementById('ai-config').style.display = 'block';
        });

        document.getElementById('test-connection-btn').addEventListener('click', async () => {
            await this.testConnection();
        });

        document.getElementById('save-api-key-btn').addEventListener('click', () => {
            const apiKey = document.getElementById('api-key-input').value.trim();
            if (apiKey.length > 10) {
                this.ai.setApiKey(apiKey);
                this.updateAIStatus();
                document.getElementById('api-key-input').value = '';
                document.getElementById('ai-config').style.display = 'none';
                alert('✅ Gemini AI configured successfully! You can now analyze your dreams.');
            } else {
                alert('Please enter a valid Gemini API key');
            }
        });

        document.getElementById('analyze-dream-btn').addEventListener('click', async () => {
            await this.performAIAnalysis();
        });

        document.getElementById('save-ai-analysis-btn').addEventListener('click', () => {
            this.saveAIAnalysis();
        });

        document.getElementById('share-analysis-btn').addEventListener('click', () => {
            this.exportAnalysis();
        });

        document.getElementById('analyze-another-btn').addEventListener('click', () => {
            document.getElementById('dream-text-input').value = '';
            document.getElementById('ai-results').style.display = 'none';
        });
    }

    async testConnection() {
        const apiKey = document.getElementById('api-key-input').value.trim();
        if (!apiKey) {
            alert('Please enter your API key first');
            return;
        }

        const testBtn = document.getElementById('test-connection-btn');
        const originalText = testBtn.textContent;
        testBtn.textContent = '🔍 Testing...';
        testBtn.disabled = true;

        try {
            // Temporarily set the API key for testing
            const tempAI = new DreamGeminiAI();
            tempAI.setApiKey(apiKey);
            
            const result = await tempAI.testConnection();
            const statusDiv = document.getElementById('connection-status');
            
            if (result.success) {
                statusDiv.innerHTML = `<div class="success-message">✅ ${result.message}</div>`;
                document.getElementById('save-api-key-btn').disabled = false;
            } else {
                statusDiv.innerHTML = `<div class="error-message">❌ ${result.message}</div>`;
            }
        } catch (error) {
            document.getElementById('connection-status').innerHTML = 
                `<div class="error-message">❌ Connection failed: ${error.message}</div>`;
        } finally {
            testBtn.textContent = originalText;
            testBtn.disabled = false;
        }
    }

    updateAIStatus() {
        const status = this.ai.getStatus();
        const statusIcon = document.getElementById('status-icon');
        const statusText = document.getElementById('status-text');
        const analysisSection = document.getElementById('dream-analysis-section');

        if (status.ready) {
            statusIcon.textContent = '✅';
            statusText.textContent = 'Gemini AI Ready';
            analysisSection.style.display = 'block';
        } else {
            statusIcon.textContent = '❌';
            statusText.textContent = 'AI Not Configured';
            analysisSection.style.display = 'none';
        }
    }

    async performAIAnalysis() {
        const dreamText = document.getElementById('dream-text-input').value.trim();
        if (!dreamText || dreamText.length < 20) {
            alert('Please provide a more detailed description of your dream (at least 20 characters)');
            return;
        }

        const analyzeBtn = document.getElementById('analyze-dream-btn');
        const originalText = analyzeBtn.textContent;
        
        try {
            analyzeBtn.textContent = '🧠 AI is analyzing your dream...';
            analyzeBtn.disabled = true;

            const analysis = await this.ai.analyzeDreamText(dreamText);
            this.displayAIAnalysis(analysis, dreamText);
            
        } catch (error) {
            let errorMessage = 'Analysis failed. ';
            if (error.message.includes('API key')) {
                errorMessage += 'Please check your API key.';
            } else if (error.message.includes('quota')) {
                errorMessage += 'API quota exceeded. Please try again later.';
            } else {
                errorMessage += 'Please check your connection and try again.';
            }
            
            alert(errorMessage);
            console.error('AI Analysis Error:', error);
        } finally {
            analyzeBtn.textContent = originalText;
            analyzeBtn.disabled = false;
        }
    }

    displayAIAnalysis(analysis, dreamText) {
        const resultsDiv = document.getElementById('ai-results');
        const contentDiv = document.getElementById('ai-analysis-content');

        contentDiv.innerHTML = `
            <div class="ai-analysis-result">
                <div class="analysis-header">
                    <h3>🔮 Gemini AI Dream Analysis</h3>
                    <div class="confidence-badge">
                        Confidence: ${analysis.confidence_score}/10
                    </div>
                </div>
                
                <div class="analysis-section">
                    <h4>🎭 Primary Themes</h4>
                    <div class="themes-container">
                        ${analysis.themes.map(theme => 
                            `<span class="theme-tag">${theme}</span>`
                        ).join('')}
                    </div>
                </div>

                <div class="analysis-section">
                    <h4>🧠 Psychological Interpretation</h4>
                    <p>${analysis.interpretation}</p>
                </div>

                <div class="analysis-section">
                    <h4>💭 Emotional Processing Insights</h4>
                    <p>${analysis.emotional_insights}</p>
                </div>

                <div class="analysis-section">
                    <h4>🔬 Neuroscience Insight</h4>
                    <div class="neuroscience-box">
                        <p>${analysis.neuroscience_insight}</p>
                    </div>
                </div>

                <div class="analysis-section">
                    <h4>💡 Actionable Guidance</h4>
                    <ul class="guidance-list">
                        ${analysis.actionable_advice.map(advice => 
                            `<li>${advice}</li>`
                        ).join('')}
                    </ul>
                </div>

                ${analysis.symbols_found && analysis.symbols_found.length > 0 ? `
                    <div class="analysis-section">
                        <h4>🔮 Key Symbols Identified</h4>
                        <div class="symbols-container">
                            ${analysis.symbols_found.map(symbol => 
                                `<span class="symbol-tag">${symbol}</span>`
                            ).join('')}
                        </div>
                    </div>
                ` : ''}

                <div class="dream-category">
                    <h4>📊 Dream Category</h4>
                    <div class="category-badge category-${analysis.dream_category}">
                        ${analysis.dream_category.charAt(0).toUpperCase() + analysis.dream_category.slice(1)} Dream
                    </div>
                </div>
            </div>
        `;

        this.currentAIAnalysis = {
            dreamText: dreamText,
            analysis: analysis,
            date: new Date().toLocaleDateString(),
            timestamp: new Date().toISOString(),
            type: `🤖 Gemini AI: ${analysis.dream_category} Dream`,
            source: 'gemini-ai'
        };

        resultsDiv.style.display = 'block';
        
        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    saveAIAnalysis() {
        if (this.currentAIAnalysis) {
            this.savedDreams.push(this.currentAIAnalysis);
            this.saveToLocalStorage();
            
            // Show success animation
            const saveBtn = document.getElementById('save-ai-analysis-btn');
            const originalText = saveBtn.textContent;
            saveBtn.textContent = '✅ Saved!';
            saveBtn.style.background = 'rgba(81, 207, 102, 0.3)';
            
            setTimeout(() => {
                saveBtn.textContent = originalText;
                saveBtn.style.background = '';
            }, 2000);
            
            // Check for achievements
            const newAchievements = this.checkAchievements();
            newAchievements.forEach(achievement => {
                setTimeout(() => this.showAchievementNotification(achievement), 500);
            });
        }
    }

    exportAnalysis() {
        if (!this.currentAIAnalysis) return;
        
        const exportData = {
            dream_description: this.currentAIAnalysis.dreamText,
            analysis_date: this.currentAIAnalysis.date,
            ai_analysis: this.currentAIAnalysis.analysis,
            generated_by: "Dream Akinator with Gemini AI"
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], 
                             { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dream-analysis-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Override the existing displayResult to potentially enhance with AI
    async displayResult(dreamType) {
        // First show the regular result
        super.displayResult(dreamType);
        
        // Then try to enhance it with AI if available
        if (this.ai.isEnabled) {
            try {
                const enhancedResult = await this.ai.enhanceExistingResult(
                    this.currentResult, 
                    this.answers
                );
                
                if (enhancedResult.aiEnhanced) {
                    // Update the display with enhanced insights
                    this.displayEnhancedResult(enhancedResult);
                }
            } catch (error) {
                console.log('AI enhancement failed, showing regular result');
            }
        }
    }

    displayEnhancedResult(enhancedResult) {
        const meaningElement = document.getElementById('meaning-text');
        const currentMeaning = meaningElement.innerHTML;
        
        // Add AI enhancement section
        const aiEnhancementHTML = `
            <div class="ai-enhancement">
                <h4 style="color: #ffd700; margin-top: 25px; display: flex; align-items: center; gap: 10px;">
                    🤖 AI-Enhanced Insights
                    <span style="font-size: 0.7em; background: rgba(255,215,0,0.3); padding: 3px 8px; border-radius: 10px;">POWERED BY GEMINI</span>
                </h4>
                <ul style="margin-left: 20px; margin-top: 10px;">
                    ${enhancedResult.enhancedInsights.slice(-3).map(insight => 
                        `<li style="margin: 8px 0; padding: 5px 0; border-left: 3px solid rgba(255,215,0,0.5); padding-left: 10px;">${insight}</li>`
                    ).join('')}
                </ul>
            </div>
        `;
        
        meaningElement.innerHTML = currentMeaning + aiEnhancementHTML;
        
        // Update the stored result
        this.currentResult = enhancedResult;
    }
}

// Initialize the enhanced version
document.addEventListener('DOMContentLoaded', () => {
    // Replace the original DreamAkinator with the Gemini-enhanced version
    window.dreamAkinator = new GeminiEnabledDreamAkinator();
});

