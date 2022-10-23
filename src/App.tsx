import { MAP_TYPES } from '@deck.gl/carto/typed';
import { addDataset, addLayer } from 'actions';
import { fetchDatasource } from 'api';
import { useMapLayers } from 'hooks';
import { LayerType } from 'model';
import React, { useEffect } from 'react';
import { Layout, MapContainer, SidePanel } from './components';

const App = () => {
  const { dispatch } = useMapLayers();

  // In a real application dataset and layers would be created by user action.
  // To simplify the use case, predefined datasets are fetched and a layer associated is created by default
  useEffect(() => {
    const retailStoresDatasetPromise = fetchDatasource(
      'carto-demo-data.demo_tables.retail_stores',
      MAP_TYPES.QUERY
    ).then((dataset) => {
      addDataset(dispatch, dataset);
      addLayer(dispatch, dataset, LayerType.point);
    });

    const airportsDatasetPromise = fetchDatasource(
      'carto-demo-data.demo_tables.airports',
      MAP_TYPES.QUERY
    ).then((dataset) => {
      addDataset(dispatch, dataset);
      addLayer(dispatch, dataset, LayerType.point);
    });

    // Request tileset the latest to avoid that it overlaps the other layers
    // This code is just to improve the initial view for this demo application, in a real application
    // layers could be reordered by the user
    Promise.allSettled([
      retailStoresDatasetPromise,
      airportsDatasetPromise,
    ]).then(() => {
      fetchDatasource(
        'carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup',
        MAP_TYPES.TILESET
      ).then((dataset) => {
        addDataset(dispatch, dataset);
        addLayer(dispatch, dataset, LayerType.tileset);
      });
    });
  }, [dispatch]);

  return (
    <Layout appTitle={'CARTO Technical Test'} sidePanel={<SidePanel />}>
      <MapContainer />
    </Layout>
  );
};

export default App;
