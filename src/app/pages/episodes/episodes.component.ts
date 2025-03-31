import { Component, HostListener, OnInit } from '@angular/core';
import { RickmortyapiService } from '../../services/rickmortyapi.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css'],
})
export class EpisodesComponent implements OnInit {
  episodes: any[] = [];
  filteredEpisodes: any[] = [];
  params = { page: 1, name: '' };
  loading = false;
  finished = false;
  currentPage = 1;
  searchTerm: string = ''; // Mantendo o termo de pesquisa localmente

  constructor(
    private rickAndMortySvc: RickmortyapiService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.getEpisodes();

    this.searchService.searchTerm$.subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.filterEpisodes(searchTerm);
    });
  }

  getEpisodes() {
    if (this.loading || this.finished) return;

    this.loading = true;
    this.params.page = this.currentPage;

    this.rickAndMortySvc.getEpisodes(this.params).subscribe({
      next: (res: any) => {
        if (res.results.length > 0) {
          this.episodes.push(...res.results);
          this.currentPage++;
        } else {
          this.finished = true;
        }
        this.loading = false;
        this.filterEpisodes(this.searchTerm); // Reaplica o filtro após carregar os dados
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }

  filterEpisodes(searchTerm: string) {
    if (searchTerm) {
      this.filteredEpisodes = this.episodes.filter((episode) =>
        episode.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredEpisodes = this.episodes;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 1 && !this.loading && !this.finished) {
      this.getEpisodes();
    }
  }
}
