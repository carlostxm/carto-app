/** @jsxImportSource @emotion/react */
import React from 'react';
import LayerCard from './LayerCard';
import Stack from '@mui/material/Stack';
import { LayerConfig } from 'model';
import { useMapLayers } from 'hooks';

interface LayersPanelProps {
  onLayerClick: (layer: LayerConfig) => void;
}

const LayersPanel = ({ onLayerClick }: LayersPanelProps) => {
  const {
    state: { layerOrder, datasets, layers },
  } = useMapLayers();

  const handleLayerClick = (layer: LayerConfig) => () => {
    onLayerClick(layer);
  };

  console.log(layerOrder);

  return (
    <div
      css={{
        margin: '12px',
      }}
    >
      <h3>Layers</h3>
      <Stack spacing={1}>
        {/* Show first layer on top */}
        {layerOrder
          .slice()
          .reverse()
          .map((layerId) => {
            const layer = layers[layerId];
            const dataset = datasets[layer.datasetId];
            console.log(layerId, layer.id);
            return (
              <LayerCard
                key={layer.id}
                onClick={handleLayerClick(layer)}
                config={layer}
                dataset={dataset!}
              />
            );
          })}
      </Stack>
    </div>
  );
};

export default LayersPanel;
