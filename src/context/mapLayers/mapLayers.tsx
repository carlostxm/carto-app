import React, { useReducer, createContext } from 'react';
import { INITIAL_STATE } from 'fixtures';
import { BaseAction, LayerVisConfig, MapState } from 'model';

enum MapLayersActions {
  UpdateVisConfig = 'update-layer-vis-config',
}

type UpdateLayerVisConfigAction = BaseAction<{
  layerId: string;
  layerVisConfig: LayerVisConfig;
}>;

interface MapLayersContextType extends MapState {
  updateLayerVisConfig: (
    layerId: string,
    layerVisConfig: LayerVisConfig
  ) => void;
}

const INITIAL_MAP_LAYERS_CONTEXT: MapLayersContextType = {
  layers: {},
  datasets: {},
  layerVisConfigs: {},
  layerOrder: [],
  updateLayerVisConfig: () => {},
};

export const MapLayersContext = createContext<MapLayersContextType>(
  INITIAL_MAP_LAYERS_CONTEXT
);
MapLayersContext.displayName = 'MapLayersContext';

const mapLayersReducer = (state: MapState, action: BaseAction): MapState => {
  if (action.type === MapLayersActions.UpdateVisConfig) {
    const { layerId, layerVisConfig } = (action as UpdateLayerVisConfigAction)
      .payload;
    return {
      ...state,
      layerVisConfigs: {
        ...state.layerVisConfigs,
        [layerId]: layerVisConfig,
      },
    };
  }
  return state;
};

export const MapLayersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(mapLayersReducer, INITIAL_STATE);

  function updateLayerVisConfig(
    layerId: string,
    layerVisConfig: LayerVisConfig
  ) {
    const action: UpdateLayerVisConfigAction = {
      type: MapLayersActions.UpdateVisConfig,
      payload: {
        layerId,
        layerVisConfig,
      },
    };
    dispatch(action);
  }

  return (
    <MapLayersContext.Provider value={{ ...state, updateLayerVisConfig }}>
      {children}
    </MapLayersContext.Provider>
  );
};
