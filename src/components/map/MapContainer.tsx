import 'maplibre-gl/dist/maplibre-gl.css';
import DeckGL from '@deck.gl/react/typed';
import {
  CartoLayer,
  setDefaultCredentials,
  BASEMAP,
  colorBins,
} from '@deck.gl/carto/typed';
import { Map as ReactMapGL } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { Dataset, LayerConfig, LayerVisConfig } from 'model';
import { LayersList } from '@deck.gl/core/typed';
import { useMapLayers } from 'hooks';
import { CARTO_BASE_URL } from 'config';
import { isPointLayer, isTilesetLayer } from 'services';

setDefaultCredentials({
  accessToken: process.env.REACT_APP_CARTO_TOKEN,
  apiBaseUrl: CARTO_BASE_URL,
});

const INITIAL_VIEW_STATE = {
  longitude: -101.05485,
  latitude: 39.9154,
  zoom: 4,
  pitch: 0,
  bearing: 0,
};

const createLayersOverlay = (
  datasets: Record<string, Dataset>,
  layerConfigs: Record<string, LayerConfig>,
  layerVisConfigs: Record<string, LayerVisConfig>,
  layerOrder: string[]
): LayersList => {
  return layerOrder
    .reverse()
    .map((layerId) => {
      const { datasetId, id } = layerConfigs[layerId];
      const dataset = datasets[datasetId];

      const { type, connection, data } = dataset;

      const layerVisConfig = layerVisConfigs[layerId];

      if (isPointLayer(layerVisConfig)) {
        const { outlineColor, outlineSize, fillColor, isVisible, radius } =
          layerVisConfig;
        return new CartoLayer({
          id,
          type,
          connection,
          data,
          pointRadiusMinPixels: radius,
          getLineColor: outlineColor,
          getFillColor: fillColor,
          lineWidthMinPixels: outlineSize,
          visible: isVisible,
          getPointRadius: radius,
        });
      } else if (isTilesetLayer(layerVisConfig)) {
        return new CartoLayer({
          id,
          type,
          connection,
          data,
          pointRadiusMinPixels: 2,
          stroked: false,
          getFillColor: colorBins({
            attr: 'total_pop',
            domain: [10, 1e2, 1e3, 1e4, 1e5, 1e6],
            colors: 'Temps',
          }),
        });
      }

      return null;
    })
    .filter(Boolean);
};

const MapContainer = () => {
  const {
    state: { datasets, layers: layerConfigs, layerVisConfigs, layerOrder },
  } = useMapLayers();

  const layers = createLayersOverlay(
    datasets,
    layerConfigs,
    layerVisConfigs,
    layerOrder
  );

  console.log(layers.length);

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
