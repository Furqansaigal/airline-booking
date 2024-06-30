async function searchFlights() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    if (!origin || !destination || !date) {
        alert('Please enter origin, destination, and date');
        return;
    }

    try {
        const apiKey = 'YOUR_API_KEY';  // Replace with your actual API key
        const url = https://api.worldota.net/api/b2b/v3/hotel/order/info/';
        
        // Mark where the API is used
        console.log('Fetching flights from API with URL:', url);
        
        const response = await fetch(url);  // API call
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();  // API response data
        console.log('Data received:', data);

        if (data.error) {
            throw new Error(`API error: ${data.error.message}`);
        }

        const flightsContainer = document.getElementById('flights');
        flightsContainer.innerHTML = '';

        if (data.data.length === 0) {
            flightsContainer.innerHTML = '<p>No flights found.</p>';
            return;
        }

        data.data.forEach(flight => {
            const flightElement = document.createElement('div');
            flightElement.className = 'flight';
            flightElement.innerHTML = `
                <p>Flight Number: ${flight.flight.iata}</p>
                <p>Airline: ${flight.airline.name}</p>
                <p>Departure: ${flight.departure.scheduled}</p>
                <p>Arrival: ${flight.arrival.scheduled}</p>
                <button onclick="bookFlight('${flight.flight.iata}')">Book Now</button>
            `;
            flightsContainer.appendChild(flightElement);
        });
    } catch (error) {
        console.error('Error fetching flights:', error);
        alert(`Error fetching flights: ${error.message}`);
    }
}

function bookFlight(flightNumber) {
    alert(`Flight ${flightNumber} booked successfully!`);
}
