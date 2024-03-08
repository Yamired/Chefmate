import { Component } from '@angular/core';
import { FilePathPipe } from '@shared/pipes/file-path.pipe';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        FilePathPipe
    ],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss'
})
export class HomePage {

}
