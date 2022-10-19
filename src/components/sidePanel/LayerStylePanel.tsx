import react from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LayerConfig, LayerVisConfig } from 'model';

interface LayerStylePanelProps {
  onExit: () => void;
  layerConfig: LayerConfig;
}

const LayerStylePanel = ({ onExit }: LayerStylePanelProps) => {
  return (
    <>
      <Button variant='text' onClick={onExit}>
        <ArrowBackIcon />
        Back
      </Button>
    </>
  );
};

export default LayerStylePanel;
