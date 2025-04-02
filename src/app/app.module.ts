import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './pages/intro/intro.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { RickmortyapiService } from './services/rickmortyapi.service';
import { FormsModule } from '@angular/forms';
import { LocationComponent } from './pages/location/location.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    HomeComponent,
    DetailsComponent,
    EpisodesComponent,
    NavbarComponent,
    LocationComponent,
    LoginComponent,
    ProfileComponent,
    SearchbarComponent,
    SidebarComponent,
  ],
  exports: [RouterModule],
  imports: [BrowserModule, AppRoutingModule, FormsModule, RouterModule],
  providers: [provideHttpClient(), RickmortyapiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
