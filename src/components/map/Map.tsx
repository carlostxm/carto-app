import 'mapbox-gl/dist/mapbox-gl.css';
import DeckGL from '@deck.gl/react/typed';
import {
  CartoLayer,
  setDefaultCredentials,
  MAP_TYPES,
} from '@deck.gl/carto/typed';
import { Map as ReactMapGL } from 'react-map-gl';

setDefaultCredentials({
  accessToken: process.env.REACT_APP_CARTO_TOKEN,
  apiBaseUrl: 'https://gcp-europe-west1.api.carto.com',
});

const INITIAL_VIEW_STATE = {
  longitude: -101.05485,
  latitude: 39.9154,
  zoom: 4,
  pitch: 0,
  bearing: 0,
};

export function Map() {
  const layer = new CartoLayer({
    type: MAP_TYPES.QUERY,
    connection: 'carto_dw',
    data: 'select * from carto-demo-data.demo_tables.retail_stores',
    pointRadiusMinPixels: 2,
    getLineColor: [0, 0, 0, 200],
    getFillColor: [238, 77, 90],
    lineWidthMinPixels: 1,
  });

  return (
    <DeckGL
      controller={true}
      initialViewState={INITIAL_VIEW_STATE}
      layers={[layer]}
    >
      <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle={'mapbox://styles/mapbox/dark-v10'}
      />
    </DeckGL>
  );
}
