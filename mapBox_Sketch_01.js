var mapboxSketch = function () {
  // Set your Mapbox access token
  mapboxgl.accessToken =
    'pk.eyJ1IjoiY2hlbHNlYWpoYWkiLCJhIjoiY21kYWhqZDJmMGJncjJpcjJsbXQ4bzlhayJ9.o_c0WoASGhPDvlgoNpAj1w';

  // Create the map instance with your custom style
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chelseajhai/cmdchuwss003p01rvduif742c',
    center: [-74.006, 40.7128],
    zoom: 11,
    pitch: 0,
    bearing: 0,
  });

  // Add map controls
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
  map.addControl(
    new mapboxgl.ScaleControl({ maxWidth: 80, unit: 'metric' }),
    'bottom-left'
  );

  // Wait for the map to load
  map.on('load', () => {
    console.log('Map loaded successfully with custom style.');

    // Load LPI Signal GeoJSON
    map.addSource('lpi-signals', {
      type: 'geojson',
      data: './lpi_signals.geojson',
    });

    map.addLayer({
      id: 'lpi-layer',
      type: 'circle',
      source: 'lpi-signals',
      paint: {
        'circle-radius': 4,
        'circle-color': '#ff7800',
        'circle-stroke-width': 0.5,
        'circle-stroke-color': '#fff',
      },
    });

    // Optional example markers
    new mapboxgl.Marker({ color: '#666' })
      .setLngLat([-73.9855, 40.758])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          '<h3>Times Square</h3><p>The heart of Manhattan!</p>'
        )
      )
      .addTo(map);

    new mapboxgl.Marker({ color: '#666' })
      .setLngLat([-73.9654, 40.7829])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          '<h3>Central Park</h3><p>843 acres of urban oasis</p>'
        )
      )
      .addTo(map);

    new mapboxgl.Marker({ color: '#666' })
      .setLngLat([-73.9969, 40.7061])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          '<h3>Brooklyn Bridge</h3><p>Iconic bridge connecting Manhattan and Brooklyn</p>'
        )
      )
      .addTo(map);
  });

  // Optional button functionality
  const zoomInBtn = document.getElementById('zoomIn');
  const zoomOutBtn = document.getElementById('zoomOut');
  const resetViewBtn = document.getElementById('resetView');

  if (zoomInBtn) zoomInBtn.addEventListener('click', () => map.zoomIn());
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => map.zoomOut());
  if (resetViewBtn)
    resetViewBtn.addEventListener('click', () =>
      map.flyTo({
        center: [-74.006, 40.7128],
        zoom: 11,
        pitch: 0,
        bearing: 0,
        duration: 2000,
      })
    );

  // Show coordinates on map click
  map.on('click', (e) => {
    const coordinates = e.lngLat;
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(
        `<div style="text-align: center;">
          <h4>Location Info</h4>
          <p><strong>Longitude:</strong> ${coordinates.lng.toFixed(4)}</p>
          <p><strong>Latitude:</strong> ${coordinates.lat.toFixed(4)}</p>
        </div>`
      )
      .addTo(map);
  });
};

mapboxSketch();
