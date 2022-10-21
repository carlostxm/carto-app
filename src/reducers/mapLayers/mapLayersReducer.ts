import {
  ActionTypes,
  AddDatasetAction,
  AddLayerAction,
  UpdateLayerVisConfigAction,
} from 'actions';
import { MapState, BaseAction } from 'model';

const mapLayersReducer = (state: MapState, action: BaseAction): MapState => {
  switch (action.type) {
    case ActionTypes.UpdateVisConfig:
      const {
        payload: { layerId, layerVisConfig },
      } = action as UpdateLayerVisConfigAction;
      return {
        ...state,
        layerVisConfigs: {
          ...state.layerVisConfigs,
          [layerId]: layerVisConfig,
        },
      };
    case ActionTypes.AddDataset:
      const {
        payload: { dataset },
      } = action as AddDatasetAction;
      return {
        ...state,
        datasets: {
          ...state.datasets,
          [dataset.id]: dataset,
        },
      };
    case ActionTypes.AddLayer:
      const {
        payload: { datasetId },
      } = action as AddLayerAction;
      const nextLayerCounter = state.layerCounter + 1;
      const layerUUID = `${datasetId}--${nextLayerCounter}`;
      // TODO Check that layer is not added before (currently not possible with the current UUID generation system)
      return {
        ...state,
        layerCounter: nextLayerCounter,
        layers: {
          ...state.layers,
          [layerUUID]: {
            datasetId,
            id: layerUUID,
            label: `Layer ${nextLayerCounter}`,
          },
        },
        layerVisConfigs: {
          ...state.layerVisConfigs,
          [layerUUID]: {
            type: 'point',
            id: layerUUID,
            outlineColor: [0, 0, 0, 200],
            outlineSize: 1,
            fillColor: [238, 77, 90],
            isVisible: true,
            radius: 3,
          },
        },
        layerOrder: [...state.layerOrder, layerUUID],
      };

    default:
      return state;
  }
};

export default mapLayersReducer;
