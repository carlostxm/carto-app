import { PointLayerVisConfig } from 'model';
import { ColorPicker, Slider } from 'components';
import { getRGBFromHex, getHexFromRGB } from 'translators';

interface PointLayerStylePanelProps {
  layerVisConfig: PointLayerVisConfig;
  onStyleChange: (layerVisConfig: PointLayerVisConfig) => void;
}

const PointLayerStylePanel = ({
  layerVisConfig,
  onStyleChange,
}: PointLayerStylePanelProps) => {
  const { outlineColor, fillColor, radius, outlineSize } = layerVisConfig;

  const handleFieldColorChange =
    (fieldName: keyof PointLayerVisConfig) => (color: string) => {
      onStyleChange({
        ...layerVisConfig,
        [fieldName]: getRGBFromHex(color),
      });
    };

  const handleSliderChange =
    (fieldName: keyof PointLayerVisConfig) => (value: number) => {
      onStyleChange({
        ...layerVisConfig,
        [fieldName]: value,
      });
    };

  return (
    <>
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
    </>
  );
};

export default PointLayerStylePanel;
