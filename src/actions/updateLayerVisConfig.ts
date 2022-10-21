import { ActionTypes } from 'actions';
import { BaseAction, LayerVisConfig } from 'model';
import { Dispatch } from 'react';

export type UpdateLayerVisConfigAction = BaseAction<{
  layerId: string;
  layerVisConfig: LayerVisConfig;
}>;

export const updateLayerVisConfig = (
  dispatch: Dispatch<UpdateLayerVisConfigAction>,
  layerId: string,
  layerVisConfig: LayerVisConfig
) => {
  const action: UpdateLayerVisConfigAction = {
    type: ActionTypes.UpdateVisConfig,
    payload: {
      layerId,
      layerVisConfig,
    },
  };
  dispatch(action);
};
