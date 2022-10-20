/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import React, { ChangeEvent } from 'react';

interface ColorPickerProps {
  label: string;
  defaultValue: string | null;
  onChange: (hexColor: string) => void;
}

const ColorPicker = ({ onChange, label, defaultValue }: ColorPickerProps) => {
  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const hexColor = event.target.value;
    onChange(hexColor);
  };

  return (
    <>
      <Typography variant='caption' display='block'>
        {label}
      </Typography>
      <input
        defaultValue={defaultValue ?? '#000000'}
        type='color'
        css={{
          width: '100%',
          height: '24px',
          padding: 0,
          overflow: 'hidden',
          borderRadius: '2px',
        }}
        onChange={handleColorChange}
      />
    </>
  );
};

export default ColorPicker;
