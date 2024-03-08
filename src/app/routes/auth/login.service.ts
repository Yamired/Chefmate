import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Collections } from '@shared/utils/types/types';
import PocketBase, { AdminAuthResponse, AuthModel, RecordAuthResponse, RecordModel } from 'pocketbase';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private _pb: PocketBase;

    constructor(private readonly _router: Router,) {
        this._pb = new PocketBase(environment.pocketbaseURL);
    }

    async login(email: string, password: string) {
        this._pb.admins.authWithPassword(email, password)
            .then((authData: AdminAuthResponse) => {
                if(authData) {
                    this._router.navigateByUrl("home");
                }
            })
            .catch(() => {
                this._pb.collection(Collections.Users).authWithPassword(email, password)
                    .then((authData: RecordAuthResponse<RecordModel>) => {
                        if(authData) {
                            this._router.navigateByUrl("home");
                        }
                    })
                    .catch((err: Error) => {
                        console.error(err);
                    });
            });
    }

    logout() {
        this._pb.authStore.clear();
        this._router.navigateByUrl("login");
    }

    isAuthenticated(): boolean {
        return this._pb.authStore.isValid;
    }

    getAvatar(): string {
        const user: RecordModel = this._pb.authStore.model as RecordModel;
        return this._pb.files.getUrl(user, user['Avatar'], {'thumb': '80x80'});
    }

}
