import { RecordModel } from 'pocketbase';

export interface AnotacaoPublica extends RecordModel {
  titulo: string;
  tag: string;
  usuario: string;
  descricao: string;
  created: string;
  updated: string;
}
