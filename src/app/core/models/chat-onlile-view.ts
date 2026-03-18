import { RecordModel } from "pocketbase";

export interface ChatOnlineView {
    id: string;
    mensagem: string;
    usuario: string;
    created: string;
}