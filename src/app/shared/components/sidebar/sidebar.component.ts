import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '@routes/auth/login.service';
import { FilePathPipe } from '@shared/pipes/file-path.pipe';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        FilePathPipe,
        RouterModule,
        CommonModule,
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

    protected avatarURL: string | undefined = undefined;

    protected readonly leclercLink: string = "https://www.leclercdrive.fr/";
    protected readonly carrefourLink: string = "https://www.carrefour.fr/services/drive";
    protected readonly interMarcheLink: string = "https://www.intermarche.com/enseigne/services/drive";
    protected readonly uLink: string = "https://www.coursesu.com/drive";
    protected readonly auchanLink: string = "https://www.auchan.fr/";

    constructor() {
        const loginService: LoginService = inject(LoginService);
        const savedAvatar: string = loginService.getAvatar();
        this.avatarURL = savedAvatar !== "" ? savedAvatar : this.avatarURL;
    }

}
