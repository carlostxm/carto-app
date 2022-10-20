import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LayerConfig, LayerVisConfig } from 'model';
import { ColorPicker } from 'components';
import { getRGBFromHex } from 'translators';

interface LayerStylePanelProps {
  onExit: () => void;
  onStyleChange: (layerVisConfig: LayerVisConfig) => void;
  layerConfig: LayerConfig;
  layerVisConfig: LayerVisConfig;
}

const LayerStylePanel = ({
  onExit,
  onStyleChange,
  layerConfig,
  layerVisConfig,
}: LayerStylePanelProps) => {
  const { label } = layerConfig;

  const handleFillColorChange = (color: string) => {
    onStyleChange({
      ...layerVisConfig,
      fillColor: getRGBFromHex(color),
    });
  };

  const handleOutlineColorChange = (color: string) => {
    onStyleChange({
      ...layerVisConfig,
      outlineColor: getRGBFromHex(color),
    });
  };

  return (
    <>
      <Button variant='text' onClick={onExit}>
        <ArrowBackIcon />
        Back
      </Button>
      <div>
        <h3>{label}</h3>
        <ColorPicker label={'Fill color'} onChange={handleFillColorChange} />
        <ColorPicker
          label={'Outline color'}
          onChange={handleOutlineColorChange}
        />
      </div>
    </>
  );
};

export default LayerStylePanel;
