import { MapType as CartoMapType } from '@deck.gl/carto/typed/api/maps-api-common';

export interface BaseAction<T = unknown> {
  type: string;
  payload: T;
}

export interface MapState {
  datasets: Record<string, Dataset>;
  layers: Record<string, LayerConfig>; // Order is defined by layerOrder, indexed to optimaze search i.e. read or remove
  layerVisConfigs: Record<string, LayerVisConfig>;
  layerOrder: string[];
}

interface BaseDataset {
  id: string;
  label: string;
}

interface CartoDataset extends BaseDataset {
  query: string;
  connection: string;
  type: CartoMapType;
  schema: SchemaDefinitionItem[];
  size: number;
  rows: number;
}

export type Dataset = CartoDataset; // | OtherDatasetVendor

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
