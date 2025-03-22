// Create teams object once players.js is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Make sure global players array is available
    if (typeof players !== 'undefined') {
        window.teams = {
            KKR: players.filter(player => player.team === "KKR"),
            RCB: players.filter(player => player.team === "RCB")
        };
    } else {
        console.error("Players data not available");
    }
});

// Function to save selected team to localStorage
function saveTeam(teamArray) {
    localStorage.setItem('savedTeam', JSON.stringify(teamArray));
    alert('Team saved successfully!');
}

// Function to load saved team from localStorage
function loadSavedTeam() {
    const savedTeam = localStorage.getItem('savedTeam');
    return savedTeam ? JSON.parse(savedTeam) : null;
}