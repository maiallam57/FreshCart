import { AfterContentChecked, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../core/environment/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterContentChecked {

  private readonly _authService = inject(AuthService);
  private readonly _platform = inject(PLATFORM_ID);

  loggedUser: boolean = false;

  ngAfterContentChecked() {
    if (isPlatformBrowser(this._platform)) {
      this._authService.saveUserData();
      if (this._authService.userData) {
        this.loggedUser = true;
      } else {
        this.loggedUser = false;
      }
    }
  }

  signout() {
    this._authService.signout();
  }

}
