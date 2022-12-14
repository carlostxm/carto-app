import axios from 'axios';
import { CARTO_BASE_URL } from 'config';
import { Dataset, CartoMapType } from 'model';

interface TableResponse {
  size: number;
  rows: number;
  schema: Array<{ name: string; type: string }>;
}

const config = {
  headers: { Authorization: `Bearer ${process.env.REACT_APP_CARTO_TOKEN}` },
};

const defaultParams = {
  connection: 'carto_dw',
};

export default function fetchDatasource(
  name: string,
  mapType: CartoMapType
): Promise<Dataset> {
  return axios
    .get<TableResponse>(CARTO_BASE_URL, {
      ...config,
      params: {
        ...defaultParams,
        name,
      },
    })
    .then((response) => {
      const {
        data: { rows, size, schema },
      } = response;
      return {
        connection: defaultParams.connection,
        id: name,
        label: name,
        data: mapType === 'tileset' ? name : `select * from ${name}`,
        rows,
        size,
        schema,
        type: mapType,
      };
    });
}
