/** @jsxImportSource @emotion/react */
import React from 'react';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
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
  const { outlineColor, fillColor, radius, outlineSize } = layerVisConfig;

  const handleFieldColorChange =
    (fieldName: keyof LayerVisConfig) => (color: string) => {
      onStyleChange({
        ...layerVisConfig,
        [fieldName]: getRGBFromHex(color),
      });
    };

  const handleSliderChange =
    //@ts-ignore Ignore event, just taking value
    (fieldName: keyof LayerVisConfig) => (event, value: number | number[]) => {
      onStyleChange({
        ...layerVisConfig,
        [fieldName]: value as number,
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
        <div>
          <Typography variant='caption' display='block'>
            Radius
          </Typography>
          <Slider
            size='small'
            min={1}
            max={20}
            aria-label='Radius'
            valueLabelDisplay='auto'
            value={radius}
            onChange={handleSliderChange('radius')}
          />
        </div>
        <div>
          <Typography variant='caption' display='block'>
            Outline size
          </Typography>
          <Slider
            size='small'
            value={outlineSize}
            min={1}
            max={5}
            aria-label='Outline size'
            valueLabelDisplay='auto'
            onChange={handleSliderChange('outlineSize')}
          />
        </div>
      </div>
    </>
  );
};

export default LayerStylePanel;
