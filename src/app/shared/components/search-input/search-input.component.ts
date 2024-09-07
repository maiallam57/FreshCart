import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  @Output() searchValue: EventEmitter<string> = new EventEmitter()
  inputValue: string = '';

  sendValue(): void {
    this.searchValue.emit(this.inputValue);
  }

}
