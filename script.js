// DOM Elements
const authModal = document.getElementById('auth-modal');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const closeBtn = document.querySelector('.close');
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const userProfile = document.getElementById('user-profile');
const usernameDisplay = document.getElementById('username-display');
const logoutBtn = document.getElementById('logout-btn');
const loginError = document.getElementById('login-error');
const signupError = document.getElementById('signup-error');

// Filter Elements
const priceFilter = document.getElementById('price-filter');
const durationFilter = document.getElementById('duration-filter');
const difficultyFilter = document.getElementById('difficulty-filter');
const searchInput = document.getElementById('search-input');

// Course Display Elements
const coursesGrid = document.getElementById('courses-grid');
const loadingIndicator = document.getElementById('loading');
const noResults = document.getElementById('no-results');

// Mock courses data (in real app, this would come from an API)
const courses = [
    {
        id: 1,
        title: "Complete Python Bootcamp: From Zero to Hero",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHl0aG9uJTIwcHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60",
        price: 19.99,
        duration: 35, // hours
        difficulty: "beginner",
        instructor: "John Smith",
        rating: 4.7,
        ratingCount: 152000,
        url: "https://www.udemy.com/course/complete-python-bootcamp/",
        description: "Learn Python like a professional. Start from basics and go all the way to creating your own applications and games.",
        tags: ["programming", "python", "data science", "web development", "automation"]
    },
    {
        id: 2,
        title: "The Web Developer Bootcamp",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60",
        price: 24.99,
        duration: 63,
        difficulty: "beginner",
        instructor: "Colt Steele",
        rating: 4.8,
        ratingCount: 205000,
        url: "https://www.udemy.com/course/the-web-developer-bootcamp/",
        description: "The only course you need to learn web development - HTML, CSS, JS, Node, and More!",
        tags: ["programming", "web development", "html", "css", "javascript"]
    },
    {
        id: 3,
        title: "Machine Learning A-Z: Hands-On Python & R",
        image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFjaGluZSUyMGxlYXJuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60",
        price: 29.99,
        duration: 44,
        difficulty: "intermediate",
        instructor: "Kirill Eremenko",
        rating: 4.5,
        ratingCount: 135000,
        url: "https://www.udemy.com/course/machinelearning/",
        description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.",
        tags: ["data science", "machine learning", "python", "r programming", "artificial intelligence"]
    },
    {
        id: 4,
        title: "React - The Complete Guide",
        image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3QlMjBqc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60",
        price: 19.99,
        duration: 48,
        difficulty: "intermediate",
        instructor: "Maximilian Schwarzmüller",
        rating: 4.6,
        ratingCount: 128000,
        url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
        description: "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and more!",
        tags: ["programming", "web development", "javascript", "react", "frontend"]
    },
    {
        id: 5,
        title: "Advanced CSS and Sass",
        image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3NzfGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60",
        price: 16.99,
        duration: 28,
        difficulty: "intermediate",
        instructor: "Jonas Schmedtmann",
        rating: 4.8,
        ratingCount: 42000,
        url: "https://www.udemy.com/course/advanced-css-and-sass/",
        description: "The most advanced and modern CSS course on the internet: master flexbox, CSS Grid, responsive design, and more.",
        tags: ["web development", "css", "sass", "responsive design", "animations"]
    },
    {
        id: 6,
        title: "JavaScript: Understanding the Weird Parts",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amF2YXNjcmlwdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60",
        price: 14.99,
        duration: 12,
        difficulty: "advanced",
        instructor: "Anthony Alicea",
        rating: 4.9,
        ratingCount: 65000,
        url: "https://www.udemy.com/course/understand-javascript/",
        description: "An advanced JavaScript course for everyone! Scope, closures, prototypes, 'this', build your own framework, and more.",
        tags: ["programming", "javascript", "web development", "es6", "frontend"]
    },
    {
        id: 7,
        title: "AWS Certified Solutions Architect - Associate",
        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXdzfGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60",
        price: 29.99,
        duration: 25,
        difficulty: "advanced",
        instructor: "Ryan Kroonenburg",
        rating: 4.7,
        ratingCount: 75000,
        url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate/",
        description: "Prepare for the AWS Solutions Architect Associate certification. Learn about cloud architecture and AWS services.",
        tags: ["cloud computing", "aws", "certification", "solutions architecture", "devops"]
    },
    {
        id: 8,
        title: "The Complete Digital Marketing Course",
        image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60",
        price: 24.99,
        duration: 52,
        difficulty: "beginner",
        instructor: "Rob Percival",
        rating: 4.5,
        ratingCount: 55000,
        url: "https://www.udemy.com/course/the-complete-digital-marketing-course/",
        description: "Master Digital Marketing Strategy, Social Media Marketing, SEO, YouTube, Email, Facebook Marketing, Analytics & More!",
        tags: ["marketing", "social media", "seo", "facebook ads", "google analytics"]
    },
    {
        id: 9,
        title: "iOS 14 & Swift 5 - The Complete iOS App Development",
        image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW9zJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60",
        price: 34.99,
        duration: 55,
        difficulty: "intermediate",
        instructor: "Angela Yu",
        rating: 4.8,
        ratingCount: 34000,
        url: "https://www.udemy.com/course/ios-13-app-development-bootcamp/",
        description: "From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI!",
        tags: ["mobile development", "ios", "swift", "app development", "xcode"]
    },
    {
        id: 10,
        title: "Angular - The Complete Guide",
        image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5ndWxhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60",
        price: 19.99,
        duration: 36,
        difficulty: "intermediate",
        instructor: "Maximilian Schwarzmüller",
        rating: 4.6,
        ratingCount: 98000,
        url: "https://www.udemy.com/course/the-complete-guide-to-angular-2/",
        description: "Master Angular formerly Angular 2 and build awesome, reactive web apps with the successor of Angular.js",
        tags: ["programming", "web development", "javascript", "angular", "frontend"]
    },
    {
        id: 11,
        title: "Modern JavaScript From The Beginning",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amF2YXNjcmlwdCUyMGNvZGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60",
        price: 0,
        duration: 22,
        difficulty: "beginner",
        instructor: "Brad Traversy",
        rating: 4.7,
        ratingCount: 42000,
        url: "https://www.udemy.com/course/modern-javascript-from-the-beginning/",
        description: "Learn and build projects with pure JavaScript (No frameworks or libraries)",
        tags: ["programming", "javascript", "web development", "es6", "dom manipulation"]
    },
    {
        id: 12,
        title: "Advanced SQL Database Administration",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0YWJhc2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60",
        price: 129.99,
        duration: 18,
        difficulty: "advanced",
        instructor: "David Kim",
        rating: 4.5,
        ratingCount: 12000,
        url: "https://www.udemy.com/course/advanced-sql-database-administration/",
        description: "Master database administration, performance tuning, backup strategies, and security for PostgreSQL, MySQL, SQL Server, and Oracle.",
        tags: ["database", "sql", "postgresql", "mysql", "oracle"]
    },
    {
        id: 13,
        title: "Financial Modeling for Business Analysts",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmluYW5jaWFsJTIwbW9kZWxpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60",
        price: 89.99,
        duration: 30,
        difficulty: "intermediate",
        instructor: "Sarah Johnson",
        rating: 4.7,
        ratingCount: 25000,
        url: "https://www.udemy.com/course/financial-modeling-for-business/",
        description: "Learn to build financial models for valuation, investment banking, and corporate finance applications.",
        tags: ["finance", "excel", "modeling", "business", "banking", "investment"]
    },
    {
        id: 14,
        title: "Blockchain Development Fundamentals",
        image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxvY2tjaGFpbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60",
        price: 49.99,
        duration: 22,
        difficulty: "advanced",
        instructor: "Michael Chen",
        rating: 4.6,
        ratingCount: 18000,
        url: "https://www.udemy.com/course/blockchain-development-fundamentals/",
        description: "Master blockchain technology and build decentralized applications using Ethereum, Solidity, and Web3.js.",
        tags: ["blockchain", "cryptocurrency", "ethereum", "smart contracts", "web3"]
    },
    {
        id: 15,
        title: "Banking Operations and Risk Management",
        image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFua2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60",
        price: 75.99,
        duration: 40,
        difficulty: "intermediate",
        instructor: "Robert Williams",
        rating: 4.4,
        ratingCount: 9500,
        url: "https://www.udemy.com/course/banking-operations-and-risk-management/",
        description: "Comprehensive course on banking operations, credit analysis, risk management, and regulatory compliance for modern banks.",
        tags: ["banking", "finance", "risk management", "operations", "compliance"]
    }
];

// User Authentication
let currentUser = null;

// Initialize users array from localStorage or create it if it doesn't exist
function initializeUsers() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem('users'));
}

// Get users from localStorage
const users = initializeUsers();

// Check if user is already logged in
function checkLoggedInUser() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showLoggedInState();
    }
}

// Show logged in state
function showLoggedInState() {
    loginBtn.classList.add('hidden');
    signupBtn.classList.add('hidden');
    userProfile.classList.remove('hidden');
    usernameDisplay.textContent = currentUser.username;
}

// Show logged out state
function showLoggedOutState() {
    loginBtn.classList.remove('hidden');
    signupBtn.classList.remove('hidden');
    userProfile.classList.add('hidden');
    usernameDisplay.textContent = '';
}

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

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.classList.add('hidden');
    }
});

// Tab Switching
loginTab.addEventListener('click', showLoginTab);
signupTab.addEventListener('click', showSignupTab);

function showLoginTab() {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
}

function showSignupTab() {
    loginTab.classList.remove('active');
    signupTab.classList.add('active');
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
}

// Form Submissions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Get fresh user data from localStorage
    const currentUsers = JSON.parse(localStorage.getItem('users'));
    const user = currentUsers.find(user => user.email === email && user.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        authModal.classList.add('hidden');
        showLoggedInState();
        loginError.textContent = '';
        // Reset form
        loginForm.reset();
    } else {
        loginError.textContent = 'Invalid email or password';
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    // Get fresh user data from localStorage
    const currentUsers = JSON.parse(localStorage.getItem('users'));
    
    // Check if email already exists
    if (currentUsers.some(user => user.email === email)) {
        signupError.textContent = 'Email already in use';
        return;
    }
    
    const newUser = { username, email, password };
    currentUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(currentUsers));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    authModal.classList.add('hidden');
    showLoggedInState();
    signupError.textContent = '';
    // Reset form
    signupForm.reset();
});

// Logout Handler
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    currentUser = null;
    showLoggedOutState();
});

// Improved Filter and Display Courses
function filterCourses() {
    const priceValue = priceFilter.value;
    const durationValue = durationFilter.value;
    const difficultyValue = difficultyFilter.value;
    const searchValue = searchInput.value.toLowerCase().trim();
    
    return courses.filter(course => {
        // Price filter
        if (priceValue === 'free' && course.price > 0) return false;
        if (priceValue === 'paid' && course.price === 0) return false;
        if (priceValue === '0-25' && (course.price > 25 || course.price === 0)) return false;
        if (priceValue === '25-50' && (course.price < 25 || course.price > 50)) return false;
        if (priceValue === '50+' && course.price < 50) return false;
        
        // Duration filter
        if (durationValue === 'short' && course.duration > 3) return false;
        if (durationValue === 'medium' && (course.duration < 3 || course.duration > 6)) return false;
        if (durationValue === 'long' && course.duration < 6) return false;
        
        // Difficulty filter
        if (difficultyValue !== 'all' && course.difficulty !== difficultyValue) return false;
        
        // Enhanced Search filter - check title, description, tags, and instructor
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

function displayCourses() {
    // Show loading indicator
    loadingIndicator.classList.remove('hidden');
    coursesGrid.innerHTML = '';
    noResults.classList.add('hidden');
    
    // Simulate API loading delay
    setTimeout(() => {
        const filteredCourses = filterCourses();
        
        if (filteredCourses.length === 0) {
            noResults.classList.remove('hidden');
        } else {
            filteredCourses.forEach(course => {
                coursesGrid.appendChild(createCourseCard(course));
            });
        }
        
        loadingIndicator.classList.add('hidden');
    }, 500);
}

function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    
    // Fixed: Check if the course has a valid URL
    const courseUrl = course.url && course.url !== "#" 
        ? course.url 
        : `https://www.udemy.com/course/${course.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/`;
    
    // Set the click handler with the fixed URL
    card.onclick = () => window.open(courseUrl, '_blank');
    
    const formatDuration = (hours) => {
        if (hours < 1) return `${Math.round(hours * 60)} mins`;
        return hours === 1 ? '1 hour' : `${hours} hours`;
    };
    
    const formatPrice = (price) => {
        return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
    };
    
    // Create a fallback mechanism in case image loading fails
    card.innerHTML = `
        <div class="course-image-container">
            <img src="${course.image}" alt="${course.title}" class="course-image" onerror="this.onerror=null; this.src='/api/placeholder/300/160?text=${encodeURIComponent(course.title)}'; this.classList.add('image-fallback')">
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
    
    return card;
}

// Event Listeners for Filters
priceFilter.addEventListener('change', displayCourses);
durationFilter.addEventListener('change', displayCourses);
difficultyFilter.addEventListener('change', displayCourses);
searchInput.addEventListener('input', displayCourses);

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    checkLoggedInUser();
    displayCourses();
});