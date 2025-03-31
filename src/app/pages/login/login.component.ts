import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.username && this.password) {
      const isAuthenticated = this.authService.login(
        this.username,
        this.password
      );

      if (isAuthenticated) {
        // Redireciona para a página de perfil se o login for bem-sucedido
        this.router.navigate(['/home']);
      } else {
        // Exibe uma mensagem de erro se as credenciais forem inválidas
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
      }
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos.';
    }
  }
}
