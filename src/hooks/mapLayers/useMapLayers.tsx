import { MapLayersContext } from 'context';
import { useContext } from 'react';

const useMapLayers = () => {
  const context = useContext(MapLayersContext);
  if (context === undefined) {
    throw new Error('useMapLayers must be used within a <MapLayersManager />');
  }
  return context;
};

export default useMapLayers;
