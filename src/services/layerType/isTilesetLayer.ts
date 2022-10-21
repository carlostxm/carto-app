import { LayerType, LayerVisConfig, TilesetLayerVisConfig } from 'model';

const isTilesetLayer = (
  config: LayerVisConfig
): config is TilesetLayerVisConfig => {
  return config.type === LayerType.tileset;
};

export default isTilesetLayer;
