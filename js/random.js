document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const teamBalanceSelect = document.getElementById('team-balance');
    const includeTeamSelect = document.getElementById('include-team');
    const generateTeamBtn = document.getElementById('generate-team');
    const randomPlayersList = document.getElementById('random-players-list');
    const randomTotalPoints = document.getElementById('random-total-points');
    const randomBattingStrength = document.getElementById('random-batting-strength');
    const randomBowlingStrength = document.getElementById('random-bowling-strength');
    const saveRandomTeamBtn = document.getElementById('save-random-team');
    const editRandomTeamBtn = document.getElementById('edit-random-team');
    
    // Current random team
    let randomTeam = [];
    
    // Add event listeners
    generateTeamBtn.addEventListener('click', generateRandomTeam);
    saveRandomTeamBtn.addEventListener('click', function() {
        if (randomTeam.length === 11) {
            saveTeam(randomTeam);
            alert('Random team saved successfully!');
        } else {
            alert('Please generate a valid team first.');
        }
    });
    
    editRandomTeamBtn.addEventListener('click', function() {
        if (randomTeam.length === 11) {
            saveTeam(randomTeam);
            window.location.href = 'select-players.html';
        } else {
            alert('Please generate a valid team first.');
        }
    });
    
    // Function to generate a random team
    function generateRandomTeam() {
        const teamBalance = teamBalanceSelect.value;
        const includeTeam = includeTeamSelect.value;
        
        // Filter players based on team selection
        let availablePlayers = [...players];
        if (includeTeam !== 'all') {
            availablePlayers = availablePlayers.filter(player => player.team === includeTeam);
        }
        
        // Check if we have enough players
        if (availablePlayers.length < 11) {
            alert('Not enough players available with current filters. Please select "All Teams".');
            return;
        }
        
        // Initialize empty team
        randomTeam = [];
        
        // Define role counts based on team balance selection
        let roleCounts = {
            'Batsman': { min: 0, max: 0, current: 0 },
            'Bowler': { min: 0, max: 0, current: 0 },
            'All-Rounder': { min: 0, max: 0, current: 0 },
            'Wicketkeeper': { min: 0, max: 0, current: 0 }
        };
        
        // Set role counts based on team balance
        switch(teamBalance) {
            case 'balanced':
                roleCounts.Batsman = { min: 3, max: 5, current: 0 };
                roleCounts.Bowler = { min: 3, max: 5, current: 0 };
                roleCounts.AllRounder = { min: 2, max: 3, current: 0 };
                roleCounts.Wicketkeeper = { min: 1, max: 1, current: 0 };
                break;
            case 'batting-heavy':
                roleCounts.Batsman = { min: 5, max: 6, current: 0 };
                roleCounts.Bowler = { min: 2, max: 3, current: 0 };
                roleCounts.AllRounder = { min: 1, max: 3, current: 0 };
                roleCounts.Wicketkeeper = { min: 1, max: 1, current: 0 };
                break;
            case 'bowling-heavy':
                roleCounts.Batsman = { min: 2, max: 3, current: 0 };
                roleCounts.Bowler = { min: 5, max: 6, current: 0 };
                roleCounts.AllRounder = { min: 1, max: 3, current: 0 };
                roleCounts.Wicketkeeper = { min: 1, max: 1, current: 0 };
                break;
        }
        
        // First, ensure we have the minimum players for each role
        Object.keys(roleCounts).forEach(role => {
            // Convert role format to match player data (handle "All-Rounder" vs "AllRounder")
            let playerRole = role;
            if (role === 'AllRounder') playerRole = 'All-Rounder';
            
            // Filter available players by role
            const rolePlayers = availablePlayers.filter(p => p.role === playerRole);
            
            // Shuffle players
            const shuffledPlayers = shuffleArray([...rolePlayers]);
            
            // Add minimum required number of players for this role
            for (let i = 0; i < roleCounts[role].min && shuffledPlayers.length > 0; i++) {
                const selectedPlayer = shuffledPlayers.pop();
                
                // Add to team and remove from available players
                randomTeam.push(selectedPlayer);
                availablePlayers = availablePlayers.filter(p => p.name !== selectedPlayer.name);
                
                // Update current count
                roleCounts[role].current++;
            }
        });
        
        // Then fill the rest of the team, respecting max role limits
        while (randomTeam.length < 11 && availablePlayers.length > 0) {
            // Get available roles (those that haven't reached their max)
            const availableRoles = [];
            
            Object.keys(roleCounts).forEach(role => {
                // Convert role format to match player data
                let playerRole = role;
                if (role === 'AllRounder') playerRole = 'All-Rounder';
                
                // Add role if it's under max and there are players available
                if (roleCounts[role].current < roleCounts[role].max) {
                    const rolePlayers = availablePlayers.filter(p => p.role === playerRole);
                    if (rolePlayers.length > 0) {
                        availableRoles.push(role);
                    }
                }
            });
            
            // If no roles available, just pick any player
            if (availableRoles.length === 0) {
                // Shuffle available players and pick top one
                const shuffledPlayers = shuffleArray([...availablePlayers]);
                const selectedPlayer = shuffledPlayers[0];
                
                // Add to team and remove from available players
                randomTeam.push(selectedPlayer);
                availablePlayers = availablePlayers.filter(p => p.name !== selectedPlayer.name);
            } else {
                // Randomly select a role
                const randomRole = availableRoles[Math.floor(Math.random() * availableRoles.length)];
                
                // Convert role format to match player data
                let playerRole = randomRole;
                if (randomRole === 'AllRounder') playerRole = 'All-Rounder';
                
                // Filter and shuffle players of that role
                const rolePlayers = availablePlayers.filter(p => p.role === playerRole);
                const shuffledPlayers = shuffleArray([...rolePlayers]);
                
                // Select top player
                const selectedPlayer = shuffledPlayers[0];
                
                // Add to team and remove from available players
                randomTeam.push(selectedPlayer);
                availablePlayers = availablePlayers.filter(p => p.name !== selectedPlayer.name);
                
                // Update current count
                roleCounts[randomRole].current++;
            }
        }
        
        // Display the random team
        displayRandomTeam();
    }
    
    // Function to display the random team
    function displayRandomTeam() {
        if (randomTeam.length === 0) {
            randomPlayersList.innerHTML = `
                <p class="no-team">Generate a random team first</p>
            `;
            randomTotalPoints.textContent = '0';
            randomBattingStrength.textContent = '0';
            randomBowlingStrength.textContent = '0';
            return;
        }
        
        // Sort team by role (Batsmen, All-Rounders, Wicket-keepers, Bowlers)
        const sortedTeam = [...randomTeam].sort((a, b) => {
            const roleOrder = { 'Batsman': 1, 'All-Rounder': 2, 'Wicketkeeper': 3, 'Bowler': 4 };
            return roleOrder[a.role] - roleOrder[b.role];
        });
        
        // Clear player list
        randomPlayersList.innerHTML = '';
        
        // Calculate team stats
        let totalPoints = 0;
        let battingStrength = 0;
        let bowlingStrength = 0;
        
        // Display players
        sortedTeam.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'random-player-card';
            
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
                </div>
            `;
            
            randomPlayersList.appendChild(playerCard);
            
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
        randomTotalPoints.textContent = totalPoints.toFixed(0);
        randomBattingStrength.textContent = battingStrength.toFixed(1);
        randomBowlingStrength.textContent = bowlingStrength.toFixed(1);
    }
    
    // Utility function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});