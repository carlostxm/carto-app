import {
  LayerVisConfig,
  LayerType,
  TilesetLayerVisConfig,
  PointLayerVisConfig,
} from 'model';

const getLayerVisConfig = (id: string, type: LayerType): LayerVisConfig => {
  if (type === LayerType.tileset) {
    return {
      type: LayerType.tileset,
      id,
      pointRadiusMinPixels: 2,
      stroked: false,
      isVisible: true,
      colorPalette: 'Temp',
    } as TilesetLayerVisConfig;
  }
  return {
    type: LayerType.point,
    id,
    outlineColor: [0, 0, 0, 200],
    outlineSize: 1,
    fillColor: [238, 77, 90],
    isVisible: true,
    radius: 3,
  } as PointLayerVisConfig;
};

export default getLayerVisConfig;
