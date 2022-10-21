import { MapType as CartoMapType } from '@deck.gl/carto/typed/api/maps-api-common';

export interface BaseAction<T = any> {
  type: string;
  payload: T;
}

export interface MapState {
  layerCounter: number; // To create layer UUID
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

interface SchemaDefinitionItem {
  name: string;
  type: string;
}

export interface LayerConfig {
  id: string;
  label: string;
  datasetId: string;
}

interface BaseLayerVisConfig {
  id: string;
  type: 'point' | 'cluster' | 'cell';
}

export type LayerVisConfig = PointLayerVisConfig; // | CellLayerVisConfig | ClusterLayerVisConfig;

export interface PointLayerVisConfig extends BaseLayerVisConfig {
  type: 'point';
  radius: number;
  outlineSize: number;
  outlineColor: number[];
  fillColorProp?: string;
  fillColor: number[];
  isVisible: boolean;
}
