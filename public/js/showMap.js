// Display trek location using MapTiler


// let mapInstance = null;

// const MAP_STYLES = {
//       dark: maptilersdk.MapStyle.STREETS_DARK,
//       light: maptilersdk.MapStyle.STREETS
// }

async function initTrekMap() {
      const mapContainer = document.getElementById('trek-map');
      if (!mapContainer) return;

      // Read the API key from the data attribute (set in show.ejs)
      const apiKey = mapContainer.dataset.maptilerKey;
      if (!apiKey) {
            console.error('MapTiler API key not found');
            return;
      }

      // Set the API key on the SDK
      maptilersdk.config.apiKey = apiKey;

      // Get coordinates from data attributes
      // data-lng = longitude, data-lat = latitude (GeoJSON order)
      const lng = parseFloat(mapContainer.dataset.lng);
      const lat = parseFloat(mapContainer.dataset.lat);
      const trekName = mapContainer.dataset.name || 'Trek Location';

      // Validate coordinates exist
      if (isNaN(lng) || isNaN(lat)) {
            console.error('Invalid coordinates');
            mapContainer.innerHTML = '<div class="d-flex align-items-center justify-content-center h-100 text-secondary"><i class="bi bi-geo-alt me-2"></i>Location coordinates not available</div>';
            return;
      }


      try {
            //Read current Theme from localStorage
            // const currTheme = localStorage.getItem('trekmap-theme') || 'dark';

            // Initialize MapTiler map
            // MapTiler expects center as [longitude, latitude]
            mapInstance = new maptilersdk.Map({
                  container: 'trek-map',
                  style: maptilersdk.MapStyle.STREETS_DARK,
                  center: [lng, lat],
                  zoom: 14
            });

            // Add navigation controls
            mapInstance.addControl(new maptilersdk.NavigationControl(), 'top-right');

            // Add marker with popup
            new maptilersdk.Marker({ color: '#1d610e' })
                  .setLngLat([lng, lat])
                  .setPopup(
                        new maptilersdk.Popup({ offset: 25 })
                              .setHTML(`<strong>${trekName}</strong>`)
                  )
                  .addTo(mapInstance);

      } catch (error) {
            console.error('Error initializing map:', error);
            mapContainer.innerHTML = '<div class="d-flex align-items-center justify-content-center h-100 text-danger"><i class="bi bi-exclamation-triangle me-2"></i>Failed to load map</div>';
      }

      //       function updateMapStyle(theme) {
      //             if (!mapInstance) {
      //                   return;
      //             }
      //             mapInstance.setStyle(MAP_STYLES[theme]);
      //       }
}

document.addEventListener('DOMContentLoaded', initTrekMap);
