import {
  ActionTypes,
  AddDatasetAction,
  AddLayerAction,
  UpdateLayerVisConfigAction,
} from 'actions';
import { ToggleLayerVisibilityAction } from 'actions/toggleLayerVisibility';
import { MapState, BaseAction } from 'model';
import getLayerVisConfig from './getLayerVisConfig';

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
        payload: { datasetId, layerType },
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
          [layerUUID]: getLayerVisConfig(layerUUID, layerType),
        },
        layerOrder: [...state.layerOrder, layerUUID],
      };
    case ActionTypes.ToggleLayerVisibility:
      const {
        payload: { layerId: toggleLayerId },
      } = action as ToggleLayerVisibilityAction;
      const toggledVisibility = !state.layerVisConfigs[toggleLayerId].isVisible;
      return {
        ...state,
        layerVisConfigs: {
          ...state.layerVisConfigs,
          [toggleLayerId]: {
            ...state.layerVisConfigs[toggleLayerId],
            isVisible: toggledVisibility,
          },
        },
      };
    default:
      return state;
  }
};

export default mapLayersReducer;
