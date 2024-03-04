// Function to fetch story data from JSON file
let currentStoryIndex = 0;
let allStories = [];

async function fetchStoryData() {
    const response = await fetch('../data/ApproachesSteps.json');
    if (!response.ok) {
        throw new Error('Network response was not ok.');
    }
    allStories = await response.json(); // Correctly parse the JSON response
    displayStory(currentStoryIndex); // Display the first story
}

function displayStory(index)   {
    const story = allStories[index];
    if (story) {
        document.getElementById('storyContent').innerHTML = 
        `
        <h6 class = "card-title">${"Step: "+ story.StepId}</h6>
        <h6 class = "card-title">${story.StepName}</h6>
        <h6 class = "card-text">${story.StepDescription}</h6>`;
    }   
}

function nextStep(){
    if (currentStoryIndex < allStories.length - 1) {
        currentStoryIndex++;
        displayStory(currentStoryIndex);
    }
}
    
function previousStep(){
    if (currentStoryIndex > 0) {    
        currentStoryIndex--;
        displayStory(currentStoryIndex);
    }
}

// Function to initialize story problems
async function initializeStoryProblems() {
    await fetchStoryData();
}
    
document.addEventListener('DOMContentLoaded', initializeStoryProblems);
