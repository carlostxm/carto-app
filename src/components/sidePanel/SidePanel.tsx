import React, { useState } from 'react';
import { Dataset, LayerConfig, LayerVisConfig } from 'model';
import LayerStylePanel from './LayerStylePanel';
import LayersPanel from './LayersPanel';

interface SidePanelProps {
  datasets: Record<string, Dataset>;
  layers: Record<string, LayerConfig>;
  layerVisConfigs: Record<string, LayerVisConfig>;
  layerOrder: string[];
}

type SidePanelViewMode = 'list' | 'edit';

const SidePanel = (props: SidePanelProps) => {
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

  return viewMode === 'edit' && selectedLayer ? (
    <LayerStylePanel
      onExit={handleLayerStyleExitClick}
      layerConfig={selectedLayer}
    />
  ) : (
    <LayersPanel onLayerClick={handleLayerClick} {...props} />
  );
};

export default SidePanel;
