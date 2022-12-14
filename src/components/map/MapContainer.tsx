import 'maplibre-gl/dist/maplibre-gl.css';
import React, { useMemo } from 'react';
import DeckGL from '@deck.gl/react/typed';
import {
  CartoLayer,
  setDefaultCredentials,
  BASEMAP,
  colorBins,
} from '@deck.gl/carto/typed';
import { Map as ReactMapGL } from 'react-map-gl';
import { Dataset, LayerConfig, LayerVisConfig } from 'model';
import { LayersList } from '@deck.gl/core/typed';
import { useMapLayers } from 'hooks';
import { CARTO_BASE_URL } from 'config';
import { isPointLayer, isTilesetLayer } from 'services';

// Workaround to be able to show maplibre in production
// https://github.com/maplibre/maplibre-gl-js/issues/1011
//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl';
//@ts-ignore
import maplibreglWorker from 'maplibre-gl/dist/maplibre-gl-csp-worker';
import { INITIAL_VIEW_STATE } from 'fixtures';
//@ts-ignore
maplibregl.workerClass = maplibreglWorker;

setDefaultCredentials({
  accessToken: process.env.REACT_APP_CARTO_TOKEN,
  apiBaseUrl: CARTO_BASE_URL,
});

const createLayersOverlay = (
  datasets: Record<string, Dataset>,
  layerConfigs: Record<string, LayerConfig>,
  layerVisConfigs: Record<string, LayerVisConfig>,
  layerOrder: string[]
): LayersList => {
  // Show first layer on top
  return layerOrder
    .slice()
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
        const { isVisible } = layerVisConfig;
        return new CartoLayer({
          id,
          type,
          connection,
          data,
          pointRadiusMinPixels: 2,
          stroked: false,
          visible: isVisible,
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

  // Memoized computation as it could be a heavy process in case of having a large list of layers
  const layers = useMemo(
    () =>
      createLayersOverlay(datasets, layerConfigs, layerVisConfigs, layerOrder),
    [datasets, layerConfigs, layerVisConfigs, layerOrder]
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
