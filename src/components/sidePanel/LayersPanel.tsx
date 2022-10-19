/** @jsxImportSource @emotion/react */
import react from 'react';
import LayerCard from './LayerCard';
import Stack from '@mui/material/Stack';
import { LayerConfig, Dataset } from 'model';

interface LayersPanelProps {
  layers: LayerConfig[];
  datasets: Dataset[];
  onLayerClick: (layer: LayerConfig) => void;
}

const LayersPanel = ({ onLayerClick, layers, datasets }: LayersPanelProps) => {
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
        {layers.map((layer) => {
          const dataset = datasets.find(
            (dataset) => dataset.id === layer.datasetId
          );
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
