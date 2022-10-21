/** @jsxImportSource @emotion/react */
import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LayerConfig, LayerVisConfig } from 'model';
import PointLayerStylePanel from './PointLayerStylePanel';
import { isPointLayer } from 'services';

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

  return (
    <>
      <Button variant='text' onClick={onExit}>
        <ArrowBackIcon />
        Back
      </Button>
      <div css={{ padding: '8px' }}>
        <h3>{label}</h3>
        {isPointLayer(layerVisConfig) ? (
          <PointLayerStylePanel
            layerVisConfig={layerVisConfig}
            onStyleChange={onStyleChange}
          />
        ) : null}
      </div>
    </>
  );
};

export default LayerStylePanel;
