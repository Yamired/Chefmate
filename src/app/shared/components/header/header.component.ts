import { Component } from '@angular/core';
import { changeTheme } from '@shared/utils/functions/changeTheme';
import { getTheme } from '@shared/utils/functions/getTheme';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

    checked: boolean = getTheme() === "coffee";

    constructor() {}

    changeThemeEvent(e: Event) {
        if ((e.target as HTMLInputElement).checked) {
            changeTheme("coffee");
            return;
        }
        changeTheme("emerald");
    }

}
