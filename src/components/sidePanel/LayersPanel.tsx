/** @jsxImportSource @emotion/react */
import React from 'react';
import LayerCard from './LayerCard';
import Stack from '@mui/material/Stack';
import { LayerConfig } from 'model';
import { useMapLayers } from 'hooks';

interface LayersPanelProps {
  onLayerClick: (layer: LayerConfig) => void;
  onToggleLayerVisible: (layerId: string) => void;
}

const LayersPanel = ({
  onLayerClick,
  onToggleLayerVisible,
}: LayersPanelProps) => {
  const {
    state: { layerOrder, datasets, layers, layerVisConfigs },
  } = useMapLayers();

  const handleLayerClick = (layer: LayerConfig) => () => {
    onLayerClick(layer);
  };

  return (
    <div
      css={{
        margin: '12px',
      }}
    >
      <h3>Layers</h3>
      <Stack spacing={1}>
        {layerOrder.map((layerId) => {
          const layer = layers[layerId];
          const dataset = datasets[layer.datasetId];
          const { isVisible } = layerVisConfigs[layerId];

          return (
            <LayerCard
              key={layer.id}
              onClick={handleLayerClick(layer)}
              onToggleLayerVisible={onToggleLayerVisible}
              config={layer}
              dataset={dataset}
              isVisible={isVisible}
            />
          );
        })}
      </Stack>
    </div>
  );
};

export default LayersPanel;
