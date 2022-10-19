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
  datasets: Record<string, Dataset>;
  layerConfigs: Record<string, LayerConfig>;
  layerVisConfigs: Record<string, LayerVisConfig>;
  layerOrder: string[];
}

const createLayersOverlay = (
  datasets: Record<string, Dataset>,
  layerConfigs: Record<string, LayerConfig>,
  layerVisConfigs: Record<string, LayerVisConfig>,
  layerOrder: string[]
): LayersList => {
  return layerOrder.map((layerId) => {
    const { datasetId, id } = layerConfigs[layerId];
    const dataset = datasets[datasetId];

    const { type, connection, query } = dataset;

    const layerVisConfig = layerVisConfigs[layerId];
    const { outlineColor, outlineSize, fillColor } = layerVisConfig;

    const layer = new CartoLayer({
      id,
      type,
      connection,
      data: query,
      pointRadiusMinPixels: outlineSize,
      getLineColor: outlineColor,
      getFillColor: fillColor,
      lineWidthMinPixels: 1,
    });

    return layer;
  });
};

const MapContainer = ({
  datasets,
  layerConfigs,
  layerVisConfigs,
  layerOrder,
}: MapContainerProps) => {
  const layers = createLayersOverlay(
    datasets,
    layerConfigs,
    layerVisConfigs,
    layerOrder
  );

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
