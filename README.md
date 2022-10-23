# CARTO application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project structure

### Folders

| Folder      | Description                                                                 |
| ----------- | --------------------------------------------------------------------------- |
| actions     | Action creators and actionType definition                                   |
| api         | Functions for HTTP requests                                                 |
| components  | UI components                                                               |
| config      | Static configuration modules                                                |
| context     | Context definitions i.e. `mapLayers` that contains the app global state     |
| fixtures    | Static mocked data                                                          |
| hooks       | Common hooks reusable by the components                                     |
| reducers    | Global state's reducer functions                                            |
| services    | Utility functions                                                           |
| translators | Utility function specialized in converting objects from one type to another |

### Main Components

| Folder           | Description                                                                             |
| ---------------- | --------------------------------------------------------------------------------------- |
| index.tsx        | Attaches React root node to the DOM and add some global wrappers                        |
| App.tsx          | Application main component with the initialization requests                             |
| Layout.tsx       | Layout component composed of a navigation side bar and the app content                  |
| SidePanel.tsx    | Control side panel                                                                      |
| LayersPanel.tsx  | Display the layers shown in the map in renderization order                              |
| MapContainer.tsx | Responsible of showing the base map and creating the layers objects passed to `deck.gl` |

## Functionality

This application renders three layers on top of a `maplibre` base map.

To simplify the functionality, the datasets are predefined and requests are launched when the application is initialized. When the dataset info is received by the asynchronous request a layer is created.

The datasets preconfigured are:

- `carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup`
- `carto-demo-data.demo_tables.retail_stores`
- `carto-demo-data.demo_tables.airports`

There are two types of layers:

- query: Render the default `CartoLayer`'s point layer.
- tilesets: Render a tileset layer.

The following `point` layer's parameters can be configured:

- Fill color
- Outline color
- Outline size
- Radius

Note: `tileset` layers cannot be customized as is out of the scope of this test application.

## State

### State Model

The state model has been defined with the following structure:

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

`datasets`, `layers`, and `layerVisConfigs` has been modeled as an object indexed by a dataset or layer `id`. The other options analyzed were using an `Array` or a `Map`. Finally, data is stored in plain objects because is serializable and optimizes the read/remove operations. `Map` was discarded because in case of implementing persistence, it makes harder the serialization in the local storage or an external service.

### State Management

There are state dependencies between components that make necesssary a global state management solution.

This application uses **React Context** because the overhead added by the **Redux** boilerplate is too much for a small application. The tradeoff is the performance penalty added by **React Context**, although is not appreciated in this application, it should be considered for enterprise-grade applications where **Redux** is more suitable.

Although **React Context** is used, the architecture has been defined similarly to the **Redux** architecture, using `actions` and `reducers`, which would simplify the migration in the case that is required.

#### useMapLayers

The current `state` and `action`'s dispatcher are accessible by a dedicated hook called `useMapLayers`.

#### Reducer

All the state management logic in the `mapLayersReducer` allows being reused by the different components, having specialized rendering components.

#### Actions

All state changes are driven by actions that are thrown from the components. Action types are defined in the `actions/actionTypes.ts` file.

## Asynchronous Requests

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
