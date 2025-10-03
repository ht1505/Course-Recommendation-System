// ====================================================================
// SCRIPT.JS: COMBINED APPLICATION LOGIC
// Combines auth.js, recommendations.js, and app.js into one file 
// to resolve ES6 module and file loading errors.
// ====================================================================

// --- Global State ---
let currentUser = null;
let allCourses = [];

// --- DOM Elements (Must be selected after DOMContentLoaded) ---
let authModal;
let loginBtn;
let signupBtn;
let closeBtn;
let loginTab;
let signupTab;
let loginForm;
let signupForm;
let userProfile;
let usernameDisplay;
let logoutBtn;
let loginError;
let signupError;

let priceFilter;
let durationFilter;
let difficultyFilter;
let searchInput;

let coursesGrid;
let loadingIndicator;
let noResults;
let recommendationsGrid;
let noRecommendations;
let recommendationsSection;

function initializeDOMElements() {
    authModal = document.getElementById('auth-modal');
    loginBtn = document.getElementById('login-btn');
    signupBtn = document.getElementById('signup-btn');
    closeBtn = document.querySelector('.close');
    loginTab = document.getElementById('login-tab');
    signupTab = document.getElementById('signup-tab');
    loginForm = document.getElementById('login-form');
    signupForm = document.getElementById('signup-form');
    userProfile = document.getElementById('user-profile');
    usernameDisplay = document.getElementById('username-display');
    logoutBtn = document.getElementById('logout-btn');
    loginError = document.getElementById('login-error');
    signupError = document.getElementById('signup-error');

    priceFilter = document.getElementById('price-filter');
    durationFilter = document.getElementById('duration-filter');
    difficultyFilter = document.getElementById('difficulty-filter');
    searchInput = document.getElementById('search-input');

    coursesGrid = document.getElementById('courses-grid');
    loadingIndicator = document.getElementById('loading');
    noResults = document.getElementById('no-results');
    recommendationsGrid = document.getElementById('recommendations-grid');
    noRecommendations = document.getElementById('no-recommendations');
    recommendationsSection = document.getElementById('recommendations-section');
}

// ====================================================================
// AUTHENTICATION FUNCTIONS
// ====================================================================

function initializeUsers() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem('users'));
}

function saveCurrentUser(user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function checkLoggedInUser() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        return true;
    }
    return false;
}

function showLoggedInState() {
    loginBtn.classList.add('hidden');
    signupBtn.classList.add('hidden');
    userProfile.classList.remove('hidden');
    usernameDisplay.textContent = currentUser.username;
}

function showLoggedOutState() {
    loginBtn.classList.remove('hidden');
    signupBtn.classList.remove('hidden');
    userProfile.classList.add('hidden');
}

function showLoginTab() {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    loginError.textContent = '';
    signupError.textContent = '';
}

function showSignupTab() {
    loginTab.classList.remove('active');
    signupTab.classList.add('active');
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
    loginError.textContent = '';
    signupError.textContent = '';
}

function updateCurrentUserFavorites(courseId) {
    if (!currentUser) return;

    let currentUsers = initializeUsers();
    
    const userIndex = currentUsers.findIndex(u => u.email === currentUser.email);
    if (userIndex === -1) return;

    const favorites = new Set(currentUsers[userIndex].favorites || []);

    if (favorites.has(courseId)) {
        favorites.delete(courseId);
    } else {
        favorites.add(courseId);
    }

    currentUsers[userIndex].favorites = Array.from(favorites);
    localStorage.setItem('users', JSON.stringify(currentUsers));
    
    saveCurrentUser(currentUsers[userIndex]);
}

function setupAuthListeners() {
    // Auth Modal Handlers
    loginBtn.addEventListener('click', () => {
        authModal.classList.remove('hidden');
        showLoginTab();
    });

    signupBtn.addEventListener('click', () => {
        authModal.classList.remove('hidden');
        showSignupTab();
    });

    closeBtn.addEventListener('click', () => {
        authModal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.add('hidden');
        }
    });

    // Tab Switching
    loginTab.addEventListener('click', showLoginTab);
    signupTab.addEventListener('click', showSignupTab);

    // Form Submissions
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        const currentUsers = initializeUsers();
        const user = currentUsers.find(user => user.email === email);
        
        if (user) {
            saveCurrentUser(user);
            authModal.classList.add('hidden');
            showLoggedInState();
            loginError.textContent = '';
            loginForm.reset();
            window.dispatchEvent(new CustomEvent('authChange'));
        } else {
            loginError.textContent = 'Invalid email or password';
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value; 
        
        const currentUsers = initializeUsers();
        
        if (currentUsers.some(user => user.email === email)) {
            signupError.textContent = 'Email already in use';
            return;
        }
        
        // Passwords are NOT stored for security reasons in this front-end demo.
        const newUser = { username, email, favorites: [] };
        currentUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(currentUsers));
        
        saveCurrentUser(newUser);
        
        authModal.classList.add('hidden');
        showLoggedInState();
        signupError.textContent = '';
        signupForm.reset();
        window.dispatchEvent(new CustomEvent('authChange'));
    });

    // Logout Handler
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        currentUser = null;
        showLoggedOutState();
        window.dispatchEvent(new CustomEvent('authChange'));
    });
}


// ====================================================================
// RECOMMENDATION & DISPLAY FUNCTIONS
// ====================================================================

function filterCourses(courses) {
    const priceValue = priceFilter.value;
    const durationValue = durationFilter.value;
    const difficultyValue = difficultyFilter.value;
    const searchValue = searchInput.value.toLowerCase().trim();
    
    return courses.filter(course => {
        // Price filter
        if (priceValue === 'free' && course.price > 0) return false;
        if (priceValue === 'paid' && course.price === 0) return false;
        if (priceValue === '0-25' && (course.price <= 0 || course.price > 25)) return false;
        if (priceValue === '25-50' && (course.price <= 25 || course.price > 50)) return false;
        if (priceValue === '50+' && course.price < 50) return false;
        
        // Duration filter
        if (durationValue === 'short' && course.duration > 3) return false;
        if (durationValue === 'medium' && (course.duration <= 3 || course.duration > 6)) return false;
        if (durationValue === 'long' && course.duration <= 6) return false; 
        
        // Difficulty filter
        if (difficultyValue !== 'all' && course.difficulty !== difficultyValue) return false;
        
        // Enhanced Search filter
        if (searchValue) {
            const titleMatch = course.title.toLowerCase().includes(searchValue);
            const descriptionMatch = course.description && course.description.toLowerCase().includes(searchValue);
            const instructorMatch = course.instructor.toLowerCase().includes(searchValue);
            const tagsMatch = course.tags && course.tags.some(tag => tag.toLowerCase().includes(searchValue));
            
            return titleMatch || descriptionMatch || instructorMatch || tagsMatch;
        }
        
        return true;
    });
}

function getRecommendations(courses) {
    if (!currentUser || !currentUser.favorites || currentUser.favorites.length === 0) {
        return [];
    }

    const favoriteCourses = courses.filter(c => currentUser.favorites.includes(c.id));
    const favoriteTags = new Set(favoriteCourses.flatMap(c => c.tags));
    const favoriteDifficulties = new Set(favoriteCourses.map(c => c.difficulty));

    const scoredCourses = courses
        .filter(c => !currentUser.favorites.includes(c.id)) 
        .map(course => {
            let score = 0;
            const courseTags = new Set(course.tags);

            courseTags.forEach(tag => {
                if (favoriteTags.has(tag)) {
                    score += 2; 
                }
            });

            if (favoriteDifficulties.has(course.difficulty)) {
                score += 1;
            }

            return { ...course, score };
        });

    return scoredCourses
        .filter(c => c.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6); 
}

function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    
    const courseUrl = course.url && course.url !== "#" 
        ? course.url 
        : `https://www.udemy.com/course/${course.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/`;
    
    const handleFavoriteClick = (e) => {
        e.stopPropagation(); 
        if (!currentUser) {
             alert("Please log in to favorite a course.");
             return;
        }
        updateCurrentUserFavorites(course.id);
        window.dispatchEvent(new CustomEvent('authChange')); 
    };

    const isFavorited = currentUser && currentUser.favorites && currentUser.favorites.includes(course.id);
    const favoriteIconClass = isFavorited ? 'fas' : 'far';
    
    const formatDuration = (hours) => {
        if (hours < 1) return `${Math.round(hours * 60)} mins`;
        return hours === 1 ? '1 hour' : `${Math.floor(hours)} hours`;
    };
    
    const formatPrice = (price) => {
        return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
    };
    
    const localFallbackSvg = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20160%22%20fill%3D%22%234a6fdc%22%3E%3Crect%20width%3D%22300%22%20height%3D%22160%22%20fill%3D%22%234a6fdc%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-size%3D%2230%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%20fill%3D%22white%22%3ECOURSE%3C%2Ftext%3E%3C%2Fsvg%3E';

card.innerHTML = `
    <div class="course-image-container">
        <img src="${course.image}" alt="${course.title}" class="course-image" 
            onerror="this.onerror=null; this.src='${localFallbackSvg}'; this.classList.add('image-fallback')">
        <button class="favorite-btn" title="Favorite this course">
            <i class="${favoriteIconClass} fa-heart"></i>
        </button>
    </div>
        <div class="course-info">
            <h3 class="course-title">${course.title}</h3>
            <span class="course-difficulty difficulty-${course.difficulty}">${course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}</span>
            <div class="course-meta">
                <div class="meta-item">
                    <i class="fas fa-user"></i>
                    <span>${course.instructor}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${formatDuration(course.duration)}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-star"></i>
                    <span>${course.rating} (${(course.ratingCount / 1000).toFixed(1)}k)</span>
                </div>
            </div>
            <div class="course-price">${formatPrice(course.price)}</div>
        </div>
    `;
    
    const favoriteButton = card.querySelector('.favorite-btn');
    favoriteButton.addEventListener('click', handleFavoriteClick);
    
    card.onclick = () => window.open(courseUrl, '_blank');
    
    return card;
}

function renderCourses(courseList, gridElement, noDataElement) {
    gridElement.innerHTML = '';
    
    const isRecommendationSection = gridElement.id === 'recommendations-grid';

    if (courseList.length === 0) {
        if (isRecommendationSection && !currentUser) {
            recommendationsSection.classList.remove('hidden');
            noDataElement.classList.remove('hidden');
        } else if (isRecommendationSection) {
             recommendationsSection.classList.add('hidden');
        } else {
             noDataElement.classList.remove('hidden');
        }
        return;
    } 
    
    if (isRecommendationSection) {
        recommendationsSection.classList.remove('hidden');
    }

    noDataElement.classList.add('hidden');
    courseList.forEach(course => {
        gridElement.appendChild(createCourseCard(course));
    });
}

function displayRecommendations() {
    const recommendedCourses = getRecommendations(allCourses);
    renderCourses(recommendedCourses, recommendationsGrid, noRecommendations);
}


function displayFilteredCourses() {
    if (allCourses.length === 0) return;

    loadingIndicator.classList.remove('hidden');
    coursesGrid.innerHTML = '';
    noResults.classList.add('hidden');
    
    setTimeout(() => {
        const filtered = filterCourses(allCourses);
        renderCourses(filtered, coursesGrid, noResults);
        loadingIndicator.classList.add('hidden');
    }, 300);
}

function setupFilterListeners() {
    priceFilter.addEventListener('change', displayFilteredCourses);
    durationFilter.addEventListener('change', displayFilteredCourses);
    difficultyFilter.addEventListener('change', displayFilteredCourses);
    searchInput.addEventListener('input', displayFilteredCourses);
}


// ====================================================================
// APP ENTRY POINT (COMBINED APP.JS)
// ====================================================================

async function fetchCourses() {
    // The path is relative to index.html
    const dataPath = './data/courses.json'; 
    
    // Check if the data folder/file exists before making the request
    if (coursesGrid) {
        loadingIndicator.classList.remove('hidden');
    }

    try {
        const response = await fetch(dataPath);
        if (!response.ok) {
            // This error handler is critical: If the file is not found,
            // the error message should point to a file path issue.
            throw new Error(`Failed to load data. Status: ${response.status}. Check if 'data/courses.json' exists at the correct path.`);
        }
        return await response.json();
    } catch (error) {
        console.error("CRITICAL ERROR: Failed to load course data.", error);
        // Display a critical failure message to the user
        if (coursesGrid) {
            coursesGrid.innerHTML = `<p class="error-message">Error loading courses. Please ensure 'data/courses.json' is correctly placed and valid.</p>`;
        }
        return []; 
    } finally {
        if (coursesGrid) {
            loadingIndicator.classList.add('hidden');
        }
    }
}

async function initializeApp() {
    // 0. Initialize all DOM element variables
    initializeDOMElements();

    // 1. Load Data
    const courses = await fetchCourses();
    allCourses = courses;

    // 2. Setup Listeners
    setupAuthListeners();
    setupFilterListeners();

    // 3. Check Auth Status
    if (checkLoggedInUser()) {
        showLoggedInState();
    }
    
    // 4. Initial Display
    displayRecommendations();
    displayFilteredCourses();

    // 5. Handle Auth Changes (Login/Logout/Favorite updates)
    window.addEventListener('authChange', () => {
        if (checkLoggedInUser()) {
            showLoggedInState();
        } else {
            showLoggedOutState();
        }
        displayRecommendations();
        displayFilteredCourses();
    });
}

// Start the application after DOM content is loaded
window.addEventListener('DOMContentLoaded', initializeApp);