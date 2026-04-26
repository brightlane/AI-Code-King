// Importing required module
import fetch from 'node-fetch'; // For node-fetch v3.x

// Replace with your actual endpoint or data source URL
const url = 'https://api.example.com/data';  // Replace with the actual API URL you're trying to fetch from

// Function to fetch data
const fetchData = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Fetched Data: ", data); // Process the data as needed
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

fetchData();
