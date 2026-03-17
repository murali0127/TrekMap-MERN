// import { Map, MapStyle, config } from '@maptiler/sdk';
// import '@maptiler/sdk/dist/maptiler-sdk.css';


document.addEventListener('DOMContentLoaded', () => {

      const mapContainer = document.getElementById('map');

      if (!mapContainer) return;

      const apiKey = mapContainer.dataset.maptilerKey;
      const treks = JSON.parse(mapContainer.dataset.treks); //JSON parse -> converys JSON into Object.
      // const treks = mapContainer.dataset.treks;
      const geoJSON = {
            type: 'FeatureCollection',
            features: treks
                  .filter(trek => {
                        return trek.coordinates && trek.coordinates.coordinates && trek.coordinates.coordinates.length === 2;
                  })
                  .map(trek => ({
                        type: 'Feature',
                        geometry: {
                              type: 'Point',
                              coordinates: trek.coordinates.coordinates
                        },
                        properties: {
                              id: trek._id,
                              name: trek.name,
                              location: trek.location,
                              district: trek.district
                        }
                  }))
      }

      maptilersdk.config.apiKey = apiKey;
      const map = new maptilersdk.Map({
            container: 'map',
            zoom: 4.6,                    // Zoom level to show India
            center: [78.6569, 11.1271],   // Center of India [longitude, latitude]
            style: maptilersdk.MapStyle.DATAVIZ.LIGHT
      });

      map.on('load', function () {
            // add a clustered GeoJSON source for a sample set of earthquakes
            map.addSource('earthquakes', {
                  'type': 'geojson',
                  'data': geoJSON,
                  cluster: true,
                  clusterMaxZoom: 14, // Max zoom to cluster points on
                  clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
            });

            map.addLayer({
                  id: 'clusters',
                  type: 'circle',
                  source: 'earthquakes',
                  filter: ['has', 'point_count'],
                  paint: {
                        // Use step expressions (https://docs.maptiler.com/gl-style-specification/expressions/#step)
                        // with three steps to implement three types of circles:
                        //   * Blue, 20px circles when point count is less than 100
                        //   * Yellow, 30px circles when point count is between 100 and 750
                        //   * Pink, 40px circles when point count is greater than or equal to 750
                        'circle-color': [
                              'step',
                              ['get', 'point_count'],
                              '#089d2b',
                              100,
                              '#f1f075',
                              750,
                              '#f28cb1'
                        ],
                        'circle-radius': [
                              'step',
                              ['get', 'point_count'],
                              20,
                              100,
                              30,
                              750,
                              40
                        ]
                  }
            });

            map.addLayer({
                  id: 'cluster-count',
                  type: 'symbol',
                  source: 'earthquakes',
                  filter: ['has', 'point_count'],
                  layout: {
                        'text-field': '{point_count_abbreviated}',
                        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                        'text-size': 12
                  }
            });

            map.addLayer({
                  id: 'unclustered-point',
                  type: 'circle',
                  source: 'earthquakes',
                  filter: ['!', ['has', 'point_count']],
                  paint: {
                        'circle-color': '#085508',
                        'circle-radius': 8,
                        'circle-stroke-width': 2,
                        'circle-stroke-color': '#fff'
                  }
            });

            // inspect a cluster on click
            map.on('click', 'clusters', async function (e) {
                  const features = map.queryRenderedFeatures(e.point, {
                        layers: ['clusters']
                  });
                  const clusterId = features[0].properties.cluster_id;
                  const zoom = await map.getSource('earthquakes').getClusterExpansionZoom(clusterId);
                  map.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom
                  });
            });

            // When a click event occurs on a feature in
            // the unclustered-point layer, open a popup at
            // the location of the feature, with
            // description HTML from its properties.
            map.on('click', 'unclustered-point', function (e) {
                  const coordinates = e.features[0].geometry.coordinates.slice();
                  const popupMsg = e.features[0].properties;


                  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                  }

                  new maptilersdk.Popup()
                        .setLngLat(coordinates)
                        .setHTML(`

              <div style="text-align: center; min-width: 150px;">
                  <h6 style="margin: 0 0 5px 0; color: #041f04;">${popupMsg.name}</h6>
                  <small style="color: #666;">${popupMsg.location}, ${popupMsg.district}</small>
                  <br>
                  <a href="/treks/${popupMsg.id}"
                     style="display: inline-block; margin-top: 8px; padding: 5px 10px;
                            background: #3b633b; color: white; text-decoration: none;
                            border-radius: 4px; font-size: 12px;">
                      View Details
                  </a>
              </div>`

                        )

                        .addTo(map);
            });

            map.on('mouseenter', 'clusters', function () {
                  map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'clusters', function () {
                  map.getCanvas().style.cursor = '';
            });
            map.on('mouseenter', 'unclustered-point', function () {
                  map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'unclustered-point', function () {
                  map.getCanvas().style.cursor = '';
            });
      });
})