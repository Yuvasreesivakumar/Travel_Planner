import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './serach.component.html',
  styleUrls: ['./serach.component.css']
})
export class SearchComponent {
  SearchQuery: string = '';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.SearchQuery);
  }
}
