import React from 'react';
import { Dataset, LayerConfig, LayerVisConfig } from 'model';

interface SidePanelProps {
  datasets: Dataset[];
  layers: LayerConfig[];
  layerVisConfigs: LayerVisConfig[];
}

const SidePanel = ({ datasets }: SidePanelProps) => {
  return <div>Hola</div>;
};

export default SidePanel;
