import { Component, HostListener, OnInit } from '@angular/core';
import { RickmortyapiService } from '../../services/rickmortyapi.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  params = {} as any;
  loading = false;
  finished = false;
  currentPage = 1;
  searchTerm: string = '';

  constructor(
    private rickAndMortySvc: RickmortyapiService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.params.page = 0;
    this.getCharacters();

    this.searchService.searchTerm$.subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.filterCharacters(searchTerm);
    });
  }

  getCharacters() {
    if (this.loading || this.finished) return;

    this.loading = true;
    this.params.page = this.currentPage;

    this.rickAndMortySvc.getCharacters(this.params).subscribe({
      next: (res: any) => {
        if (res.results.length > 0) {
          this.characters.push(...res.results);
          this.currentPage++;
        } else {
          this.finished = true;
        }
        this.loading = false;
        this.filterCharacters(this.searchTerm);
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }

  filterCharacters(searchTerm: string) {
    if (searchTerm) {
      this.filteredCharacters = this.characters.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredCharacters = this.characters;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 1 && !this.loading && !this.finished) {
      this.getCharacters();
    }
  }
}
