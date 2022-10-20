import React from 'react';
import MuiSlider from '@mui/material/Slider';
import { Typography } from '@mui/material';

interface SliderProps {
  label: string;
  value?: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

const Slider = ({ label, value, min, max, onChange }: SliderProps) => {
  const handleChange = (event: Event, value: number | number[]) => {
    onChange(value as number);
  };

  return (
    <>
      <Typography variant='caption' display='block'>
        {label}
      </Typography>
      <MuiSlider
        size='small'
        value={value}
        min={min}
        max={max}
        aria-label={label}
        valueLabelDisplay='auto'
        onChange={handleChange}
      />
    </>
  );
};

export default Slider;
