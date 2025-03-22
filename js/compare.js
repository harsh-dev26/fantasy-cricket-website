document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const player1Select = document.getElementById('player1-select');
    const player2Select = document.getElementById('player2-select');
    const comparisonResults = document.getElementById('comparison-results');
    
    // Populate player dropdowns
    populatePlayerDropdowns();
    
    // Add event listeners
    player1Select.addEventListener('change', compareSelectedPlayers);
    player2Select.addEventListener('change', compareSelectedPlayers);
    
    // Function to populate player dropdowns
    function populatePlayerDropdowns() {
        players.forEach(player => {
            const option1 = document.createElement('option');
            option1.value = player.name;
            option1.textContent = `${player.name} (${player.team})`;
            player1Select.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = player.name;
            option2.textContent = `${player.name} (${player.team})`;
            player2Select.appendChild(option2);
        });
    }
    
    // Function to compare selected players
    function compareSelectedPlayers() {
        const player1Name = player1Select.value;
        const player2Name = player2Select.value;
        
        if (!player1Name || !player2Name) {
            comparisonResults.innerHTML = `
                <div class="no-players-selected">
                    <p>Select two players to compare their stats</p>
                </div>
            `;
            return;
        }
        
        const player1 = players.find(p => p.name === player1Name);
        const player2 = players.find(p => p.name === player2Name);
        
        if (!player1 || !player2) {
            comparisonResults.innerHTML = `<p>Invalid player selection.</p>`;
            return;
        }
        
        // Create stats to compare
        const statsToCompare = [
            { name: 'Role', value1: player1.role, value2: player2.role, type: 'string' },
            { name: 'Fantasy Points', value1: player1.fantasyPoints, value2: player2.fantasyPoints, type: 'number' },
            { name: 'Total Matches', value1: player1.totalMatches, value2: player2.totalMatches, type: 'number' },
            { name: 'Runs', value1: player1.runs, value2: player2.runs, type: 'number' },
            { name: 'Wickets', value1: player1.wickets, value2: player2.wickets, type: 'number' },
            { name: 'Average', value1: player1.average, value2: player2.average, type: 'number' },
            { name: 'Strike Rate', value1: player1.strikeRate, value2: player2.strikeRate, type: 'number' },
            { name: 'Economy', value1: player1.economy, value2: player2.economy, type: 'string' }
        ];
        
        // Generate HTML for comparison
        let comparisonHTML = `
            <h3>${player1.name} vs ${player2.name}</h3>
            <div class="stat-comparison-header">
                <div class="stat-column">${player1.name} (${player1.team})</div>
                <div class="stat-name">Stat</div>
                <div class="stat-column">${player2.name} (${player2.team})</div>
            </div>
        `;
        
        statsToCompare.forEach(stat => {
            let player1Class = '';
            let player2Class = '';
            
            if (stat.type === 'number' && stat.value1 !== 'N/A' && stat.value2 !== 'N/A') {
                const value1 = parseFloat(stat.value1);
                const value2 = parseFloat(stat.value2);
                
                if (!isNaN(value1) && !isNaN(value2)) {
                    if (value1 > value2 && stat.name !== 'Economy') {
                        player1Class = 'better';
                    } else if (value2 > value1 && stat.name !== 'Economy') {
                        player2Class = 'better';
                    } else if (stat.name === 'Economy' && value1 < value2) {
                        player1Class = 'better';
                    } else if (stat.name === 'Economy' && value2 < value1) {
                        player2Class = 'better';
                    }
                }
            }
            
            comparisonHTML += `
                <div class="stat-comparison">
                    <div class="player1-stat ${player1Class}">${stat.value1}</div>
                    <div class="stat-name">${stat.name}</div>
                    <div class="player2-stat ${player2Class}">${stat.value2}</div>
                </div>
            `;
        });
        
        comparisonResults.innerHTML = comparisonHTML;
    }
});