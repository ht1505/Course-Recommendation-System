import json
import os
import re

# --- Configuration ---
FILE_PATH = os.path.join("data", "courses.json")
# We will use a stable image source format that accepts descriptive keywords.
BASE_UNSPLASH_URL = "https://source.unsplash.com/300x160/?"
# ---------------------

def get_keywords_from_title(title):
    """Extracts relevant keywords from a course title for image tagging."""
    # Define a set of general high-value keywords related to the course subjects
    keywords = {
        "python": "python,programming", "django": "django,web development", "forex": "forex,trading",
        "stock": "stock market,investing", "finance": "financial analysis,business", 
        "excel": "excel,data,spreadsheet", "accounting": "accounting,tax", 
        "options": "options trading,stocks", "trading": "trading,market", 
        "design": "graphic design,logo", "photoshop": "photoshop,photo editing", 
        "illustrator": "illustrator,vector", "guitar": "guitar,music",
        "piano": "piano,music,keyboard", "harmonica": "harmonica,music",
        "web": "web development,html,css", "java": "java,programming",
        "angular": "angular,javascript", "react": "reactjs,javascript"
    }
    
    title_lower = title.lower()
    
    # 1. Check for specific programming/subject keywords first
    for key, tags in keywords.items():
        if key in title_lower:
            return tags
            
    # 2. If no specific match, use general words from the title
    general_words = re.findall(r'\b\w+\b', title_lower)
    
    # Filter out common, less descriptive words
    stop_words = {"a", "the", "for", "with", "in", "to", "and", "from", "course", "complete", "guide", "master", "ultimate", "basics"}
    
    # Get the top 3 most descriptive words
    relevant_words = [word for word in general_words if word not in stop_words and len(word) > 3][:3]
    
    if relevant_words:
        return ",".join(relevant_words)
        
    return "learning" # Default if nothing useful is found

def bulk_replace_images():
    """Reads courses.json and replaces every image URL with a keyword-based URL."""
    print("Starting image URL replacement for thematic relevance...")
    
    if not os.path.exists(FILE_PATH):
        print(f"ERROR: File not found at {FILE_PATH}. Ensure courses.json is in a 'data' subfolder.")
        return

    try:
        with open(FILE_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"ERROR: Invalid JSON structure in {FILE_PATH}. Cannot process. Error: {e}")
        return
    
    update_count = 0
    for course in data:
        # Get keywords based on the course title
        keywords = get_keywords_from_title(course.get('title', ''))
        
        # Construct a new image URL using the keywords and course ID (for variety/seed)
        new_url = f"{BASE_UNSPLASH_URL}{keywords}&sig={course.get('id')}"
        
        if course.get('image') != new_url:
             course['image'] = new_url
             update_count += 1
    
    # Save the modified data back to the file
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4) 
    
    print(f"\nSUCCESS: Updated {update_count} image URLs in {FILE_PATH}.")
    print("The images will now display a stable, thematically relevant placeholder for each course.")

if __name__ == "__main__":
    bulk_replace_images()