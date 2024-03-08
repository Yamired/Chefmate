import { Component } from '@angular/core';
import { LoginService } from '@routes/auth/login.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [],
    templateUrl: './profile.page.html',
    styleUrl: './profile.page.scss'
})
export class ProfilePage {

    constructor(
        private readonly _loginService: LoginService,
    ) {}

    logout() {
        this._loginService.logout();
    }

}
