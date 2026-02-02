import { DBConfig } from 'ngx-indexed-db';

export const DB_NAME = 'ponto-database'
export const TABLE_FUNCIONARIO = 'table-funcionario';
export const TABLE_IMAGEM = 'table-imagem';
export const TABLE_PONTO = 'table-ponto';

export class PontoDbConfig implements DBConfig {
  name = DB_NAME;
  version = 1;
  objectStoresMeta = [
    {
    store: TABLE_FUNCIONARIO,
    storeConfig: { keyPath: 'id', autoIncrement: false },
    storeSchema: [
      { name: 'id', keypath: 'id', options: { unique: true } },
      { name: 'nome', keypath: 'nome', options: { unique: false } },
      { name: 'cargo', keypath: 'cargo', options: { unique: false } }
    ]},
    {
      store: TABLE_IMAGEM,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'nome', keypath: 'nome', options: { unique: false } },
        { name: 'imagem', keypath: 'imagem', options: { unique: false } },
        { name: 'infoImagem', keypath: 'infoImagem', options: { unique: false } }
      ]
    },
    {
      store: TABLE_PONTO,
      storeConfig: { keyPath: 'identificador', autoIncrement: true },
      storeSchema: [
        { name: 'identificador', keypath: 'identificador', options: { unique: true } },
        { name: 'dataRegistro', keypath: 'dataRegistro', options: { unique: false } },
        { name: 'hora', keypath: 'hora', options: { unique: false } },
        { name: 'funcionario', keypath: 'funcionario', options: { unique: false } },
        { name: 'filial', keypath: 'filial', options: { unique: false } },
        { name: 'sincronizado', keypath: 'sincronizado', options: { unique: false }, },
        { name: 'situacao', keypath: 'situacao', options: { unique: false }, },
        { name: 'sucesso', keypath: 'sucesso', options: { unique: false }, },
        { name: 'latitude', keypath: 'latitude', options: { unique: false }, },
        { name: 'longitude', keypath: 'longitude', options: { unique: false }, },
        { name: 'fluxo', keypath: 'fluxo', options: { unique: false }, },
        { name: 'precisao', keypath: 'precisao', options: { unique: false }, }
      ]
    }
  ]
}
