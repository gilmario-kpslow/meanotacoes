import { RecordModel } from "pocketbase";

export interface ChatOnline extends RecordModel {
    mensagem: string;
    usuario: string;
}