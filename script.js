class DreamAkinator {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.userProfile = { culturalBackground: null, stressLevel: null, physiologicalContext: null };
        this.dreamDatabase = this.initializeEnhancedDreamDatabase();
        this.questionTree = this.initializeEnhancedQuestionTree();
        this.brainMessages = this.initializeEnhancedBrainMessages();
        this.symbolLexicon = this.initializeSymbolLexicon();
        this.savedDreams = this.loadSavedDreams();
        this.questionPath = [];
        this.confidenceLevel = 0;
        this.emotionalScore = { positive: 0, negative: 0, neutral: 0 };
        this.initializeEventListeners();
        this.showScreen('welcome-screen');
    }

    initializeEnhancedDreamDatabase() {
        return {
            flying: {
                name: "🕊️ Flying Dreams - Freedom & Empowerment",
                interpretation: "Flying dreams represent your desire for freedom and personal empowerment. Neuroscience shows these dreams often occur when your brain processes feelings of liberation from constraints. Your motor cortex is actively firing as if you're really flying, creating this vivid embodied experience.",
                meaning: "Your subconscious is telling you that you have the power to rise above current challenges. Research shows people who dream of flying often feel more confident the next day. Your brain is literally practicing empowerment.",
                brainMessageType: "empowerment",
                scientificInsight: "Your REM sleep is activating motor areas while your body is paralyzed, creating the sensation of flight. This reflects your brain's way of processing desires for freedom and control.",
                actionableInsights: [
                    "Trust your ability to overcome current obstacles - your brain believes you can",
                    "Look for opportunities to gain more independence in your waking life",
                    "Channel this dream energy into taking bold actions toward your goals",
                    "Your mind is preparing you for success - embrace your personal power"
                ],
                keywords: ['flying', 'soaring', 'floating', 'wings', 'sky', 'clouds', 'freedom', 'high', 'abilities', 'control', 'empowered']
            },
            anxiety: {
                name: "😰 Anxiety Processing Dreams - Emotional Maintenance",
                interpretation: "Your brain is performing crucial emotional maintenance by processing stress and fears in a safe environment. Research shows that dreaming about stressors actually helps reduce anxiety the next day. Your amygdala is working with your memory centers to build emotional resilience.",
                meaning: "These dreams aren't 'bad' - they're your brain's way of helping you cope. Studies prove that people who dream about their worries feel less anxious afterward. Your mind is literally training you to handle challenges.",
                brainMessageType: "processing",
                scientificInsight: "Your brain's threat-detection system is rehearsing responses to challenges, building your emotional resilience through safe practice scenarios.",
                actionableInsights: [
                    "Recognize these dreams as mental training, not just fear responses",
                    "Your brain is actively helping you build coping skills",
                    "Practice stress-reduction techniques to support this natural process",
                    "Consider what specific worries your mind is helping you process"
                ],
                keywords: ['chased', 'falling', 'fear', 'panic', 'running', 'escaping', 'danger', 'threat', 'scary', 'helpless', 'anxious', 'worried']
            },
            relationships: {
                name: "❤️ Relationship Dreams - Social Brain Processing",
                interpretation: "Your brain is processing important social connections and emotional bonds. Neuroscience shows that dreams about people help consolidate relationship memories and work through interpersonal dynamics. Your social brain networks are highly active during these dreams.",
                meaning: "Your relationships are important enough that your brain dedicates dream time to understanding them better. These dreams help you process emotions about people you care about and can improve your social understanding.",
                brainMessageType: "connection",
                scientificInsight: "Your brain's default mode network is processing social information and relationship patterns, helping you understand and strengthen interpersonal bonds.",
                actionableInsights: [
                    "Pay attention to which relationships your brain is prioritizing",
                    "Consider reaching out to people who appeared in your dreams",
                    "These dreams may reveal your true feelings about relationships",
                    "Your social brain is helping you navigate complex interpersonal dynamics"
                ],
                keywords: ['people', 'family', 'friends', 'relationships', 'conversation', 'social', 'intimate', 'connection', 'love', 'conflict']
            },
            transformation: {
                name: "🌱 Transformation Dreams - Growth Processing",
                interpretation: "Your psyche is processing major life changes and personal evolution. Jung's research shows transformation dreams often appear during significant life transitions. Your brain is helping you integrate new aspects of your identity and let go of outdated patterns.",
                meaning: "You're in a powerful period of personal growth. Your unconscious mind recognizes that you're evolving and is helping you navigate this transformation. These dreams support your journey toward becoming who you're meant to be.",
                brainMessageType: "growth",
                scientificInsight: "Your brain's neuroplasticity is reflected in transformation dreams, showing your mind's ability to adapt and create new neural pathways for personal growth.",
                actionableInsights: [
                    "Embrace the changes happening in your life - your brain supports them",
                    "Trust the transformation process even when it feels uncertain",
                    "Let go of aspects of yourself that no longer serve your growth",
                    "Your dreams are guiding you toward your authentic self"
                ],
                keywords: ['transformation', 'change', 'death', 'rebirth', 'metamorphosis', 'evolution', 'growth', 'new', 'different', 'becoming']
            },
            creative: {
                name: "🎨 Creative Dreams - Innovation Processing",
                interpretation: "Your brain's default mode network is in high creative gear, making novel connections and generating innovative ideas. Research shows many breakthrough discoveries came from dreams. Your mind is freely combining concepts in ways that conscious thinking might inhibit.",
                meaning: "You're accessing your natural creative intelligence. These dreams often provide solutions or new perspectives on challenges. Your brain is telling you to trust your innovative instincts and creative problem-solving abilities.",
                brainMessageType: "creative",
                scientificInsight: "Your brain's creative networks are unrestricted during REM sleep, allowing for novel combinations of ideas and breakthrough insights.",
                actionableInsights: [
                    "Keep a dream journal to capture creative insights and solutions",
                    "Pay attention to unusual ideas or perspectives from your dreams",
                    "Trust your creative instincts - your brain is generating innovations",
                    "Use dream imagery for artistic inspiration or problem-solving"
                ],
                keywords: ['creative', 'artistic', 'colorful', 'music', 'art', 'innovation', 'unusual', 'strange', 'beautiful', 'imaginative', 'surreal']
            },
            symbolic: {
                name: "🔮 Symbolic Dreams - Wisdom Communication",
                interpretation: "Your deeper wisdom is communicating through universal symbols and archetypes. Jung's research shows these images appear across cultures, representing collective human experiences. Your unconscious is using ancient symbolic language to provide guidance.",
                meaning: "You're receiving messages from your inner wisdom. These symbols often point toward personal growth and life direction. Your psyche is using metaphorical language to communicate insights your rational mind might miss.",
                brainMessageType: "wisdom",
                scientificInsight: "Your brain's pattern-recognition systems are creating meaningful narratives using archetypal symbols that resonate across human experience.",
                actionableInsights: [
                    "Research the cultural meanings of symbols that appeared in your dream",
                    "Pay attention to recurring symbols - they carry personal significance",
                    "Consider what growth or change these symbols might be indicating",
                    "Trust your intuitive understanding of symbolic meanings"
                ],
                keywords: ['symbols', 'animals', 'nature', 'water', 'fire', 'spiritual', 'mystical', 'archetypal', 'meaningful', 'sacred']
            },
            memory: {
                name: "📚 Memory Consolidation Dreams - Learning Integration",
                interpretation: "Your brain is actively consolidating memories and integrating recent experiences. Research shows REM sleep strengthens important memories while reducing their emotional charge. Your hippocampus is working with other brain regions to organize and store information.",
                meaning: "Your mind is performing essential maintenance by organizing recent experiences and learning. These dreams help you make sense of complex situations and retain important information while processing emotions healthily.",
                brainMessageType: "learning",
                scientificInsight: "Your brain's memory consolidation system is working optimally, transferring information from temporary to long-term storage while processing associated emotions.",
                actionableInsights: [
                    "Trust your brain's natural learning and integration process",
                    "Reflect on recent experiences that may need emotional processing",
                    "Good sleep supports better memory formation and emotional balance",
                    "These dreams are helping you learn and adapt to new situations"
                ],
                keywords: ['familiar', 'recent', 'past', 'memory', 'school', 'work', 'learning', 'studying', 'remembering', 'nostalgia']
            },
            healing: {
                name: "🌿 Healing Dreams - Trauma Processing",
                interpretation: "Your psyche is courageously working to process and integrate difficult experiences. Research shows that trauma survivors' dreams often evolve from chaotic nightmares to scenarios where they fight back or find support. This represents natural healing in progress.",
                meaning: "These dreams, while sometimes difficult, are part of your natural healing process. Your mind is working to transform painful experiences into wisdom and strength. This shows incredible resilience and your brain's capacity for recovery.",
                brainMessageType: "healing",
                scientificInsight: "Your nervous system is gradually building resilience by safely processing trauma memories during REM sleep, helping transform overwhelming experiences into integrated healing.",
                actionableInsights: [
                    "Recognize these dreams as part of your courageous healing journey",
                    "Consider professional support to complement your natural healing process",
                    "Notice any positive changes in how you respond in dreams over time",
                    "Practice self-compassion - healing takes time and these dreams show progress"
                ],
                keywords: ['trauma', 'healing', 'recovery', 'nightmare', 'overcome', 'survivor', 'strength', 'resilience', 'transformation']
            }
        };
    }

    initializeEnhancedQuestionTree() {
        return [
            {
                question: "What was the primary emotional atmosphere of your dream?",
                answers: [
                    { text: "Empowering and liberating - I felt strong, capable, and free", tags: ['empowered', 'strong', 'free', 'confident', 'flying'] },
                    { text: "Anxious and stressful - I felt threatened, chased, or overwhelmed", tags: ['anxious', 'stressed', 'threatened', 'chased', 'overwhelmed'] },
                    { text: "Loving and connected - focused on relationships and emotions", tags: ['loving', 'connected', 'relationships', 'emotional', 'intimate'] },
                    { text: "Mysterious and symbolic - full of meaningful images and metaphors", tags: ['mysterious', 'symbolic', 'meaningful', 'archetypal', 'spiritual'] }
                ]
            },
            {
                question: "How did your body feel and move in the dream?",
                answers: [
                    { text: "I was flying, floating, or had supernatural abilities", tags: ['flying', 'floating', 'supernatural', 'abilities', 'empowered'] },
                    { text: "I was running, escaping, or moving urgently", tags: ['running', 'escaping', 'urgent', 'chased', 'anxious'] },
                    { text: "I felt paralyzed, slow, or unable to move properly", tags: ['paralyzed', 'slow', 'stuck', 'helpless', 'frustrated'] },
                    { text: "Movement felt normal or I don't remember physical sensations", tags: ['normal', 'realistic', 'ordinary', 'memory'] }
                ]
            },
            {
                question: "What dominated the visual landscape of your dream?",
                answers: [
                    { text: "Vast open spaces - sky, horizons, or unlimited environments", tags: ['vast', 'open', 'sky', 'unlimited', 'freedom', 'flying'] },
                    { text: "Familiar places from your daily life - home, work, school", tags: ['familiar', 'daily', 'home', 'work', 'memory', 'realistic'] },
                    { text: "Strange, fantastical, or impossible environments", tags: ['strange', 'fantastical', 'impossible', 'creative', 'surreal'] },
                    { text: "Natural elements - water, forests, animals, or earth", tags: ['natural', 'water', 'forest', 'animals', 'symbolic', 'spiritual'] }
                ]
            },
            {
                question: "Who were the main characters in your dream experience?",
                answers: [
                    { text: "People close to me - family, friends, or romantic partners", tags: ['close', 'family', 'friends', 'romantic', 'relationships', 'intimate'] },
                    { text: "Strangers, mysterious figures, or symbolic beings", tags: ['strangers', 'mysterious', 'symbolic', 'archetypal', 'unknown'] },
                    { text: "I was mostly alone or the focus was on my personal experience", tags: ['alone', 'personal', 'individual', 'self', 'empowered'] },
                    { text: "Threatening figures or people causing me distress", tags: ['threatening', 'distressing', 'dangerous', 'chased', 'anxious'] }
                ]
            },
            {
                question: "What was the main theme or action in your dream?",
                answers: [
                    { text: "Achieving something, overcoming obstacles, or succeeding", tags: ['achieving', 'overcoming', 'succeeding', 'victory', 'empowered'] },
                    { text: "Being tested, evaluated, or facing challenges", tags: ['tested', 'evaluated', 'challenges', 'performance', 'anxious'] },
                    { text: "Connecting with others or working through relationships", tags: ['connecting', 'relationships', 'working-through', 'social', 'emotional'] },
                    { text: "Exploring, discovering, or experiencing something new", tags: ['exploring', 'discovering', 'new', 'creative', 'growth'] }
                ]
            },
            {
                question: "How did you feel when you first woke up from this dream?",
                answers: [
                    { text: "Energized and positive - ready to take on the day", tags: ['energized', 'positive', 'motivated', 'empowered', 'confident'] },
                    { text: "Anxious or unsettled - the dream left me feeling worried", tags: ['anxious', 'unsettled', 'worried', 'stressed', 'negative'] },
                    { text: "Curious and reflective - like there was deeper meaning", tags: ['curious', 'reflective', 'meaningful', 'symbolic', 'thoughtful'] },
                    { text: "Emotional - the dream stirred up strong feelings", tags: ['emotional', 'stirred', 'feelings', 'processing', 'relationships'] }
                ]
            },
            {
                question: "Did anything in your dream change or transform?",
                answers: [
                    { text: "I transformed - gained new abilities or changed form", tags: ['self-transformation', 'abilities', 'growth', 'evolution', 'empowered'] },
                    { text: "The environment shifted - places morphed or reality changed", tags: ['environment-change', 'morphing', 'reality-shift', 'creative', 'surreal'] },
                    { text: "Relationships or people changed throughout the dream", tags: ['relationship-change', 'people-change', 'social', 'dynamic'] },
                    { text: "Everything remained consistent and realistic", tags: ['consistent', 'realistic', 'stable', 'memory', 'normal'] }
                ]
            },
            {
                question: "What symbols or elements stood out most prominently?",
                answers: [
                    { text: "Animals, nature, or natural elements like water and fire", tags: ['animals', 'nature', 'water', 'fire', 'symbolic', 'archetypal'] },
                    { text: "Technology, vehicles, or modern objects", tags: ['technology', 'vehicles', 'modern', 'realistic', 'contemporary'] },
                    { text: "People and social interactions were the main focus", tags: ['people', 'social', 'interactions', 'relationships', 'emotional'] },
                    { text: "Abstract concepts, colors, or unusual imagery", tags: ['abstract', 'colors', 'unusual', 'creative', 'artistic'] }
                ]
            },
            {
                question: "How would you describe the overall story structure?",
                answers: [
                    { text: "Clear narrative with triumph or resolution", tags: ['clear', 'triumph', 'resolution', 'success', 'empowered'] },
                    { text: "Fragmented scenes jumping between different scenarios", tags: ['fragmented', 'jumping', 'scattered', 'processing', 'memory'] },
                    { text: "Repetitive or cyclical - doing similar things repeatedly", tags: ['repetitive', 'cyclical', 'stuck', 'anxious', 'obsessive'] },
                    { text: "Symbolic journey or meaningful progression", tags: ['symbolic', 'journey', 'meaningful', 'progression', 'growth'] }
                ]
            },
            {
                question: "What recent life experiences might have influenced this dream?",
                answers: [
                    { text: "Work or school pressures and performance expectations", tags: ['work', 'school', 'pressure', 'performance', 'anxious', 'stressed'] },
                    { text: "Relationship dynamics or family interactions", tags: ['relationships', 'family', 'social', 'emotional', 'interpersonal'] },
                    { text: "Personal growth, learning, or new experiences", tags: ['growth', 'learning', 'new', 'development', 'creative'] },
                    { text: "Major life changes or transitions", tags: ['changes', 'transitions', 'transformation', 'evolution', 'growth'] }
                ]
            },
            {
                question: "How vivid and memorable was this dream compared to others?",
                answers: [
                    { text: "Extremely vivid and unforgettable - like a movie", tags: ['vivid', 'unforgettable', 'cinematic', 'significant', 'impactful'] },
                    { text: "Clear but dreamlike - obviously not real", tags: ['clear', 'dreamlike', 'normal', 'typical'] },
                    { text: "Emotionally intense even if visually unclear", tags: ['emotionally-intense', 'unclear', 'feeling', 'processing'] },
                    { text: "Symbolic and meaningful despite being hazy", tags: ['symbolic', 'meaningful', 'hazy', 'archetypal', 'wisdom'] }
                ]
            },
            {
                question: "What do you think your brain was trying to process or communicate?",
                answers: [
                    { text: "Building my confidence and sense of personal power", tags: ['confidence', 'power', 'strength', 'empowered', 'growth'] },
                    { text: "Working through stress, fears, or current challenges", tags: ['stress', 'fears', 'challenges', 'processing', 'anxious'] },
                    { text: "Strengthening connections with important people in my life", tags: ['connections', 'people', 'relationships', 'social', 'bonding'] },
                    { text: "Providing guidance or insight through symbolic messages", tags: ['guidance', 'insight', 'symbolic', 'wisdom', 'spiritual'] }
                ]
            }
        ];
    }

    initializeEnhancedBrainMessages() {
        return {
            empowerment: [
                "🚀 Your brain recognizes your incredible potential and inner strength!",
                "⭐ Your subconscious is preparing you for success and achievement!",
                "💪 Your mind sees you rising above challenges with confidence!",
                "🦅 Your psyche is celebrating your ability to soar beyond limitations!"
            ],
            processing: [
                "🧠 Your brain is performing essential emotional maintenance!",
                "🔧 Your mind is building resilience through safe dream practice!",
                "⚡ Your REM sleep is actively strengthening your coping abilities!",
                "🛡️ Your psyche is training you to handle life's challenges!"
            ],
            connection: [
                "❤️ Your social brain is deepening your understanding of relationships!",
                "🤝 Your mind is strengthening bonds with people who matter to you!",
                "💞 Your psyche is processing the beautiful complexity of human connection!",
                "🌟 Your brain celebrates the love and connections in your life!"
            ],
            growth: [
                "🌱 Your mind recognizes the beautiful transformation happening within you!",
                "🦋 Your psyche is supporting your evolution into who you're becoming!",
                "🌟 Your brain is integrating new aspects of your authentic self!",
                "🔄 Your subconscious celebrates your courage to grow and change!"
            ],
            creative: [
                "🎨 Your creative networks are generating breakthrough innovations!",
                "💡 Your brain is making brilliant connections while you sleep!",
                "🌈 Your imagination is solving problems in beautifully unique ways!",
                "✨ Your mind is accessing unlimited creative potential!"
            ],
            wisdom: [
                "🔮 Your inner wisdom is speaking through ancient symbolic language!",
                "🗝️ Your deeper self is providing guidance through meaningful images!",
                "🌙 Your psyche is connecting you to timeless human wisdom!",
                "📜 Your subconscious is revealing insights your rational mind might miss!"
            ],
            learning: [
                "📚 Your brain is expertly organizing and integrating recent experiences!",
                "🧩 Your mind is creating beautiful connections between new and old knowledge!",
                "💫 Your memory systems are working optimally to support your growth!",
                "🎯 Your brain is helping you understand and adapt to life's complexities!"
            ],
            healing: [
                "🌿 Your courageous psyche is transforming pain into wisdom and strength!",
                "💚 Your natural healing capacity is working powerfully through your dreams!",
                "🕊️ Your brain is building resilience and hope from difficult experiences!",
                "🌸 Your mind celebrates your incredible capacity for recovery and growth!"
            ]
        };
    }

    initializeSymbolLexicon() {
        return {
            water: { meanings: ["emotions", "unconscious", "cleansing", "flow"], cultural: "Universal symbol of life and emotion" },
            flying: { meanings: ["freedom", "transcendence", "empowerment", "escape"], cultural: "Cross-cultural symbol of liberation" },
            animals: { meanings: ["instincts", "natural wisdom", "primal energy"], cultural: "Spirit guides in many traditions" },
            death: { meanings: ["transformation", "ending", "rebirth", "change"], cultural: "Symbol of renewal across cultures" },
            house: { meanings: ["self", "psyche", "different life aspects"], cultural: "Universal symbol of inner self" },
            chase: { meanings: ["avoidance", "fear", "pressure", "running from issues"], cultural: "Common stress response symbol" }
        };
    }

    initializeEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('play-again-btn').addEventListener('click', () => this.resetGame());
        document.getElementById('save-dream-btn').addEventListener('click', () => this.saveDream());
        document.getElementById('back-to-home-btn').addEventListener('click', () => this.showScreen('welcome-screen'));
        
        document.getElementById('nav-home').addEventListener('click', () => {
            this.showScreen('welcome-screen');
            this.updateNavigation('nav-home');
        });
        
        document.getElementById('nav-journal').addEventListener('click', () => {
            this.showScreen('journal-screen');
            this.updateNavigation('nav-journal');
            this.displaySavedDreams();
        });
    }

    startGame() {
        this.currentQuestion = 0;
        this.answers = [];
        this.questionPath = [];
        this.confidenceLevel = 0;
        this.emotionalScore = { positive: 0, negative: 0, neutral: 0 };
        this.showScreen('question-screen');
        this.displayQuestion();
    }

    displayQuestion() {
        // Show brain message first
        this.showBrainMessage();
        
        if (this.shouldEndQuestioning()) {
            setTimeout(() => this.analyzeAnswers(), 2000);
            return;
        }

        const question = this.questionTree[this.currentQuestion];
        document.getElementById('question-text').textContent = question.question;
        
        const answersContainer = document.getElementById('answers-container');
        answersContainer.innerHTML = '';

        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer.text;
            button.addEventListener('click', () => this.selectAnswer(answer, index));
            answersContainer.appendChild(button);
        });

        this.updateProgress();
    }

    shouldEndQuestioning() {
        if (this.currentQuestion >= 12) return true;
        
        // Calculate confidence based on tag consistency
        const allTags = this.answers.flatMap(answer => answer.tags);
        const tagCounts = {};
        allTags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
        
        const maxCount = Math.max(...Object.values(tagCounts));
        this.confidenceLevel = maxCount / allTags.length;
        
        return this.currentQuestion >= 8 && this.confidenceLevel > 0.4;
    }

    showBrainMessage() {
        const allTags = this.answers.flatMap(answer => answer.tags);
        let messageType = 'processing';
        
        // Determine message type based on current answers
        if (allTags.some(tag => ['empowered', 'confident', 'flying', 'strong'].includes(tag))) {
            messageType = 'empowerment';
        } else if (allTags.some(tag => ['anxious', 'stressed', 'chased', 'threatened'].includes(tag))) {
            messageType = 'processing';
        } else if (allTags.some(tag => ['relationships', 'social', 'emotional', 'intimate'].includes(tag))) {
            messageType = 'connection';
        } else if (allTags.some(tag => ['growth', 'transformation', 'evolution'].includes(tag))) {
            messageType = 'growth';
        } else if (allTags.some(tag => ['creative', 'artistic', 'unusual'].includes(tag))) {
            messageType = 'creative';
        } else if (allTags.some(tag => ['symbolic', 'meaningful', 'spiritual'].includes(tag))) {
            messageType = 'wisdom';
        }
        
        const messages = this.brainMessages[messageType];
        const selectedMessage = messages[Math.floor(Math.random() * messages.length)];
        
        this.displayBrainMessage(selectedMessage);
    }

    displayBrainMessage(message) {
        const questionContainer = document.querySelector('.question-container');
        
        // Remove existing brain message
        const existingMessage = document.getElementById('brain-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new brain message
        const brainMessage = document.createElement('div');
        brainMessage.id = 'brain-message';
        brainMessage.className = 'brain-message';
        brainMessage.innerHTML = `
            <div class="brain-message-content">
                <div class="brain-pulse">🧠</div>
                <p>${message}</p>
            </div>
        `;
        
        const questionText = document.getElementById('question-text');
        questionContainer.insertBefore(brainMessage, questionText);
        
        setTimeout(() => {
            brainMessage.classList.add('show');
        }, 100);
    }

    selectAnswer(answer, index) {
        this.answers.push(answer);
        this.currentQuestion++;
        
        // Visual feedback
        const buttons = document.querySelectorAll('.answer-btn');
        buttons[index].style.background = 'rgba(255, 215, 0, 0.3)';
        buttons[index].style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.displayQuestion();
        }, 800);
    }

    analyzeAnswers() {
        const allTags = this.answers.flatMap(answer => answer.tags);
        
        // Calculate emotional scores
        this.calculateEmotionalScores(allTags);
        
        const dreamScores = {};

        Object.keys(this.dreamDatabase).forEach(dreamType => {
            const dreamData = this.dreamDatabase[dreamType];
            let score = 0;
            
            dreamData.keywords.forEach(keyword => {
                const matches = allTags.filter(tag => 
                    tag === keyword || 
                    tag.includes(keyword) || 
                    keyword.includes(tag) ||
                    this.areRelated(tag, keyword)
                ).length;
                score += matches * 3;
            });
            
            // Tag frequency bonus
            const tagCounts = {};
            allTags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });

            Object.entries(tagCounts).forEach(([tag, count]) => {
                if (dreamData.keywords.includes(tag) && count > 1) {
                    score += count * 2;
                }
            });
            
            dreamScores[dreamType] = score;
        });

        const bestMatch = Object.keys(dreamScores).reduce((a, b) => 
            dreamScores[a] > dreamScores[b] ? a : b
        );

        this.displayResult(bestMatch);
    }

    calculateEmotionalScores(tags) {
        this.emotionalScore = { positive: 0, negative: 0, neutral: 0 };
        
        const positiveWords = ['empowered', 'confident', 'strong', 'positive', 'energized', 'motivated', 'successful'];
        const negativeWords = ['anxious', 'stressed', 'threatened', 'worried', 'negative', 'unsettled', 'fearful'];
        
        tags.forEach(tag => {
            if (positiveWords.some(word => tag.includes(word))) {
                this.emotionalScore.positive++;
            } else if (negativeWords.some(word => tag.includes(word))) {
                this.emotionalScore.negative++;
            } else {
                this.emotionalScore.neutral++;
            }
        });
    }

    areRelated(tag1, tag2) {
        const relationships = {
            'empowered': ['confident', 'strong', 'flying', 'abilities', 'successful'],
            'anxious': ['stressed', 'threatened', 'chased', 'worried', 'fearful'],
            'relationships': ['social', 'emotional', 'intimate', 'family', 'friends'],
            'transformation': ['growth', 'evolution', 'change', 'becoming'],
            'creative': ['artistic', 'unusual', 'imaginative', 'innovative'],
            'symbolic': ['meaningful', 'spiritual', 'archetypal', 'wisdom'],
            'memory': ['familiar', 'recent', 'past', 'learning', 'realistic'],
            'healing': ['trauma', 'recovery', 'resilience', 'overcome']
        };

        for (const [key, related] of Object.entries(relationships)) {
            if ((tag1 === key && related.includes(tag2)) || 
                (tag2 === key && related.includes(tag1)) ||
                (related.includes(tag1) && related.includes(tag2))) {
                return true;
            }
        }
        return false;
    }

    displayResult(dreamType) {
        const dreamData = this.dreamDatabase[dreamType];
        
        const brainMessages = this.brainMessages[dreamData.brainMessageType];
        const finalMessage = brainMessages[Math.floor(Math.random() * brainMessages.length)];
        
        document.getElementById('dream-type').textContent = dreamData.name;
        
        document.getElementById('interpretation-text').innerHTML = `
            <div class="final-brain-message">
                <div class="brain-pulse">🧠</div>
                <p><strong>${finalMessage}</strong></p>
            </div>
            <div class="scientific-insight">
                <h4>🔬 Scientific Insight</h4>
                <p>${dreamData.scientificInsight}</p>
            </div>
            <p>${dreamData.interpretation}</p>
        `;
        
        const meaningHtml = `
            <p>${dreamData.meaning}</p>
            <h4 style="color: #ffd700; margin-top: 20px; margin-bottom: 10px;">💡 Your Brain's Guidance</h4>
            <ul style="text-align: left; padding-left: 20px;">
                ${dreamData.actionableInsights.map(insight => `<li style="margin: 8px 0;">${insight}</li>`).join('')}
            </ul>
            <div class="emotional-summary">
                <h4 style="color: #ffd700; margin-top: 20px;">🎭 Emotional Analysis</h4>
                <div style="display: flex; justify-content: space-around; margin: 15px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                    <div style="text-align: center;">
                        <div style="font-size: 1.5em; color: #51cf66;">😊</div>
                        <div>Positive: ${this.emotionalScore.positive}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.5em; color: #ffd700;">😐</div>
                        <div>Neutral: ${this.emotionalScore.neutral}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.5em; color: #ff6b6b;">😟</div>
                        <div>Negative: ${this.emotionalScore.negative}</div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('meaning-text').innerHTML = meaningHtml;
        
        this.currentResult = {
            type: dreamData.name,
            interpretation: dreamData.interpretation,
            meaning: dreamData.meaning,
            scientificInsight: dreamData.scientificInsight,
            brainMessage: finalMessage,
            insights: dreamData.actionableInsights,
            questionsAsked: this.currentQuestion,
            emotionalScore: this.emotionalScore,
            confidenceLevel: Math.round(this.confidenceLevel * 100),
            date: new Date().toLocaleDateString()
        };
        
        this.showScreen('result-screen');
    }

    updateProgress() {
        const totalQuestions = Math.min(12, Math.max(8, this.currentQuestion + 4));
        const progress = (this.currentQuestion / totalQuestions) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('question-counter').textContent = 
            `Question ${this.currentQuestion + 1} of ~${totalQuestions}`;
    }

    saveDream() {
        if (this.currentResult) {
            this.savedDreams.push(this.currentResult);
            this.saveToLocalStorage();
            alert('Dream saved to your journal! 📖');
        }
    }

    displaySavedDreams() {
        const container = document.getElementById('saved-dreams');
        container.innerHTML = '';

        if (this.savedDreams.length === 0) {
            container.innerHTML = '<p style="text-align: center; opacity: 0.7;">No dreams saved yet. Start analyzing your dreams to build your journal!</p>';
            return;
        }

        this.savedDreams.slice().reverse().forEach((dream, index) => {
            const dreamElement = document.createElement('div');
            dreamElement.className = 'dream-entry';
            
            dreamElement.innerHTML = `
                <h4>${dream.type}</h4>
                <div class="date">Saved on ${dream.date} • ${dream.questionsAsked || 'N/A'} questions • ${dream.confidenceLevel || 'N/A'}% confidence</div>
                ${dream.brainMessage ? `<p><strong>🧠 Brain Message:</strong> ${dream.brainMessage}</p>` : ''}
                ${dream.scientificInsight ? `<p><strong>🔬 Scientific Insight:</strong> ${dream.scientificInsight}</p>` : ''}
                <p><strong>Interpretation:</strong> ${dream.interpretation}</p>
                <p><strong>Meaning:</strong> ${dream.meaning}</p>
                ${dream.insights ? `
                    <p><strong>💡 Guidance:</strong></p>
                    <ul style="margin-left: 20px;">
                        ${dream.insights.map(insight => `<li>${insight}</li>`).join('')}
                    </ul>
                ` : ''}
                ${dream.emotionalScore ? `
                    <div style="margin-top: 10px; font-size: 0.9em; opacity: 0.8;">
                        Emotional Analysis: 😊${dream.emotionalScore.positive} 😐${dream.emotionalScore.neutral} 😟${dream.emotionalScore.negative}
                    </div>
                ` : ''}
            `;
            container.appendChild(dreamElement);
        });
    }

    resetGame() {
        this.currentQuestion = 0;
        this.answers = [];
        this.questionPath = [];
        this.confidenceLevel = 0;
        this.emotionalScore = { positive: 0, negative: 0, neutral: 0 };
        this.showScreen('welcome-screen');
        this.updateNavigation('nav-home');
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    updateNavigation(activeId) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(activeId).classList.add('active');
    }

    saveToLocalStorage() {
        localStorage.setItem('dreamAkinatorJournal', JSON.stringify(this.savedDreams));
    }

    loadSavedDreams() {
        const saved = localStorage.getItem('dreamAkinatorJournal');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DreamAkinator();
});