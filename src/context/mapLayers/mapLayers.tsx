import React, { useReducer, createContext, Dispatch } from 'react';
import { MapState } from 'model';
import { mapLayersReducer } from 'reducers';

interface MapLayersContextType {
  state: MapState;
  dispatch: Dispatch<any>;
}

const INITIAL_MAP_LAYERS_CONTEXT: MapLayersContextType = {
  state: {
    layerCounter: 0,
    layers: {},
    datasets: {},
    layerVisConfigs: {},
    layerOrder: [],
  },
  dispatch: () => null,
};

export const MapLayersContext = createContext<MapLayersContextType>(
  INITIAL_MAP_LAYERS_CONTEXT
);
MapLayersContext.displayName = 'MapLayersContext';

export const MapLayersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    mapLayersReducer,
    INITIAL_MAP_LAYERS_CONTEXT.state
  );

  return (
    <MapLayersContext.Provider value={{ state, dispatch }}>
      {children}
    </MapLayersContext.Provider>
  );
};
