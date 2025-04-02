const SHEET_URL = "https://script.google.com/macros/s/AKfycbzqpNM_gdaYAhQoXGWfqDmxEfA0piUJJXb6b44F2gmXBGfTPsAymXp_ypQycm2HAA/exec"; 
const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://script.google.com/macros/s/AKfycbzqpNM_gdaYAhQoXGWfqDmxEfA0piUJJXb6b44F2gmXBGfTPsAymXp_ypQycm2HAA/exec';

const fullUrl = corsProxy + apiUrl;

function saveData() {
    const date = document.getElementById("date").value;
    const symptom = document.getElementById("symptom").value;
    const score = document.getElementById("score").value;

    if (!date || !score) {
        alert("Please select a date and enter a score.");
        return;
    }

    fetch(fullUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, symptom, score }),
        mode: "no-cors"
    })
    .then(() => {
        console.log("Data sent successfully!");
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to save data.");
    });
    
}
function fetchHistory() {
    fetch(fullUrl)
    .then(response => response.json())  // Parse the response as JSON
    .then(data => {
        const historySection = document.getElementById("history");
        historySection.innerHTML = "";  // Clear previous history

        // Loop through the data and display each record
        data.forEach(entry => {
            const entryElement = document.createElement("div");
            entryElement.classList.add("history-entry");

            // Format and append the data
            entryElement.innerHTML = `
                <p>Date: ${entry.date}</p>
                <p>Symptom: ${entry.symptom}</p>
                <p>Score: ${entry.score}</p>
            `;
            historySection.appendChild(entryElement);
        });
    })
    .catch(error => console.error("Error fetching history:", error));
}

// Call the fetchHistory function when the page loads
window.onload = fetchHistory;
