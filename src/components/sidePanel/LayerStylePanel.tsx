import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LayerConfig, LayerVisConfig } from 'model';
import { ColorPicker } from 'components';
import { getRGBFromHex, getHexFromRGB } from 'translators';

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
  const { outlineColor, fillColor } = layerVisConfig;

  const handleFieldColorChange =
    (fieldName: keyof LayerVisConfig) => (color: string) => {
      onStyleChange({
        ...layerVisConfig,
        [fieldName]: getRGBFromHex(color),
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
        <ColorPicker
          label={'Fill color'}
          defaultValue={getHexFromRGB(fillColor)}
          onChange={handleFieldColorChange('fillColor')}
        />
        <ColorPicker
          label={'Outline color'}
          defaultValue={getHexFromRGB(outlineColor)}
          onChange={handleFieldColorChange('outlineColor')}
        />
      </div>
    </>
  );
};

export default LayerStylePanel;
