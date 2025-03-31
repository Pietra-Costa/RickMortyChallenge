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

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    HomeComponent,
    DetailsComponent,
    EpisodesComponent,
    NavbarComponent,
    LocationComponent,
  ],
  exports: [RouterModule],
  imports: [BrowserModule, AppRoutingModule, FormsModule, RouterModule],
  providers: [provideHttpClient(), RickmortyapiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
