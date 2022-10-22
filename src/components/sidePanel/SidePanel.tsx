import React, { useState } from 'react';
import { LayerConfig, LayerVisConfig } from 'model';
import LayerStylePanel from './LayerStylePanel';
import LayersPanel from './LayersPanel';
import { useMapLayers } from 'hooks';
import { toggleLayerVisibility, updateLayerVisConfig } from 'actions';

type SidePanelViewMode = 'list' | 'edit';

const SidePanel = () => {
  const {
    state: { layerVisConfigs },
    dispatch,
  } = useMapLayers();
  const [viewMode, setViewMode] = useState<SidePanelViewMode>('list');
  const [selectedLayer, setSelectedLayer] = useState<LayerConfig | null>(null);

  const handleLayerClick = (layer: LayerConfig) => {
    setViewMode('edit');
    setSelectedLayer(layer);
  };

  const handleLayerStyleExitClick = () => {
    setViewMode('list');
    setSelectedLayer(null);
  };

  const handleLayerStyleChange = (layerVisConfig: LayerVisConfig) => {
    updateLayerVisConfig(dispatch, layerVisConfig.id, layerVisConfig);
  };

  const handleVisibilityChange = (layerId: string) => {
    toggleLayerVisibility(dispatch, layerId);
  };

  return viewMode === 'edit' && selectedLayer ? (
    <LayerStylePanel
      onExit={handleLayerStyleExitClick}
      onStyleChange={handleLayerStyleChange}
      layerConfig={selectedLayer}
      layerVisConfig={layerVisConfigs[selectedLayer.id]}
    />
  ) : (
    <LayersPanel
      onLayerClick={handleLayerClick}
      onToggleLayerVisible={handleVisibilityChange}
    />
  );
};

export default SidePanel;
