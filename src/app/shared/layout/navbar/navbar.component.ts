import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  private readonly _authService = inject(AuthService);
  private readonly _platform = inject(PLATFORM_ID);

  loggedUser: boolean = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this._platform)) {
      this._authService.saveUserData();
      if (this._authService.userData) {
        this.loggedUser = true;
      } else {
        this.loggedUser = false;
      }
    }
  }

}
