import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent
  ],
  templateUrl: './base.layout.html',
  styleUrl: './base.layout.scss'
})
export class BaseLayout {

}
