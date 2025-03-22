document.addEventListener('DOMContentLoaded', function() {
    // This is the main application script for the home page
    
    // Check if we have any saved team
    const hasSavedTeam = localStorage.getItem('savedTeam');
    
    // Get CTA buttons
    const createTeamBtn = document.querySelector('.btn-primary');
    const randomTeamBtn = document.querySelector('.btn-secondary');
    
    // Update button text if we have a saved team
    if (hasSavedTeam) {
        createTeamBtn.textContent = 'Edit Saved Team';
    }
    
    // Add additional event listeners if needed
    
    // Initialize any home page specific functionality
    function initializeHomePage() {
        console.log('Fantasy Cricket Team Builder initialized');
        
        // You could add animations, feature highlights, etc. here
    }
    
    initializeHomePage();
});