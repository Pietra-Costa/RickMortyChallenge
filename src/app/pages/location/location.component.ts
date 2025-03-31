import { Component, HostListener, OnInit } from '@angular/core';
import { RickmortyapiService } from '../../services/rickmortyapi.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  locations: any[] = [];
  filteredLocations: any[] = [];
  params = { page: 1, name: '' };
  loading = false;
  finished = false;
  currentPage = 1;
  searchTerm: string = '';

  constructor(
    private rickAndMortySvc: RickmortyapiService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.getLocation();

    this.searchService.searchTerm$.subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.filterLocation(searchTerm);
    });
  }

  getLocation() {
    if (this.loading || this.finished) return;

    this.loading = true;
    this.params.page = this.currentPage;

    this.rickAndMortySvc.getLocation(this.params).subscribe({
      next: (res: any) => {
        if (res.results.length > 0) {
          this.locations.push(...res.results);
          this.currentPage++;
        } else {
          this.finished = true;
        }
        this.loading = false;
        this.filterLocation(this.searchTerm);
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }

  filterLocation(searchTerm: string) {
    if (searchTerm) {
      this.filteredLocations = this.locations.filter((location) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredLocations = this.locations;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 1 && !this.loading && !this.finished) {
      this.getLocation();
    }
  }
}
