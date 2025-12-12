import { inject, Injectable } from "@angular/core";
import { PocketbaseService } from "../../core/pocketbase";

@Injectable()
export class LoginService {

    pocketbase: PocketbaseService = inject(PocketbaseService);

    login(req: { username: string, password: string }) {
        return this.pocketbase.login(req);
    }
}