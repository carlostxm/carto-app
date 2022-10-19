import { INITIAL_STATE } from 'fixtures';
import * as React from 'react';
import { Layout, MapContainer, SidePanel } from './components';

const App = () => {
  const [{ datasets, layers, layerVisConfigs, layerOrder }] =
    React.useState(INITIAL_STATE);

  const sidePanelProps: React.ComponentProps<typeof SidePanel> = {
    datasets,
    layers,
    layerVisConfigs,
    layerOrder,
  };

  const mapContainerProps: React.ComponentProps<typeof MapContainer> = {
    datasets,
    layerConfigs: layers,
    layerVisConfigs,
    layerOrder,
  };

  return (
    <Layout
      appTitle={'CARTO Technical Test'}
      sidePanel={<SidePanel {...sidePanelProps} />}
    >
      <MapContainer {...mapContainerProps} />
    </Layout>
  );
};

export default App;
