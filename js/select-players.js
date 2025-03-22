document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const playerTypeFilter = document.getElementById('player-type');
    const teamFilter = document.getElementById('team');
    const searchInput = document.getElementById('search');
    const playersList = document.getElementById('players-list');
    const selectedPlayers = document.getElementById('selected-players');
    const selectedCountSpan = document.getElementById('selected-count');
    const batsmenCountSpan = document.getElementById('batsmen-count');
    const bowlersCountSpan = document.getElementById('bowlers-count');
    const allRoundersCountSpan = document.getElementById('all-rounders-count');
    const wicketKeepersCountSpan = document.getElementById('wicket-keepers-count');
    const totalPointsSpan = document.getElementById('total-points');
    const battingStrengthSpan = document.getElementById('batting-strength');
    const bowlingStrengthSpan = document.getElementById('bowling-strength');
    const saveTeamBtn = document.getElementById('save-team');
    const resetTeamBtn = document.getElementById('reset-team');
    
    // Initialize team array
    let myTeam = [];
    
    // Check for saved team
    const savedTeam = loadSavedTeam();
    if (savedTeam) {
        myTeam = savedTeam;
        updateSelectedPlayersUI();
    }
    
    // Initialize UI
    displayAvailablePlayers();
    
    // Add event listeners
    playerTypeFilter.addEventListener('change', displayAvailablePlayers);
    teamFilter.addEventListener('change', displayAvailablePlayers);
    searchInput.addEventListener('input', displayAvailablePlayers);
    saveTeamBtn.addEventListener('click', function() {
        if (myTeam.length < 11) {
            alert('Your team must have 11 players.');
            return;
        }
        saveTeam(myTeam);
    });
    resetTeamBtn.addEventListener('click', function() {
        myTeam = [];
        updateSelectedPlayersUI();
        displayAvailablePlayers();
    });
    
    // Function to display available players based on filters
    function displayAvailablePlayers() {
        const playerType = playerTypeFilter.value;
        const team = teamFilter.value;
        const searchTerm = searchInput.value.toLowerCase();
        
        let filteredPlayers = [...players];
        
        // Apply playerType filter
        if (playerType !== 'all') {
            filteredPlayers = filteredPlayers.filter(player => player.role === playerType);
        }
        
        // Apply team filter
        if (team !== 'all') {
            filteredPlayers = filteredPlayers.filter(player => player.team === team);
        }
        
        // Apply search filter
        if (searchTerm.trim() !== '') {
            filteredPlayers = filteredPlayers.filter(player => 
                player.name.toLowerCase().includes(searchTerm)
            );
        }
        
        // Clear current list
        playersList.innerHTML = '';
        
        // Display filtered players
        filteredPlayers.forEach(player => {
            // Check if player is already selected
            const isSelected = myTeam.some(p => p.name === player.name);
            
            const playerCard = document.createElement('div');
            playerCard.className = `player-card ${isSelected ? 'selected' : ''}`;
            playerCard.dataset.playerName = player.name;
            
            let roleClass = '';
            switch(player.role) {
                case 'Batsman': roleClass = 'batsman'; break;
                case 'Bowler': roleClass = 'bowler'; break;
                case 'All-Rounder': roleClass = 'all-rounder'; break;
                case 'Wicketkeeper': roleClass = 'wicket-keeper'; break;
            }
            
            playerCard.innerHTML = `
                <div class="player-card-header">
                    <span class="player-name">${player.name}</span>
                    <span class="player-type ${roleClass}">${player.role}</span>
                </div>
                <div class="player-details">
                    <span class="player-team">Team: ${player.team}</span>
                    <span class="player-points">Points: ${player.fantasyPoints}</span>
                    <span>Matches: ${player.totalMatches}</span>
                    <span>Runs: ${player.runs}</span>
                    <span>Wickets: ${player.wickets}</span>
                    <span>SR: ${player.strikeRate}</span>
                </div>
            `;
            
            // Add click handler
            playerCard.addEventListener('click', function() {
                togglePlayerSelection(player);
            });
            
            playersList.appendChild(playerCard);
        });
    }
    
    // Function to toggle player selection
    function togglePlayerSelection(player) {
        const playerIndex = myTeam.findIndex(p => p.name === player.name);
        
        if (playerIndex === -1) {
            // Check if team is already full
            if (myTeam.length >= 11) {
                alert('You can only select up to 11 players.');
                return;
            }
            
            // Check role constraints
            const roleCount = {
                'Batsman': myTeam.filter(p => p.role === 'Batsman').length,
                'Bowler': myTeam.filter(p => p.role === 'Bowler').length,
                'All-Rounder': myTeam.filter(p => p.role === 'All-Rounder').length,
                'Wicketkeeper': myTeam.filter(p => p.role === 'Wicketkeeper').length
            };
            
            // Apply role constraints
            if (player.role === 'Batsman' && roleCount['Batsman'] >= 6) {
                alert('You can only select up to 6 batsmen.');
                return;
            } else if (player.role === 'Bowler' && roleCount['Bowler'] >= 5) {
                alert('You can only select up to 5 bowlers.');
                return;
            } else if (player.role === 'All-Rounder' && roleCount['All-Rounder'] >= 4) {
                alert('You can only select up to 4 all-rounders.');
                return;
            } else if (player.role === 'Wicketkeeper' && roleCount['Wicketkeeper'] >= 2) {
                alert('You can only select up to 2 wicket-keepers.');
                return;
            }
            
            // Add player to team
            myTeam.push(player);
        } else {
            // Remove player from team
            myTeam.splice(playerIndex, 1);
        }
        
        // Update UI
        updateSelectedPlayersUI();
        displayAvailablePlayers(); // Refresh available players to update selection status
    }
    
    // Function to update the selected players UI
    function updateSelectedPlayersUI() {
        // Clear current list
        selectedPlayers.innerHTML = '';
        
        // Update counts
        selectedCountSpan.textContent = myTeam.length;
        batsmenCountSpan.textContent = myTeam.filter(p => p.role === 'Batsman').length;
        bowlersCountSpan.textContent = myTeam.filter(p => p.role === 'Bowler').length;
        allRoundersCountSpan.textContent = myTeam.filter(p => p.role === 'All-Rounder').length;
        wicketKeepersCountSpan.textContent = myTeam.filter(p => p.role === 'Wicketkeeper').length;
        
        // Calculate team stats
        let totalPoints = 0;
        let battingStrength = 0;
        let bowlingStrength = 0;
        
        myTeam.forEach(player => {
            // Add to total points
            totalPoints += player.fantasyPoints;
            
            // Calculate strength based on role
            if (player.role === 'Batsman' || player.role === 'Wicketkeeper') {
                battingStrength += parseInt(player.runs) / parseInt(player.totalMatches);
            } else if (player.role === 'Bowler') {
                bowlingStrength += parseInt(player.wickets) / parseInt(player.totalMatches);
            } else if (player.role === 'All-Rounder') {
                battingStrength += parseInt(player.runs) / parseInt(player.totalMatches) * 0.7;
                bowlingStrength += parseInt(player.wickets) / parseInt(player.totalMatches) * 0.7;
            }
        });
        
        // Update stats display
        totalPointsSpan.textContent = totalPoints.toFixed(0);
        battingStrengthSpan.textContent = battingStrength.toFixed(1);
        bowlingStrengthSpan.textContent = bowlingStrength.toFixed(1);
        
        // Display selected players
        myTeam.forEach(player => {
            const playerItem = document.createElement('div');
            playerItem.className = 'selected-player-item';
            playerItem.innerHTML = `
                <div>
                    <strong>${player.name}</strong> (${player.team}, ${player.role})
                </div>
                <span class="player-remove" data-player="${player.name}">✕</span>
            `;
            
            // Add remove handler
            playerItem.querySelector('.player-remove').addEventListener('click', function() {
                const playerToRemove = this.dataset.player;
                const playerIndex = myTeam.findIndex(p => p.name === playerToRemove);
                if (playerIndex !== -1) {
                    myTeam.splice(playerIndex, 1);
                    updateSelectedPlayersUI();
                    displayAvailablePlayers(); // Refresh available players
                }
            });
            
            selectedPlayers.appendChild(playerItem);
        });
    }
});