import * as d3 from 'd3-color';

const getHexFromRGB = (rgb: number[]): string | null => {
  if (!rgb) {
    return null;
  }
  const [r, g, b] = rgb;
  const color = d3.color(`rgb(${r},${g},${b})`);
  if (!color) {
    return null;
  }
  return color.formatHex();
};

export default getHexFromRGB;
