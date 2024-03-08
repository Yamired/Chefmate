import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { changeTheme } from '@shared/utils/functions/changeTheme';
import { getTheme } from '@shared/utils/functions/getTheme';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        const savedTheme = getTheme();

        if (savedTheme) {
            changeTheme(savedTheme);
            return;
        }

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            changeTheme("coffee");
            return;
        }

        changeTheme("emerald");
    }

}
