import * as d3 from 'd3-color';

const getRGBFromHex = (hex: string): number[] => {
  const color = d3.color(hex);
  if (!color) {
    return [];
  }
  const rgb = color.rgb();
  return [rgb.r, rgb.g, rgb.b];
};

export default getRGBFromHex;
