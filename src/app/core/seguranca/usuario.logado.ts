import { AuthRecord } from 'pocketbase';

export interface UsuarioLogado {
  record: Usuario | AuthRecord;
  token: string;
}

interface Usuario {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: Date;
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  updated: Date;
  verified: boolean;
}
