const API_KEY = 'zwf37xjO8A16GcC67eM7yBecWGw0KkeXWipVta7LqJPhwH5opJA';
const BASE_URL = 'https://api.pandascore.co';

async function fetchMatches() {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer zwf37xjO8A16GcC67eM7yBecWGw0KkeXWipVta7LqJPhwH5opJA'
        }
    };

    try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.pandascore.co/matches?per_page=5', options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayMatches(data);
    } catch (error) {
        console.error('Error fetching matches:', error);
    }
}

function displayMatches(matches) {
    const matchesDiv = document.getElementById('matches');
    matchesDiv.innerHTML = matches.map(match => `
        <div class="match">
            <h2>${match.name}</h2>
            <p>Status: ${match.status}</p>
            <div class="teams">
                ${match.opponents.map(opponent => `
                    <div class="team">
                        <img src="${opponent.opponent.image_url}" alt="${opponent.opponent.name}" class="team-logo">
                        <p>${opponent.opponent.name}</p>
                    </div>
                `).join('')}
            </div>
            <div class="winner">
                <h3>Winner: ${match.winner.name}</h3>
                <img src="${match.winner.image_url}" alt="${match.winner.name}" class="winner-logo">
            </div>
        </div>
    `).join('');
}

async function fetchLeaderboard() {
    const apiKey = 'RGAPI-5880c38b-9c2c-4d1c-9790-fa856c66624a';
    const url = `https://americas.api.riotgames.com/lor/ranked/v1/leaderboards?api_key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const players = data.players;
        const rowsPerPage = 20;
        let currentPage = 1;

        function displayTable(page) {
            const tbody = document.querySelector('#leaderboard tbody');
            tbody.innerHTML = '';
            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const paginatedPlayers = players.slice(start, end);

            paginatedPlayers.forEach(player => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${player.rank}</td>
                    <td>${player.name}</td>
                    <td>${player.lp}</td>
                `;
                tbody.appendChild(row);
            });
        }

        function setupPagination() {
            const pagination = document.getElementById('pagination');
            pagination.innerHTML = '';
            const pageCount = Math.ceil(players.length / rowsPerPage);
            const maxVisiblePages = 5; // Número máximo de páginas visibles

            // Botón de página anterior
            const prevLi = document.createElement('li');
            prevLi.classList.add('page-item');
            if (currentPage === 1) prevLi.classList.add('disabled');
            const prevA = document.createElement('a');
            prevA.classList.add('page-link');
            prevA.href = '#';
            prevA.textContent = '«';
            prevA.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    displayTable(currentPage);
                    setupPagination();
                }
            });
            prevLi.appendChild(prevA);
            pagination.appendChild(prevLi);

            // Rango de páginas visibles
            const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            const endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);

            for (let i = startPage; i <= endPage; i++) {
                const li = document.createElement('li');
                li.classList.add('page-item');
                if (i === currentPage) li.classList.add('active');
                const a = document.createElement('a');
                a.classList.add('page-link');
                a.href = '#';
                a.textContent = i;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentPage = i;
                    displayTable(currentPage);
                    setupPagination();
                });
                li.appendChild(a);
                pagination.appendChild(li);
            }

            // Botón de página siguiente
            const nextLi = document.createElement('li');
            nextLi.classList.add('page-item');
            if (currentPage === pageCount) nextLi.classList.add('disabled');
            const nextA = document.createElement('a');
            nextA.classList.add('page-link');
            nextA.href = '#';
            nextA.textContent = '»';
            nextA.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentPage < pageCount) {
                    currentPage++;
                    displayTable(currentPage);
                    setupPagination();
                }
            });
            nextLi.appendChild(nextA);
            pagination.appendChild(nextLi);
        }

        displayTable(currentPage);
        setupPagination();
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
    }
}

// Cargar los partidos cuando la página se cargue
document.addEventListener('DOMContentLoaded', fetchMatches); 

// Llamar a la función para obtener los datos
fetchLeaderboard(); 