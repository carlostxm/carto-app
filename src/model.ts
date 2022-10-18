import { Palette } from '@mui/material';

export interface BaseAction<T = unknown> {
  type: string;
  payload: T;
}

export interface MapState {
  datasets: Dataset[];
  layers: LayerConfig[];
  layerVisConfigs: LayerVisConfig[];
}

export enum DatasetType {
  Query,
}

export interface Dataset {
  label: string;
  id: string;
  query: string;
  connection: string;
  type: DatasetType;
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
  outlineColor: string;
  fillColorProp: string;
  fillColor: Palette;
}
