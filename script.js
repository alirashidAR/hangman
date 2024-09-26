// Fetch data from the API
fetch('https://solaris-backend-ckvh.vercel.app/hangman-scores')
  .then(response => response.json())
  .then(data => {
    // Update the top 3 leaderboard
    const top3 = data.top3;
    if (top3 && top3.length === 3) {
      document.getElementById('first-team').textContent = top3[0].name;
      document.getElementById('first-score').textContent = `Score: ${top3[0].score}`;
      
      document.getElementById('second-team').textContent = top3[1].name;
      document.getElementById('second-score').textContent = `Score: ${top3[1].score}`;
      
      document.getElementById('third-team').textContent = top3[2].name;
      document.getElementById('third-score').textContent = `Score: ${top3[2].score}`;
    }

    // Check if leaderboard exists before iterating
    const leaderboard = data.leaderboard;
    if (leaderboard && Array.isArray(leaderboard)) {
      const scoreBoard = document.getElementById('scoreBoard');
      scoreBoard.innerHTML = `
        <div class="scoreboard-header">
          <span>Place</span>
          <span>Team Name</span>
          <span>Score</span>
        </div>
      `; // Clear old content and add header

      leaderboard.forEach(team => {
        const teamDiv = document.createElement('div');
        teamDiv.classList.add('team');
        teamDiv.innerHTML = `
          <span>${team.place}</span>
          <span class="team-name">${team.name}</span>
          <span class="team-score">${team.score}</span>
        `;
        scoreBoard.appendChild(teamDiv);
      });
    } else {
      console.error('Leaderboard data is not available');
      document.getElementById('errorMessage').textContent = 'Leaderboard data is not available.';
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    document.getElementById('errorMessage').textContent = 'Error fetching leaderboard data.';
  });
