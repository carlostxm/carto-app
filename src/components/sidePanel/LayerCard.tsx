import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Dataset, LayerConfig } from 'model';

interface LayerCardProps {
  onClick: () => void;
  config: LayerConfig;
  dataset: Dataset;
}

export const LayerCard = ({ config, dataset, onClick }: LayerCardProps) => {
  const { label } = config;
  const { label: datasetLabel } = dataset;
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
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
};

export default LayerCard;
