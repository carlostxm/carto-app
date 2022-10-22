import React, { MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Dataset, LayerConfig } from 'model';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface LayerCardProps {
  onClick: () => void;
  onToggleLayerVisible: (layerId: string) => void;
  config: LayerConfig;
  dataset: Dataset;
  isVisible: boolean;
}

export const LayerCard = ({
  config,
  dataset,
  onClick,
  isVisible,
  onToggleLayerVisible,
}: LayerCardProps) => {
  const { label } = config;
  const { label: datasetLabel } = dataset;

  const handleVisibilityClick = (event: MouseEvent) => {
    event.stopPropagation();
    onToggleLayerVisible(config.id);
  };

  return (
    <Box sx={{ minWidth: 200, cursor: 'pointer' }} onClick={onClick}>
      <Card variant='outlined'>
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              {datasetLabel}
            </Typography>
            <Typography variant='subtitle2' component='div'>
              {label}
            </Typography>
            {isVisible ? (
              <VisibilityIcon onClick={handleVisibilityClick} />
            ) : (
              <VisibilityOffIcon onClick={handleVisibilityClick} />
            )}
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
};

export default LayerCard;
