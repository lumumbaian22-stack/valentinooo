// Initialize response tracking
let elsyResponse = {
    accepted: false,
    timestamp: null,
    message: "",
    customMessage: ""
};

// Secret activation tracking
let clickCount = 0;
let responseUnlocked = false;

// Current RSVP choice
let currentRSVPChoice = null;

// ==============================================
// MEDIA GALLERY 
// ==============================================
let mediaGallery = [
    {
        id: 1,
        type: "photo",
        src: "media/new_image_6.jpg",
        caption: "Our dates are always special to me my love"
    },
    {
        id: 2,
        type: "photo",
        src: "media/ninth_image.jpeg",
        caption: "It wasn’t the phone, it was us.we always look good together"
    },
    {
        id: 3,
        type: "photo",
        src: "media/new_image_2.jpeg",
        caption: "Your happiness that day still warms me."
    },
    {
        id: 4,
        type: "video",
        src: "media/new_video_1.mp4",
        caption: "With you, time slows and hearts listen."
    },
    {
        id: 5,
        type: "photo",
        src: "media/new_image_1.jpeg",
        caption: "Time with you rewrites my definition of happiness."
    },
    {
        id: 6,
        type: "video",
        src: "media/new_video_5.jpg",
        caption: "Your lips teaches my heart how love feels."
    }
];

// ==============================================
// LOVE MESSAGES
// ==============================================
const loveMessages = [
    "Elsy, your smile is the first thing I think of when I wake up and the last thing I dream about at night.",
    "Every moment with you feels like a beautiful dream I never want to wake up from.",
    "If I had to choose between breathing and loving you, I would use my last breath to tell you I love you.",
    "You are the missing piece I never knew I was searching for, Elsy.",
    "My love for you grows stronger with each passing day, like a river that never runs dry.",
    "In your eyes, I found my home. In your heart, I found my peace.",
    "Elsy, you are the reason I believe in soulmates. We were meant to find each other.",
    "Loving you is the easiest and most natural thing I've ever done.",
    "If love were a journey, I'd travel the world with you, hand in hand, forever.",
    "You are my today and all of my tomorrows, Elsy."
];

// ==============================================
// CINEMATIC INTRO ANIMATION
// ==============================================
function createCinematicIntro() {
    const introHearts = document.getElementById('introHearts');
    const introProgress = document.getElementById('introProgress');
    
    // Create floating hearts for intro
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'intro-heart';
            heart.innerHTML = '❤️';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.animationDelay = `${Math.random() * 3}s`;
            heart.style.fontSize = `${Math.random() * 2 + 1.5}rem`;
            heart.style.opacity = `${Math.random() * 0.5 + 0.3}`;
            introHearts.appendChild(heart);
        }, i * 100);
    }
    
    // Animate title and subtitle
    const title = document.querySelector('.intro-title');
    const subtitle = document.querySelector('.intro-subtitle');
    const date = document.querySelector('.intro-date');
    
    // Progress animation
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 1;
        introProgress.style.width = `${progress}%`;
        
        if (progress >= 20) {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
            title.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
        }
        
        if (progress >= 40) {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
            subtitle.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
        }
        
        if (progress >= 60) {
            date.style.opacity = '1';
            date.style.transform = 'translateY(0)';
            date.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                document.getElementById('cinematicIntro').style.opacity = '0';
                document.getElementById('cinematicIntro').style.pointerEvents = 'none';
                setTimeout(() => {
                    document.getElementById('cinematicIntro').style.display = 'none';
                    startLoadingScreen();
                }, 1000);
            }, 500);
        }
    }, 40);
}

// ==============================================
// LOADING SCREEN
// ==============================================
function startLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    const loadingText = document.getElementById('loadingText');
    
    // Show loading screen
    loadingScreen.style.opacity = '1';
    loadingScreen.style.pointerEvents = 'all';
    
    // Loading messages
    const loadingMessages = [
        "Loading Our Love Story...",
        "Preparing Special Memories...",
        "Setting the Romantic Mood...",
        "Almost Ready...",
        "Welcome to Our Love Story!"
    ];
    
    // Simulate loading with progress bar
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 8 + 2;
        if (progress > 100) progress = 100;
        loadingProgress.style.width = `${progress}%`;
        
        // Update loading text based on progress
        if (progress < 20) loadingText.textContent = loadingMessages[0];
        else if (progress < 40) loadingText.textContent = loadingMessages[1];
        else if (progress < 60) loadingText.textContent = loadingMessages[2];
        else if (progress < 80) loadingText.textContent = loadingMessages[3];
        else loadingText.textContent = loadingMessages[4];
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.pointerEvents = 'none';
                document.getElementById('websiteContent').style.display = 'block';
                createFloatingHearts();
                setTimeout(() => {
                    initializeEverything();
                }, 100);
            }, 800);
        }
    }, 150);
}

// ==============================================
// ROMANTIC BACKGROUND MUSIC - FIXED PROPERLY
// ==============================================
let backgroundMusic = document.getElementById('backgroundMusic');
let notificationSound = document.getElementById('notificationSound');
let isMusicPlaying = false;

function initializeMusicPlayer() {
    backgroundMusic.volume = 0.4;
    
    const musicPlayer = document.getElementById('musicPlayer');
    const playIcon = musicPlayer.querySelector('.fa-play');
    const pauseIcon = musicPlayer.querySelector('.fa-pause');
    
    // Set initial state
    playIcon.style.opacity = '1';
    pauseIcon.style.opacity = '0';
    
    musicPlayer.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (isMusicPlaying) {
            // Pause the music
            backgroundMusic.pause();
            musicPlayer.classList.remove('playing');
            musicPlayer.classList.add('paused');
            playIcon.style.opacity = '1';
            pauseIcon.style.opacity = '0';
            showNotification("Music paused ⏸️");
        } else {
            // Play the music
            backgroundMusic.play()
                .then(() => {
                    isMusicPlaying = true;
                    musicPlayer.classList.add('playing');
                    musicPlayer.classList.remove('paused');
                    playIcon.style.opacity = '0';
                    pauseIcon.style.opacity = '1';
                    showNotification("Music playing 🎵");
                })
                .catch(error => {
                    console.log("Autoplay blocked:", error);
                    showNotification("Click the button again to play music 🎵");
                });
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    // Handle audio ending
    backgroundMusic.addEventListener('ended', () => {
        isMusicPlaying = false;
        musicPlayer.classList.remove('playing');
        musicPlayer.classList.add('paused');
        playIcon.style.opacity = '1';
        pauseIcon.style.opacity = '0';
    });
}

function playNotificationSound() {
    notificationSound.currentTime = 0;
    notificationSound.volume = 0.5;
    notificationSound.play().catch(e => console.log("Could not play notification sound"));
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    initializeMusicPlayer();
});

// ==============================================
// INITIALIZE EVERYTHING
// ==============================================
function initializeEverything() {
    generateLoveMessage();
    setupSecretActivation();
    setupNavigation();
    initializeMediaGallery();
    initializeMusicPlayer();
    
    // Check for saved response on load
    const savedResponse = localStorage.getItem('elsyValentineResponse');
    if (savedResponse) {
        elsyResponse = JSON.parse(savedResponse);
    }
    
    // Add heartbeat animation to all heart icons
    document.querySelectorAll('.welcome-heart').forEach(icon => {
        icon.style.animation = 'heartbeat 1.8s infinite';
    });
}

// ==============================================
// RSVP SYSTEM
// ==============================================
function showCustomMessageInput(accepted) {
    currentRSVPChoice = accepted;
    document.getElementById('rsvpCustomMessage').style.display = 'block';
    document.querySelector('.rsvp-buttons').style.display = 'none';
    
    const textarea = document.getElementById('rsvpCustomMessageText');
    if (accepted) {
        textarea.placeholder = "Write your excited message here! (e.g., 'I can't wait to see you! 💖' or 'What should I wear?')";
    } else {
        textarea.placeholder = "Write your message here... (e.g., 'I wish I could make it, maybe another day?' or 'I have other plans but let's celebrate soon!')";
    }
    
    textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
        textarea.focus();
    }, 300);
}

function hideCustomMessageInput() {
    document.getElementById('rsvpCustomMessage').style.display = 'none';
    document.querySelector('.rsvp-buttons').style.display = 'flex';
    currentRSVPChoice = null;
}

function submitRSVP() {
    const customMessage = document.getElementById('rsvpCustomMessageText').value.trim();
    
    if (!customMessage && currentRSVPChoice === false) {
        showNotification("Please add a message to let Lumumba know why you can't make it 💭");
        return;
    }
    
    // Save Elsy's response with custom message
    saveResponse(currentRSVPChoice, customMessage);
    
    // Show response on invitation page
    const rsvpResponse = document.getElementById('rsvpResponse');
    rsvpResponse.style.display = 'block';
    
    if (currentRSVPChoice) {
        rsvpResponse.innerHTML = `
            <div class="response-success">
                <div style="font-size: 3rem; margin-bottom: 1rem;">💖🎉</div>
                <p style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">You've made me the happiest man in the world!</p>
                <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">I'll be in touch with all the details for our special Valentine's Day!</p>
                ${customMessage ? `
                <div style="margin-top: 1.5rem; padding: 20px; background: rgba(255, 255, 255, 0.9); border-radius: 12px; border-left: 4px solid #2E7D32;">
                    <p style="font-style: italic; color: #555; line-height: 1.6;">"${customMessage}"</p>
                    <p style="font-size: 0.9rem; color: #888; margin-top: 10px; text-align: right;">- Your message to Lumumba</p>
                </div>` : ''}
            </div>
        `;
        
        createCelebrationEffect();
        showNotification("Your response has been recorded! 💖");
    } else {
        rsvpResponse.innerHTML = `
            <div class="response-declined">
                <div style="font-size: 3rem; margin-bottom: 1rem;">😢</div>
                <p style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">My heart is a little broken, but I understand.</p>
                <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">Maybe we can celebrate another time?</p>
                ${customMessage ? `
                <div style="margin-top: 1.5rem; padding: 20px; background: rgba(255, 255, 255, 0.9); border-radius: 12px; border-left: 4px solid #c62828;">
                    <p style="font-style: italic; color: #555; line-height: 1.6;">"${customMessage}"</p>
                    <p style="font-size: 0.9rem; color: #888; margin-top: 10px; text-align: right;">- Your message to Lumumba</p>
                </div>` : ''}
            </div>
        `;
    }
    
    hideCustomMessageInput();
    rsvpResponse.scrollIntoView({ behavior: 'smooth', block: 'center' });
    playNotificationSound();
}

// Save response to localStorage with custom message
function saveResponse(accepted, customMessage = "") {
    elsyResponse.accepted = accepted;
    elsyResponse.timestamp = new Date().toISOString();
    elsyResponse.customMessage = customMessage;
    elsyResponse.message = accepted ? 
        `Elsy has accepted your Valentine's invitation! 💖` : 
        `Elsy has declined your invitation. 😢`;
    
    // Save to localStorage
    localStorage.setItem('elsyValentineResponse', JSON.stringify(elsyResponse));
}

// ==============================================
// MEDIA GALLERY FUNCTIONS
// ==============================================
function initializeMediaGallery() {
    const gallery = document.getElementById('mediaGallery');
    
    // Clear gallery
    gallery.innerHTML = '';
    
    // Add media to gallery
    mediaGallery.forEach(media => {
        const mediaElement = document.createElement('div');
        mediaElement.className = 'media-frame';
        mediaElement.dataset.id = media.id;
        
        let mediaContent = '';
        if (media.type === 'photo') {
            mediaContent = `
                <div class="media-content">
                    <img src="${media.src}" alt="Memory photo" loading="lazy" onload="resizeMediaContent(this)">
                </div>
            `;
        } else if (media.type === 'video') {
            mediaContent = `
                <div class="media-content">
                    <video preload="metadata" onloadedmetadata="resizeMediaContent(this)">
                        <source src="${media.src}" type="video/mp4">
                    </video>
                </div>
            `;
        }
        
        mediaElement.innerHTML = `
            ${mediaContent}
            <div class="media-caption">${media.caption}</div>
        `;
        
        mediaElement.addEventListener('click', () => openMediaModal(media));
        gallery.appendChild(mediaElement);
    });
}

// Function to properly size media content for mobile
function resizeMediaContent(element) {
    if (window.innerWidth <= 768) {
        const container = element.closest('.media-content');
        if (element.tagName === 'IMG' || element.tagName === 'VIDEO') {
            const aspectRatio = element.videoWidth ? element.videoWidth / element.videoHeight : element.naturalWidth / element.naturalHeight;
            const maxHeight = window.innerWidth <= 480 ? 200 : 250;
            
            if (aspectRatio > 1) {
                // Landscape
                container.style.height = 'auto';
                element.style.height = 'auto';
                element.style.width = '100%';
                element.style.maxHeight = `${maxHeight}px`;
            } else {
                // Portrait
                container.style.height = `${maxHeight}px`;
                element.style.height = '100%';
                element.style.width = 'auto';
                element.style.maxWidth = '100%';
            }
        }
    }
}

function openMediaModal(media) {
    const modal = document.getElementById('mediaModal');
    const modalContent = document.getElementById('modalContent');
    const modalCaption = document.getElementById('modalCaption');
    
    // Clear previous content
    modalContent.innerHTML = '';
    
    if (media.type === 'photo') {
        const img = document.createElement('img');
        img.src = media.src;
        img.alt = media.caption;
        modalContent.appendChild(img);
    } else if (media.type === 'video') {
        const video = document.createElement('video');
        video.src = media.src;
        video.controls = true;
        video.autoplay = true;
        modalContent.appendChild(video);
    }
    
    modalCaption.textContent = media.caption;
    modal.style.display = 'flex';
    playNotificationSound();
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            const video = this.querySelector('video');
            if (video) video.pause();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function closeModalOnEscape(e) {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
            const video = modal.querySelector('video');
            if (video) video.pause();
            document.removeEventListener('keydown', closeModalOnEscape);
        }
    });
}

// Close modal button
document.getElementById('closeModal').addEventListener('click', function() {
    const modal = document.getElementById('mediaModal');
    modal.style.display = 'none';
    const video = modal.querySelector('video');
    if (video) video.pause();
});

// ==============================================
// SECRET ACTIVATION - RESPONSE TRACKER ACCESS
// ==============================================
function setupSecretActivation() {
    const secretActivation = document.getElementById('secretActivation');
    const clickCounter = document.getElementById('clickCounter');
    
    secretActivation.addEventListener('click', (e) => {
        e.preventDefault();
        clickCount++;
        
        clickCounter.textContent = clickCount;
        clickCounter.style.display = 'flex';
        
        createMiniHeartEffect(e.clientX, e.clientY);
        playNotificationSound();
        
        if (clickCount === 1) {
            showNotification("💖 One click...");
        } else if (clickCount === 2) {
            showNotification("💖💖 Two clicks...");
        } else if (clickCount === 3) {
            unlockResponseTracker();
        } else if (clickCount > 3) {
            showNotification("Response tracker already unlocked! 💖");
        }
        
        if (clickCount < 3) {
            clearTimeout(window.clickResetTimer);
            window.clickResetTimer = setTimeout(() => {
                clickCount = 0;
                clickCounter.style.display = 'none';
            }, 3000);
        }
    });
}

function unlockResponseTracker() {
    responseUnlocked = true;
    localStorage.setItem('responseTrackerUnlocked', 'true');
    
    const unlockAnimation = document.getElementById('secretUnlockAnimation');
    unlockAnimation.style.display = 'flex';
    
    playNotificationSound();
    createUnlockCelebration();
    
    setTimeout(() => {
        unlockAnimation.style.display = 'none';
        showResponseTracker();
    }, 3000);
}

function showResponseTracker() {
    // Create the Response Tracker modal
    const responseTrackerHTML = `
        <div class="response-tracker-modal" id="responseTrackerModal">
            <div class="response-tracker-content">
                <button class="close-response-tracker" id="closeResponseTracker">
                    <i class="fas fa-times"></i>
                </button>
                <h2 class="section-title">Response Tracker 🔒</h2>
                
                <div class="response-icon">
                    <i class="fas fa-user-secret"></i>
                </div>
                
                <p style="font-size: 1.2rem; margin-bottom: 2rem; text-align: center; line-height: 1.6;">
                    <strong>Secret Access Only!</strong><br>
                    Only you (Lumumba) can see Elsy's response to your invitation.
                </p>
                
                <div class="response-status" id="responseTrackerStatus">
                    <p>Checking Elsy's response status...</p>
                </div>
                
                <!-- Elsy's Response Display in Tracker -->
                <div id="responseTrackerMessage" style="display: none;">
                    <div class="response-icon" id="responseTrackerIcon">💖</div>
                    <div class="response-message" id="responseTrackerText"></div>
                    <div id="responseTrackerTime" style="color: #666; font-size: 1rem;"></div>
                    
                    <!-- Elsy's Custom Message Display -->
                    <div class="response-details" id="responseTrackerDetails">
                        <h3 style="color: var(--primary-red); margin-bottom: 1.5rem; text-align: center;">
                            <i class="fas fa-comment-heart"></i>
                            Elsy's Personal Message
                        </h3>
                        <div class="response-detail-item">
                            <span class="response-detail-label">Response:</span>
                            <span class="response-detail-value" id="responseTrackerStatusDetail"></span>
                        </div>
                        <div class="response-detail-item">
                            <span class="response-detail-label">Her Message:</span>
                            <span class="response-detail-value" id="responseTrackerMessageDetail"></span>
                        </div>
                        <div class="response-detail-item">
                            <span class="response-detail-label">Date:</span>
                            <span class="response-detail-value" id="responseTrackerDateDetail"></span>
                        </div>
                        <div class="response-detail-item">
                            <span class="response-detail-label">Time:</span>
                            <span class="response-detail-value" id="responseTrackerTimeDetail"></span>
                        </div>
                    </div>
                </div>
                
                <button class="check-status-btn" onclick="checkResponseTrackerStatus()">
                    <i class="fas fa-sync-alt"></i>
                    Check Response Status
                </button>
                
                <div style="margin-top: 3rem; padding: 25px; background: linear-gradient(135deg, #fff5f5, #ffeaea); border-radius: 16px; border: 1px solid var(--light-red);">
                    <h3 style="color: var(--primary-red); margin-bottom: 1rem; text-align: center;">How it works:</h3>
                    <p style="font-size: 1rem; line-height: 1.6; color: #555;">
                        When Elsy responds to your invitation, her actual message and response are secretly recorded. 
                        Only you can access this page by clicking the ❤️ emoji three times in the top-left corner.
                    </p>
                </div>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.insertAdjacentHTML('beforeend', responseTrackerHTML);
    
    // Add CSS for the modal
    const style = document.createElement('style');
    style.textContent = `
        .response-tracker-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .response-tracker-content {
            background: var(--white);
            border-radius: 24px;
            padding: 50px 40px;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--light-red);
            max-width: 700px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        }
        
        .close-response-tracker {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: var(--primary-red);
            color: var(--white);
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
            z-index: 2001;
        }
        
        .close-response-tracker:hover {
            background: var(--dark-red);
            transform: rotate(90deg);
        }
    `;
    document.head.appendChild(style);
    
    // Show the tracker
    document.getElementById('responseTrackerModal').style.display = 'flex';
    
    // Add close functionality
    document.getElementById('closeResponseTracker').addEventListener('click', () => {
        document.getElementById('responseTrackerModal').remove();
        style.remove();
    });
    
    // Close when clicking outside
    document.getElementById('responseTrackerModal').addEventListener('click', (e) => {
        if (e.target.id === 'responseTrackerModal') {
            document.getElementById('responseTrackerModal').remove();
            style.remove();
        }
    });
    
    // Check response status
    setTimeout(() => checkResponseTrackerStatus(), 300);
}

function checkResponseTrackerStatus() {
    const savedResponse = localStorage.getItem('elsyValentineResponse');
    
    if (savedResponse) {
        elsyResponse = JSON.parse(savedResponse);
    }
    
    const responseStatus = document.getElementById('responseTrackerStatus');
    const responseMessage = document.getElementById('responseTrackerMessage');
    const responseIcon = document.getElementById('responseTrackerIcon');
    const responseText = document.getElementById('responseTrackerText');
    const responseTime = document.getElementById('responseTrackerTime');
    const responseDetails = document.getElementById('responseTrackerDetails');
    
    if (responseStatus && elsyResponse.timestamp) {
        responseStatus.style.display = 'none';
        if (responseMessage) responseMessage.style.display = 'block';
        if (responseDetails) responseDetails.style.display = 'block';
        
        const date = new Date(elsyResponse.timestamp);
        
        if (elsyResponse.accepted) {
            if (responseIcon) responseIcon.innerHTML = '💖🎉';
            if (responseText) {
                responseText.innerHTML = "YES! Elsy has accepted your Valentine's invitation!";
                responseText.style.color = '#2E7D32';
            }
            
            if (document.getElementById('responseTrackerStatusDetail')) {
                document.getElementById('responseTrackerStatusDetail').innerHTML = '<span style="color: #2E7D32; font-weight: 600;">Accepted 💖</span>';
                document.getElementById('responseTrackerMessageDetail').textContent = elsyResponse.customMessage || "She said YES!";
                document.getElementById('responseTrackerDateDetail').textContent = date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                document.getElementById('responseTrackerTimeDetail').textContent = date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });
            }
            
            createCelebrationEffect();
        } else {
            if (responseIcon) responseIcon.innerHTML = '😢';
            if (responseText) {
                responseText.innerHTML = "Elsy has declined your invitation";
                responseText.style.color = '#c62828';
            }
            
            if (document.getElementById('responseTrackerStatusDetail')) {
                document.getElementById('responseTrackerStatusDetail').innerHTML = '<span style="color: #c62828; font-weight: 600;">Declined 😢</span>';
                document.getElementById('responseTrackerMessageDetail').textContent = elsyResponse.customMessage || "She couldn't make it";
                document.getElementById('responseTrackerDateDetail').textContent = date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                document.getElementById('responseTrackerTimeDetail').textContent = date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });
            }
        }
        
        if (responseTime) {
            responseTime.innerHTML = `Response received: ${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        }
    } else if (responseStatus) {
        responseStatus.innerHTML = `
            <p>Elsy hasn't responded yet. Check back after she visits the invitation page!</p>
            <p style="margin-top: 10px; font-size: 1rem; color: #666;">
                <i class="fas fa-info-circle"></i> She can leave a personal message when she responds!
            </p>
        `;
        if (responseMessage) responseMessage.style.display = 'none';
        if (responseDetails) responseDetails.style.display = 'none';
    }
    
    // Animate the check button
    const checkBtn = document.querySelector('#responseTrackerModal .check-status-btn');
    if (checkBtn) {
        checkBtn.innerHTML = '<i class="fas fa-check"></i> Status Updated';
        checkBtn.style.background = 'linear-gradient(135deg, #2E7D32, #1B5E20)';
        
        setTimeout(() => {
            checkBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Check Response Status';
            checkBtn.style.background = 'linear-gradient(135deg, #1976D2, #0D47A1)';
        }, 2000);
    }
    
    playNotificationSound();
}

// ==============================================
// NAVIGATION
// ==============================================
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = button.getAttribute('data-page');
            changePage(pageId);
        });
    });
}

function changePage(pageId) {
    // Update active button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-page') === pageId) {
            btn.classList.add('active');
        }
    });
    
    // Show active page
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        if (page.id === pageId) {
            page.classList.add('active');
        }
    });
    
    // Special effects for certain pages
    if (pageId === 'messages') {
        generateLoveMessage();
    } else if (pageId === 'gallery') {
        setTimeout(() => {
            // Recalculate media sizes for mobile
            document.querySelectorAll('.media-content img, .media-content video').forEach(element => {
                resizeMediaContent(element);
            });
        }, 100);
    }
    
    playNotificationSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==============================================
// LOVE MESSAGES
// ==============================================
function generateLoveMessage() {
    const randomIndex = Math.floor(Math.random() * loveMessages.length);
    const message = loveMessages[randomIndex];
    document.getElementById('loveMessageText').textContent = message;
    createHeartEffect();
    playNotificationSound();
}

function sendLoveText() {
    const message = document.getElementById('loveMessageText').textContent;
    const textToCopy = `💌 For Lumumba: ${message} - Love, Elsy 💖`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                showNotification("Message copied! Send it to Lumumba! 💖");
                playNotificationSound();
            })
            .catch(err => {
                fallbackCopy(textToCopy);
            });
    } else {
        fallbackCopy(textToCopy);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification("Message copied! Send it to Lumumba! 💖");
        playNotificationSound();
    } catch (err) {
        showNotification("Select and copy the message to share with Lumumba!");
    }
    
    document.body.removeChild(textArea);
}

// ==============================================
// SECRET MESSAGE
// ==============================================
function checkPassword() {
    const password = document.getElementById('secretPassword').value;
    const secretMessage = document.getElementById('secretMessage');
    const secretMessageText = document.getElementById('secretMessageText');
    
    // LUMUMBA: CHANGE THIS TO YOUR ACTUAL FIRST DATE!
    // Replace "0214" with your actual first date in MMDD format
    if (password === "7011") { 
        secretMessage.style.display = 'block';
        secretMessageText.textContent = "Elsy, my love for you is eternal. No matter what happens, no matter where life takes us, my heart will always belong to you. This Valentine's Day is just the beginning of forever. I love you more than words could ever express. 💖 Forever yours, Lumumba";
        createHeartEffect();
        playNotificationSound();
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => createHeartEffect(), i * 100);
        }
    } else {
        showNotification("That's not your m-pesa pin, my love. Try again! 💖");
    }
}

// ==============================================
// VISUAL EFFECTS
// ==============================================
function createHeartEffect() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.fontSize = '2.2rem';
    heart.style.color = '#d32f2f';
    heart.style.zIndex = '10000';
    heart.style.left = `${Math.random() * 80 + 10}%`;
    heart.style.top = `${Math.random() * 80 + 10}%`;
    heart.style.pointerEvents = 'none';
    
    document.body.appendChild(heart);
    
    const animation = heart.animate([
        { transform: 'translateY(0) scale(1)', opacity: 1 },
        { transform: 'translateY(-120px) scale(1.6)', opacity: 0 }
    ], {
        duration: 1800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });
    
    animation.onfinish = () => {
        if (document.body.contains(heart)) {
            document.body.removeChild(heart);
        }
    };
}

function createMiniHeartEffect(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.fontSize = '1.6rem';
    heart.style.color = '#d32f2f';
    heart.style.zIndex = '10000';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.pointerEvents = 'none';
    
    document.body.appendChild(heart);
    
    const animation = heart.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -100px) scale(1.8)', opacity: 0 }
    ], {
        duration: 1200,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });
    
    animation.onfinish = () => {
        if (document.body.contains(heart)) {
            document.body.removeChild(heart);
        }
    };
}

function createUnlockCelebration() {
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.fontSize = '2.2rem';
            heart.style.color = '#d32f2f';
            heart.style.zIndex = '10000';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.pointerEvents = 'none';
            
            document.body.appendChild(heart);
            
            const anim = heart.animate([
                { transform: 'translateY(0) scale(1)', opacity: 1 },
                { transform: 'translateY(-200px) scale(2.2)', opacity: 0 }
            ], {
                duration: 2200,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            anim.onfinish = () => {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
            };
        }, i * 100);
    }
}

function createCelebrationEffect() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createHeartEffect();
        }, i * 100);
    }
}

function createFloatingHearts() {
    const floatingHeartsContainer = document.getElementById('floatingHearts');
    const heartCount = window.innerWidth < 768 ? 15 : 25;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 20 + 15}s`;
        heart.style.animationDelay = `${Math.random() * 10}s`;
        heart.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
        heart.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        floatingHeartsContainer.appendChild(heart);
    }
}

// ==============================================
// NOTIFICATION SYSTEM
// ==============================================
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500);
    }, 3000);
}

// ==============================================
// START EVERYTHING
// ==============================================
window.addEventListener('DOMContentLoaded', () => {
    createCinematicIntro();
});

// Handle window resize for responsive media
window.addEventListener('resize', () => {
    document.querySelectorAll('.media-content img, .media-content video').forEach(element => {
        resizeMediaContent(element);
    });
});





