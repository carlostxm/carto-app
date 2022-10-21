import { addDataset, addLayer } from 'actions';
import { fetchTable } from 'api';
import { useMapLayers } from 'hooks';
import React, { useEffect } from 'react';
import { Layout, MapContainer, SidePanel } from './components';

const App = () => {
  const { dispatch } = useMapLayers();

  // In a real application dataset and layers would be created by user action. To simplify the use case, predefined datasets are fetched and a layer is created by default
  useEffect(() => {
    fetchTable('carto-demo-data.demo_tables.retail_stores').then((dataset) => {
      addDataset(dispatch, dataset);
      addLayer(dispatch, dataset);
    });
  }, [dispatch]);

  return (
    <Layout appTitle={'CARTO Technical Test'} sidePanel={<SidePanel />}>
      <MapContainer />
    </Layout>
  );
};

export default App;
