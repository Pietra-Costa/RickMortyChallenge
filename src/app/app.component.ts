import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SearchService } from './services/search.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  searchTerm: string = '';
  showSearchBar: boolean = false;
  showNavbar: boolean = true;
  constructor(private router: Router, private searchService: SearchService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const currentRoute = this.router.url;
        this.showSearchBar =
          currentRoute.includes('home') ||
          currentRoute.includes('episodes') ||
          currentRoute.includes('location');
        this.searchService.updateSearchTerm(this.searchTerm);
      });
    this.searchService.searchTerm$.subscribe((term) => {
      this.searchTerm = term;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const currentRoute = this.router.url;

        this.showNavbar = !(
          currentRoute.includes('intro') ||
          currentRoute.includes('login') ||
          currentRoute.includes('details/:id')
        );
      });
  }

  onSearchChange() {
    this.searchService.updateSearchTerm(this.searchTerm);
  }

  username: string | null = localStorage.getItem('user');
  get isLoggedIn(): boolean {
    return !!this.username;
  }
  logout() {
    localStorage.removeItem('user');
    window.location.href = '/';
  }
}
