// ==============================================
// ELSY & LUMUMBA'S VALENTINE WEBSITE
// ==============================================
// Lumumba: TO ADD YOUR PHOTOS & VIDEOS:
// 1. Find the "mediaGallery" array below (around line 50-150)
// 2. Replace the placeholder URLs with YOUR actual photo/video URLs
// 3. Update the captions with your special memories
// 4. Change the secret password to your actual first date
// ==============================================

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

// Current media type (photo or video)
let currentMediaType = "photo";

// Current RSVP choice
let currentRSVPChoice = null;

// ==============================================
// MEDIA GALLERY - REPLACE THESE WITH YOUR PHOTOS!
// ==============================================
let mediaGallery = [
    {
        id: 1,
        type: "photo",
        src: "media/first_image.jpeg",
        caption: "Our first date - I was so nervous but you made it perfect"
    },
    {
        id: 2,
        type: "photo",
        src: "media/ninth_image.jpeg",
        caption: "That day at the beach - the sunset matched your smile"
    },
    {
        id: 3,
        type: "photo",
        src: "media/first_image.jpeg",
        caption: "Our first anniversary dinner - you took my breath away"
    },
    {
        id: 4,
        type: "video",
        src: "https://assets.mixkit.co/videos/preview/mixkit-couple-having-fun-at-a-fair-7254-large.mp4",
        caption: "That fun day at the fair - you winning me that teddy bear",
        thumbnail: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop"
    },
    {
        id: 5,
        type: "photo",
        src: "https://images.unsplash.com/photo-1526417501783-5d6c2cbf6e73?w=800&h=600&fit=crop",
        caption: "Our weekend getaway - just you, me, and endless conversations"
    },
    {
        id: 6,
        type: "video",
        src: "https://assets.mixkit.co/videos/preview/mixkit-couple-walking-and-hugging-on-the-beach-7565-large.mp4",
        caption: "Walking hand in hand on the beach at sunset",
        thumbnail: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=600&fit=crop"
    },
    {
        id: 7,
        type: "photo",
        src: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&h=600&fit=crop",
        caption: "That surprise birthday party I threw for you"
    },
    {
        id: 8,
        type: "photo",
        src: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=600&fit=crop",
        caption: "Our first Christmas together - you made it magical"
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
// PREMIUM LOADING SCREEN
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
                startBackgroundMusic();
                createFloatingHearts();
                setTimeout(() => {
                    initializeEverything();
                }, 100);
            }, 800);
        }
    }, 150);
}

// ==============================================
// ROMANTIC BACKGROUND MUSIC
// ==============================================
let backgroundMusic = document.getElementById('media/background_music.mp3');
let notificationSound = document.getElementById('notificationSound');
let isMusicPlaying = false;

function startBackgroundMusic() {
    backgroundMusic.volume = 0.3;
    
    const playMusic = () => {
        if (!isMusicPlaying) {
            backgroundMusic.play()
                .then(() => {
                    isMusicPlaying = true;
                    document.getElementById('musicPlayer').classList.add('playing');
                    document.getElementById('musicPlayer').classList.remove('paused');
                    showNotification("Romantic music started 🎵");
                })
                .catch(e => {
                    console.log("Autoplay prevented");
                    showNotification("Click anywhere to start romantic music 🎵");
                });
        }
    };
    
    playMusic();
    
    const musicPlayer = document.getElementById('musicPlayer');
    musicPlayer.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicPlayer.classList.remove('playing');
            musicPlayer.classList.add('paused');
            showNotification("Music paused ⏸️");
        } else {
            backgroundMusic.play()
                .then(() => {
                    isMusicPlaying = true;
                    musicPlayer.classList.add('playing');
                    musicPlayer.classList.remove('paused');
                    showNotification("Music playing 🎵");
                });
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    document.addEventListener('click', () => {
        if (!isMusicPlaying) {
            backgroundMusic.play()
                .then(() => {
                    isMusicPlaying = true;
                    musicPlayer.classList.add('playing');
                    musicPlayer.classList.remove('paused');
                });
        }
    }, { once: true });
}

function playNotificationSound() {
    notificationSound.currentTime = 0;
    notificationSound.volume = 0.5;
    notificationSound.play().catch(e => console.log("Could not play notification sound"));
}

// ==============================================
// INITIALIZE EVERYTHING
// ==============================================
function initializeEverything() {
    generateLoveMessage();
    setupSecretActivation();
    checkIfUnlocked();
    setupNavigation();
    setupMediaUpload();
    initializeMediaGallery();
    
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
    
    // Load saved media from localStorage if available
    const savedMedia = localStorage.getItem('elsyLumumbaMedia');
    if (savedMedia) {
        mediaGallery = JSON.parse(savedMedia);
    }
    
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
                    <img src="${media.src}" alt="Memory photo" loading="lazy">
                </div>
            `;
        } else if (media.type === 'video') {
            const thumbnail = media.thumbnail || media.src;
            mediaContent = `
                <div class="media-content">
                    <video preload="metadata" poster="${thumbnail}">
                        <source src="${media.src}" type="video/mp4">
                    </video>
                </div>
            `;
        }
        
        mediaElement.innerHTML = `
            ${mediaContent}
            <div class="media-type">${media.type === 'photo' ? '📷 Photo' : '🎥 Video'}</div>
            <div class="media-caption">${media.caption}</div>
        `;
        
        mediaElement.addEventListener('click', () => openMediaModal(media));
        gallery.appendChild(mediaElement);
    });
    
    // Add "add media" button to gallery
    const addMediaElement = document.createElement('div');
    addMediaElement.className = 'media-frame';
    addMediaElement.style.display = 'flex';
    addMediaElement.style.flexDirection = 'column';
    addMediaElement.style.alignItems = 'center';
    addMediaElement.style.justifyContent = 'center';
    addMediaElement.style.cursor = 'pointer';
    addMediaElement.style.background = 'linear-gradient(135deg, #fff9f9, #ffeaea)';
    addMediaElement.innerHTML = `
        <div style="color: var(--primary-red); font-size: 4rem; margin-bottom: 1.5rem;">
            <i class="fas fa-plus-circle"></i>
        </div>
        <div style="color: var(--primary-red); font-size: 1.2rem; font-weight: 600; text-align: center;">
            Add Our Memory
        </div>
        <div style="color: #666; font-size: 0.9rem; margin-top: 0.5rem; text-align: center;">
            Click to upload a photo or video
        </div>
    `;
    addMediaElement.addEventListener('click', () => showUploadSection());
    gallery.appendChild(addMediaElement);
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
        img.onload = function() {
            const aspectRatio = this.naturalWidth / this.naturalHeight;
            if (aspectRatio > 1) {
                this.style.maxWidth = '90vw';
                this.style.maxHeight = '80vh';
            } else {
                this.style.maxWidth = '70vw';
                this.style.maxHeight = '90vh';
            }
        };
        modalContent.appendChild(img);
    } else if (media.type === 'video') {
        const video = document.createElement('video');
        video.src = media.src;
        video.controls = true;
        video.autoplay = true;
        video.style.maxWidth = '90vw';
        video.style.maxHeight = '80vh';
        modalContent.appendChild(video);
    }
    
    modalCaption.textContent = media.caption;
    modal.style.display = 'flex';
    playNotificationSound();
}

function showUploadSection() {
    const uploadSection = document.getElementById('uploadSection');
    uploadSection.classList.add('active');
    
    setMediaType('photo');
    uploadSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function setMediaType(type) {
    currentMediaType = type;
    
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === type) {
            btn.classList.add('active');
        }
    });
    
    const fileInput = document.getElementById('mediaUpload');
    if (type === 'photo') {
        fileInput.accept = "image/*";
        fileInput.setAttribute('accept', 'image/*');
    } else {
        fileInput.accept = "video/*";
        fileInput.setAttribute('accept', 'video/*');
    }
    
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('videoPreview').style.display = 'none';
    fileInput.value = '';
}

function cancelUpload() {
    const uploadSection = document.getElementById('uploadSection');
    uploadSection.classList.remove('active');
    
    document.getElementById('mediaCaption').value = '';
    document.getElementById('mediaUpload').value = '';
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('imagePreview').src = '';
    document.getElementById('videoPreview').style.display = 'none';
    document.getElementById('videoPreview').src = '';
}

function uploadMedia() {
    const caption = document.getElementById('mediaCaption').value.trim();
    const fileInput = document.getElementById('mediaUpload');
    
    if (!fileInput.files[0]) {
        showNotification("Please choose a file first! 📁");
        return;
    }
    
    if (!caption) {
        showNotification("Please add a caption for this memory! 💭");
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const mediaData = e.target.result;
        
        if (currentMediaType === 'photo') {
            addMediaToGallery(mediaData, caption, 'photo');
        } else {
            createVideoThumbnail(file, function(thumbnailData) {
                addMediaToGallery(mediaData, caption, 'video', thumbnailData);
            });
        }
    };
    
    if (currentMediaType === 'photo') {
        reader.readAsDataURL(file);
    } else {
        reader.readAsDataURL(file);
    }
}

function createVideoThumbnail(file, callback) {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = function() {
        video.currentTime = 0.1;
    };
    
    video.onseeked = function() {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const thumbnailData = canvas.toDataURL('image/jpeg');
        callback(thumbnailData);
    };
    
    video.src = URL.createObjectURL(file);
}

function addMediaToGallery(src, caption, type, thumbnail = null) {
    const newMedia = {
        id: Date.now(),
        type: type,
        src: src,
        caption: caption,
        thumbnail: thumbnail
    };
    
    mediaGallery.push(newMedia);
    
    try {
        localStorage.setItem('elsyLumumbaMedia', JSON.stringify(mediaGallery));
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            showNotification("Storage full! Oldest memories will be removed.");
            mediaGallery.shift();
            localStorage.setItem('elsyLumumbaMedia', JSON.stringify(mediaGallery));
        }
    }
    
    initializeMediaGallery();
    cancelUpload();
    
    const mediaTypeText = type === 'photo' ? 'Photo' : 'Video';
    showNotification(`${mediaTypeText} added to our gallery! ${type === 'photo' ? '📸' : '🎥'}💖`);
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createHeartEffect(), i * 100);
    }
    
    playNotificationSound();
}

function setupMediaUpload() {
    const fileInput = document.getElementById('mediaUpload');
    const imagePreview = document.getElementById('imagePreview');
    const videoPreview = document.getElementById('videoPreview');
    
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            const reader = new FileReader();
            
            if (currentMediaType === 'photo') {
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                    videoPreview.style.display = 'none';
                };
                reader.readAsDataURL(file);
            } else {
                const videoURL = URL.createObjectURL(file);
                videoPreview.src = videoURL;
                videoPreview.style.display = 'block';
                imagePreview.style.display = 'none';
                
                reader.readAsDataURL(file);
            }
        }
    });
    
    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('mediaModal').style.display = 'none';
        const video = document.querySelector('#mediaModal video');
        if (video) {
            video.pause();
        }
    });
    
    document.getElementById('addMediaBtn').addEventListener('click', function() {
        changePage('gallery');
        setTimeout(() => showUploadSection(), 500);
    });
    
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            setMediaType(this.dataset.type);
        });
    });
    
    document.getElementById('mediaModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            const video = document.querySelector('#mediaModal video');
            if (video) {
                video.pause();
            }
        }
    });
    
    document.getElementById('toggleInstructionsBtn').addEventListener('click', function() {
        const instructionsPanel = document.getElementById('instructionsPanel');
        instructionsPanel.classList.toggle('active');
        
        if (instructionsPanel.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-times-circle"></i> Close Instructions';
        } else {
            this.innerHTML = '<i class="fas fa-info-circle"></i> How to Add Your Photos & Videos';
        }
        
        playNotificationSound();
    });
}

// ==============================================
// RESPONSE TRACKER FUNCTIONS
// ==============================================
function checkResponseStatus() {
    const savedResponse = localStorage.getItem('elsyValentineResponse');
    
    if (savedResponse) {
        elsyResponse = JSON.parse(savedResponse);
    }
    
    const responseStatus = document.getElementById('responseStatus');
    const responseMessage = document.getElementById('responseMessage');
    const responseIcon = document.getElementById('responseIcon');
    const responseText = document.getElementById('responseText');
    const responseTime = document.getElementById('responseTime');
    const responseDetails = document.getElementById('responseDetails');
    
    if (elsyResponse.timestamp) {
        responseStatus.style.display = 'none';
        responseMessage.style.display = 'block';
        responseDetails.style.display = 'block';
        
        const date = new Date(elsyResponse.timestamp);
        
        if (elsyResponse.accepted) {
            responseIcon.innerHTML = '💖🎉';
            responseText.innerHTML = "YES! Elsy has accepted your Valentine's invitation!";
            responseText.style.color = '#2E7D32';
            
            document.getElementById('responseStatusDetail').innerHTML = '<span style="color: #2E7D32; font-weight: 600;">Accepted 💖</span>';
            document.getElementById('responseMessageDetail').textContent = elsyResponse.customMessage || "She said YES!";
            document.getElementById('responseDateDetail').textContent = date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            document.getElementById('responseTimeDetail').textContent = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            
            createCelebrationEffect();
        } else {
            responseIcon.innerHTML = '😢';
            responseText.innerHTML = "Elsy has declined your invitation";
            responseText.style.color = '#c62828';
            
            document.getElementById('responseStatusDetail').innerHTML = '<span style="color: #c62828; font-weight: 600;">Declined 😢</span>';
            document.getElementById('responseMessageDetail').textContent = elsyResponse.customMessage || "She couldn't make it";
            document.getElementById('responseDateDetail').textContent = date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            document.getElementById('responseTimeDetail').textContent = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }
        
        responseTime.innerHTML = `Response received: ${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    } else {
        responseStatus.innerHTML = `
            <p>Elsy hasn't responded yet. Check back after she visits the invitation page!</p>
            <p style="margin-top: 10px; font-size: 1rem; color: #666;">
                <i class="fas fa-info-circle"></i> She can leave a personal message when she responds!
            </p>
        `;
        responseMessage.style.display = 'none';
        responseDetails.style.display = 'none';
    }
    
    // Animate the check button
    const checkBtn = document.querySelector('.check-status-btn');
    checkBtn.innerHTML = '<i class="fas fa-check"></i> Status Updated';
    checkBtn.style.background = 'linear-gradient(135deg, #2E7D32, #1B5E20)';
    
    setTimeout(() => {
        checkBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Check Response Status';
        checkBtn.style.background = 'linear-gradient(135deg, #1976D2, #0D47A1)';
    }, 2000);
    
    playNotificationSound();
}

// ==============================================
// SECRET ACTIVATION
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
    document.getElementById('responseNavBtn').style.display = 'inline-flex';
    
    playNotificationSound();
    createUnlockCelebration();
    
    setTimeout(() => {
        unlockAnimation.style.display = 'none';
        showNotification("Response Tracker unlocked! Check the navigation! 🔓");
    }, 3000);
}

function checkIfUnlocked() {
    const isUnlocked = localStorage.getItem('responseTrackerUnlocked');
    if (isUnlocked === 'true') {
        responseUnlocked = true;
        document.getElementById('responseNavBtn').style.display = 'inline-flex';
    }
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
    
    if (responseUnlocked) {
        checkResponseStatus();
    }
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
    } else if (pageId === 'response' && responseUnlocked) {
        setTimeout(() => checkResponseStatus(), 300);
    } else if (pageId === 'gallery') {
        setTimeout(() => initializeMediaGallery(), 300);
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
    if (password === "0214" || password === "1234") { // CHANGE "0214" TO YOUR DATE!
        secretMessage.style.display = 'block';
        secretMessageText.textContent = "Elsy, my love for you is eternal. No matter what happens, no matter where life takes us, my heart will always belong to you. This Valentine's Day is just the beginning of forever. I love you more than words could ever express. 💖 Forever yours, Lumumba";
        createHeartEffect();
        playNotificationSound();
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => createHeartEffect(), i * 100);
        }
    } else {
        showNotification("That's not our special date, my love. Try again! 💖");
    }
}

// ==============================================
// MEMORY FUNCTION
// ==============================================
function addMemory() {
    const memory = prompt("Elsy, what's a special memory you'd like to add to our story?");
    if (memory && memory.trim() !== "") {
        showNotification("Thank you for sharing that beautiful memory! 💖");
        playNotificationSound();
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


