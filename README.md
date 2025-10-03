CourseFindr: Content-Based Course Recommendation System
CourseFindr is a static web application designed to help users find relevant online learning courses. It demonstrates a client-side Content-Based Filtering algorithm to deliver personalized course recommendations based on user interaction (favoriting).

The project was refactored from a monolithic file structure into a modular, maintainable JavaScript architecture, and its data was scaled up using a real-world dataset.

🚀 Key Features and Enhancements
Content-Based Recommendation Engine: The core feature dynamically analyzes a logged-in user's favorited courses (tags, difficulty, subject) and generates personalized recommendations based on those traits.

Massive Dataset Handling: Utilizes an expanded dataset of 3,678 courses derived from real Udemy data, replacing the previous manual input.

Modular Architecture: Refactored from a single file into decoupled JavaScript logic (script.js now combines Authentication, Filtering, and Display functions) to improve maintainability and performance.

Robust Filtering & Search: Advanced client-side filtering functions for Price, Duration (with corrected logic for precise ranges), and Difficulty, plus a unified keyword search across course titles, instructors, and tags.

Simulated Asynchronous Data Flow: Courses are loaded from the local data/courses.json file using the native fetch() API, simulating an asynchronous call to a backend REST service.

Secure Mock Authentication: Implements client-side user management using localStorage for sessions and favorites, explicitly avoiding the storage of passwords for security compliance.

📁 Project Structure
The project maintains a simple, static structure optimized for deployment:

Course-Recommendation-System/
├── data/
│   └── courses.json     # The large, structured course dataset (3,678 records)
├── index.html           # Main application entry point (HTML5 structure)
├── styles.css           # Custom CSS for styling and responsiveness
└── script.js            # Combined JavaScript logic (Auth, Filters, Display)


🛠️ Installation and Local Setup
Since this project uses advanced JavaScript features (type="module" in the original architecture, and relies on correct paths), it must be run via a local web server:

Clone the Repository: Download the project files.

Organize Files: Ensure the single script.js file is in the root directory and the courses.json file is inside the data/ subfolder.

Start a Local Server:

VS Code: Use the "Live Server" extension (right-click index.html > "Open with Live Server").

Python: Navigate to the root directory in your terminal and run: python -m http.server 8000

Access: Open your browser to the local host address (e.g., http://127.0.0.1:5500).

💻 How to Use the Recommendation Feature
Sign Up / Log In: Click "Sign Up" in the header and create a mock account (credentials are stored only in your browser's local storage).

Favorite Courses: Browse the main list and click the heart icon on 3-5 courses across different topics (e.g., one Python course, one Finance course).

View Recommendations: The "Recommended for You" section at the top will instantly populate with courses sharing tags, subjects, or difficulty levels of your favorited items.

☁️ Deployment
This project is configured as a purely static application and can be deployed instantly using Vercel or any similar static hosting service. No build process is required, making deployment straightforward.

Live Application Link
Once deployed, replace the placeholder below with your Vercel URL:

Live Demo on Vercel https://course-recommendation-system-xi.vercel.app/
