import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './shared/services/flowbit/flowbit.service';
import { NavbarComponent } from "./shared/layout/navbar/navbar.component";
import { FooterComponent } from './shared/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FreshCart';
  constructor(private _flowbiteService: FlowbiteService) { }

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite(flowbite => {
    });
  }
}
