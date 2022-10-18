import { MapType as CartoMapType } from '@deck.gl/carto/typed/api/maps-api-common';

export interface BaseAction<T = unknown> {
  type: string;
  payload: T;
}

export interface MapState {
  datasets: Dataset[];
  layers: LayerConfig[];
  layerVisConfigs: LayerVisConfig[];
}

export interface Dataset {
  label: string;
  id: string;
  query: string;
  connection: string;
  type: CartoMapType;
  schema: SchemaDefinitionItem[];
  size: number;
  rows: number;
}

type SchemaFieldType = 'number' | 'string';

interface SchemaDefinitionItem {
  name: string;
  type: SchemaFieldType;
}

export interface LayerConfig {
  id: string;
  label: string;
  datasetId: string;
}

interface BaseLayerVisConfig {
  id: string;
}

export interface LayerVisConfig extends BaseLayerVisConfig {
  outlineSize: number;
  outlineColor: number[];
  fillColorProp: string;
  fillColor: number[];
}
