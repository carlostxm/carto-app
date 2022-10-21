import { LayerType, LayerVisConfig, PointLayerVisConfig } from 'model';

const isPointLayer = (config: LayerVisConfig): config is PointLayerVisConfig => {
  return config.type === LayerType.point;
}

export default isPointLayer;