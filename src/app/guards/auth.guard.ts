// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.services';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      take(1), // Fazemos o "take(1)" para pegar o valor uma única vez
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true; // Permite acesso à página
        } else {
          this.router.navigate(['/login']); // Redireciona para a página de login
          return false; // Bloqueia o acesso à página
        }
      })
    );
  }
}
