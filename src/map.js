// Render a Leaflet map with one circle pin per activity. Pins darken to navy when done.
// `L` is the global from the Leaflet CDN script tag in map.html.
export function renderMap(container, activities, store) {
  const map = L.map(container);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  const markers = new Map();
  const bounds = [];

  for (const a of activities) {
    const marker = L.circleMarker([a.lat, a.lng], pinStyle(false)).addTo(map);
    marker.bindPopup(
      `<strong>${a.description}</strong><br>` +
      `<a href="${a.url}" target="_blank" rel="noopener">Visit website ↗</a>`
    );
    marker.on('mouseover', () => marker.openPopup()); // desktop hover; tap fires click → popup
    markers.set(a.id, marker);
    bounds.push([a.lat, a.lng]);
  }

  map.fitBounds(bounds, { padding: [30, 30] });

  store.subscribe(doneIds => {
    for (const [id, marker] of markers) {
      marker.setStyle(pinStyle(doneIds.has(id)));
    }
  });
}

function pinStyle(done) {
  return {
    radius: 9,
    color: '#ffffff',
    weight: 2,
    fillColor: done ? '#0b1f3a' : '#fb4f14',
    fillOpacity: 1,
  };
}
