import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  searchTerm: string = '';

  constructor(private searchService: SearchService) {}

  onSearchChange() {
    this.searchService.updateSearchTerm(this.searchTerm);
  }
}
