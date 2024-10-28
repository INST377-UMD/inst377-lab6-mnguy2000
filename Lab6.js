function createMap() {
    var map = L.map('map').setView([38.98, -96.00], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    for (let i = 0; i < 3; i++) {
        const latitude = getRandomInRange(30, 35, 3);
        const longitude = getRandomInRange(-90, -100, 3);
        L.marker([latitude, longitude]).addTo(map);

        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
                const locality = data.locality;
                const markerInfo = document.createElement("p");
                markerInfo.innerHTML = `Marker ${i + 1} Latitude: ${latitude}, Longitude: ${longitude}, Locality: ${locality}`;
                document.getElementById('markersInfo').appendChild(markerInfo);
            })
            .catch(error => console.error('Error fetching locality:', error));
    }
}


function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}
window.onload = createMap;
