# CARTO application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Model

```
export interface MapState {
  datasets: Record<string, Dataset>;
  layers: Record<string, LayerConfig>;
  layerVisConfigs: Record<string, LayerVisConfig>;
  layerOrder: string[];
  layerCounter: number;
}
```

| Field name      | Type                           | Description                                                                                           |
| --------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| datasets        | Record<string, Dataset>        | Indexed by dataset id storing data relative to the dataset                                            |
| layers          | Record<string, LayerConfig>    | Indexed by layer unique id, basic layer configuration                                                 |
| layerVisConfigs | Record<string, LayerVisConfig> | Indexed by layer unique id, visualization configuration as fill color, point radius, visibility, etc. |
| layerOrder      | string []                      | Layers rendering order where the first position is the layer rendered on top                          |
| layerCounter    | number                         | Count of the layers created used to create a basic UUID generation function                           |

`datasets`, `layers`, and `layerVisConfigs` has been modeled as an object indexed by a dataset or layer `id`. The other options analyzed are using an `Array` or a `Map`. Finally, it has been chosen to use a plain object because is serializable and optimizes the read/remove operations. `Map` was discarded because in case of implementing persistence, it makes harder the serialization in the local storage or an external service.

## State Management

There are state dependencies between components that makes needed a global state management solution.

This application uses **React Context** because the overhead added by the **Redux** boilerplate is too much for this small application. The tradeoff is the performance penalty added by **React Context**, although is not appreciated in this application, it should be considered for enterprise-grade applications where **Redux** is more suitable.

Although **React Context** is used, the architecture has been defined similarly to the **Redux** architecture, using `actions` and `reducers`, which would simplify the migration in the unlikely hypothetic case that this application is migrated in the future.

### useMapLayers

The current `state` and `action`'s dispatcher are accessible by a dedicated hook called `useMapLayers`.

### Reducer

All the state management logic in the `mapLayersReducer` allows being reused by the different components, having specialized rendering components.

### Actions

All state changes are driven by actions that are thrown from the components. Action types are defined in the `actions/actionTypes.ts` file.

## Asynchronous requests

`axios` is used to request data to the API as is reduces the boilerplate code compared to the native `window.fetch`. Not implemented for this example but to considered in a real application is the use of `axios` source tokens to cancel on-going requests.

API is accesed from the actions, abstracting the components from this matter.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it..
