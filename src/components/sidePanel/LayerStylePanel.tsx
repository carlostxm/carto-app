/** @jsxImportSource @emotion/react */
import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LayerConfig, LayerVisConfig } from 'model';
import { ColorPicker, Slider } from 'components';
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
  const { outlineColor, fillColor, radius, outlineSize } = layerVisConfig;

  const handleFieldColorChange =
    (fieldName: keyof LayerVisConfig) => (color: string) => {
      onStyleChange({
        ...layerVisConfig,
        [fieldName]: getRGBFromHex(color),
      });
    };

  const handleSliderChange =
    (fieldName: keyof LayerVisConfig) => (value: number) => {
      onStyleChange({
        ...layerVisConfig,
        [fieldName]: value,
      });
    };

  return (
    <>
      <Button variant='text' onClick={onExit}>
        <ArrowBackIcon />
        Back
      </Button>
      <div css={{ padding: '8px' }}>
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
        <Slider
          label={'Radius'}
          min={1}
          max={20}
          value={radius}
          onChange={handleSliderChange('radius')}
        />
        <Slider
          label={'Outline size'}
          min={1}
          max={5}
          value={outlineSize}
          onChange={handleSliderChange('outlineSize')}
        />
      </div>
    </>
  );
};

export default LayerStylePanel;
