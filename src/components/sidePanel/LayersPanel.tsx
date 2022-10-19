/** @jsxImportSource @emotion/react */
import react from 'react';
import LayerCard from './LayerCard';
import Stack from '@mui/material/Stack';
import { LayerConfig, Dataset } from 'model';

interface LayersPanelProps {
  layers: Record<string, LayerConfig>;
  datasets: Record<string, Dataset>;
  layerOrder: string[];
  onLayerClick: (layer: LayerConfig) => void;
}

const LayersPanel = ({
  onLayerClick,
  layers,
  datasets,
  layerOrder,
}: LayersPanelProps) => {
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
