import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {
  @Input() itemImage!: string;
  @Input() itemTitle!: string;

  getDetails() {

  }

}
