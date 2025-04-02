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
  showSearchBar: boolean = false;
  showNavbar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const currentRoute = this.router.url;
        this.showSearchBar =
          currentRoute.includes('home') ||
          currentRoute.includes('episodes') ||
          currentRoute.includes('location');

        this.showNavbar = !(
          currentRoute.includes('intro') ||
          currentRoute.includes('login') ||
          currentRoute.includes('details/:id')
        );
      });
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
    window.location.href = '/';
  }
}
