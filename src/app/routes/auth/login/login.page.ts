import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
    ],
    templateUrl: './login.page.html',
    styleUrl: './login.page.scss'
})
export class LoginPage {

    private _passwordRegexPattern: RegExp = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$');
    protected loginForm: FormGroup;

    // Guide user pour mot de passe
    protected passwordRegexPatternForNumber: RegExp = new RegExp('^(?=.*?[0-9])');
    protected passwordRegexPatternForUppercase: RegExp = new RegExp('^(?=.*?[A-Z])');
    protected passwordRegexPatternForLowercase: RegExp = new RegExp('^(?=.*?[a-z])');
    protected passwordRegexPatternForSpecial: RegExp = new RegExp('^(?=.*?[#?!@$%^&*-])');
    protected passwordRegexPatternForSize: RegExp = new RegExp('^.{10,}$');

    constructor(
        private readonly _loginService: LoginService,
    ) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.pattern(this._passwordRegexPattern)
            ]),
        });
    }

    authenticate() {
        this._loginService.login(this.email?.value, this.password?.value);
    }

    get email() { return this.loginForm.get('email'); }
    get password() { return this.loginForm.get('password'); }

}
