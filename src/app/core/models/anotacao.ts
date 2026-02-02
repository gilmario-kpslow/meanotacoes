import { RecordModel } from 'pocketbase';

export interface Anotacao extends RecordModel {
  titulo: string;
  tag: string;
  usuario: string;
  descricao: string;
  public: boolean;
  created: string;
  updated: string;
}
