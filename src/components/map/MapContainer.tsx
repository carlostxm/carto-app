import 'maplibre-gl/dist/maplibre-gl.css';
import DeckGL from '@deck.gl/react/typed';
import {
  CartoLayer,
  setDefaultCredentials,
  BASEMAP,
} from '@deck.gl/carto/typed';
import { Map as ReactMapGL } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { Dataset, LayerConfig, LayerVisConfig } from 'model';
import { LayersList } from '@deck.gl/core/typed';

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

interface MapContainerProps {
  datasets: Dataset[];
  layerConfigs: LayerConfig[];
  layerVisConfigs: LayerVisConfig[];
}

const createLayerOverlay = (
  datasets: Dataset[],
  layerConfigs: LayerConfig[],
  layerVisConfigs: LayerVisConfig[]
): LayersList => {
  const layers: LayersList = [];

  for (let i = 0; i < layerConfigs.length; i++) {
    const { datasetId, id } = layerConfigs[i];
    const dataset = datasets.find((dataset) => dataset.id === datasetId);

    if (!dataset) {
      continue;
    }

    const { type, connection, query } = dataset;

    const layerVisConfig = layerVisConfigs[i];
    const { outlineColor, outlineSize, fillColor } = layerVisConfig;

    layers.push(
      new CartoLayer({
        id,
        type,
        connection,
        data: query,
        pointRadiusMinPixels: outlineSize,
        getLineColor: outlineColor,
        getFillColor: fillColor,
        lineWidthMinPixels: 1,
      })
    );
  }

  return layers;
};

const MapContainer = ({
  datasets,
  layerConfigs,
  layerVisConfigs,
}: MapContainerProps) => {
  const layers = createLayerOverlay(datasets, layerConfigs, layerVisConfigs);

  return (
    <DeckGL
      controller={true}
      initialViewState={INITIAL_VIEW_STATE}
      layers={layers}
    >
      <ReactMapGL mapLib={maplibregl} mapStyle={BASEMAP.VOYAGER} />
    </DeckGL>
  );
};

export default MapContainer;
