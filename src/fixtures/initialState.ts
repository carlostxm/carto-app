import { MAP_TYPES } from '@deck.gl/carto/typed';
import { MapState } from 'model';

export const INITIAL_STATE: MapState = {
  datasets: [
    {
      label: 'retail_stores',
      type: MAP_TYPES.QUERY,
      connection: 'carto_dw',
      query: 'select * from carto-demo-data.demo_tables.retail_stores',
      id: 'retail_stores_0', // must be a unique ID created from parameters
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
  layers: [
    {
      datasetId: 'retail_stores_0',
      id: 'retail_stores_0__layer-0',
      label: 'Layer 0',
    },
  ],
  layerVisConfigs: [
    {
      id: 'retail_stores_0__layer-0',
      outlineColor: [0, 0, 0, 200],
      outlineSize: 2,
      fillColorProp: 'name',
      fillColor: [238, 77, 90],
    },
  ],
};
