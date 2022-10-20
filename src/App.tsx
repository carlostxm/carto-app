import { MapLayersProvider } from 'context';
import * as React from 'react';
import { Layout, MapContainer, SidePanel } from './components';

const App = () => {
  return (
    <MapLayersProvider>
      <Layout appTitle={'CARTO Technical Test'} sidePanel={<SidePanel />}>
        <MapContainer />
      </Layout>
    </MapLayersProvider>
  );
};

export default App;
