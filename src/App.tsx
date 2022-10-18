import { DatasetType, MapState } from 'model';
import * as React from 'react';
import { Layout, MapContainer, SidePanel } from './components';

const INITIAL_STATE: MapState = {
  datasets: [
    {
      label: 'retail_stores',
      type: DatasetType.Query,
      connection: 'carto_dw',
      query: 'select * from carto-demo-data.demo_tables.retail_stores',
      id: 'retail_stores',
      rows: 1000,
      size: 70000,
      schema: [
        {
          name: 'cartodb_id',
          type: 'number',
        },
        {
          name: 'gps_code',
          type: 'string',
        },
        {
          name: 'name',
          type: 'string',
        },
      ],
    },
  ],
  layers: [],
  layerVisConfigs: [],
};

const App = () => {
  const [{ datasets, layers, layerVisConfigs }] = React.useState(INITIAL_STATE);

  const sidePanelProps: React.ComponentProps<typeof SidePanel> = {
    datasets,
    layers,
    layerVisConfigs,
  };

  const mapContainerProps: React.ComponentProps<typeof MapContainer> = {
    datasets,
    layers,
    layerVisConfigs,
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
