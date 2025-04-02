const scriptUrl = 'https://script.google.com/macros/s/AKfycbzqpNM_gdaYAhQoXGWfqDmxEfA0piUJJXb6b44F2gmXBGfTPsAymXp_ypQycm2HAA/exec';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy URL
const fullUrl = proxyUrl + scriptUrl;

// Function to save data to Google Sheets
function saveData() {
    const date = document.getElementById('date').value;
    const symptom = document.getElementById('symptom').value;
    const score = document.getElementById('score').value;
    
    if (!date || !score) {
        alert("Please select a date and enter a score.");
        return;
    }

    fetch(fullUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Origin': 'https://caylamiller.github.io', // Your GitHub Pages URL
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ date, symptom, score }),
        mode: 'no-cors'
    })
    .then(() => {
        console.log("Data sent successfully!");
    })
    .catch(error => console.error('Error saving data:', error));
}

// Function to fetch history data from Google Sheets
function fetchHistory() {
    fetch(fullUrl, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Origin': 'https://caylamiller.github.io',  // Your GitHub Pages URL
            'X-Requested-With': 'XMLHttpRequest'
        },
        mode: 'cors' // Change this to 'cors' to enable cross-origin requests
    })
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        const historyList = document.getElementById("history");
        historyList.innerHTML = '';  // Clear previous history

        data.history.forEach(entry => {
            const listItem = document.createElement("li");
            listItem.textContent = `Date: ${entry.date}, Symptom: ${entry.symptom}, Severity: ${entry.score}`;
            historyList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching history:', error));
}

// Load history when the page loads
window.onload = fetchHistory;
