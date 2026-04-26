import fetch from 'node-fetch'; // For node-fetch v3.x

const url = 'https://api.example.com/trends';  // Replace with the actual URL you're fetching trends from

const fetchTrends = async () => {
    try {
        const response = await fetch(url);
        const trends = await response.json();

        console.log("Trends Data: ", trends); // Process the trends data here
    } catch (error) {
        console.error("Error fetching trends data: ", error);
    }
};

fetchTrends();
