import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './pages/intro/intro.component';
import { HomeComponent } from './pages/home/home.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { LocationComponent } from './pages/location/location.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  { path: '', redirectTo: '/intro', pathMatch: 'full' },
  { path: 'intro', component: IntroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'episodes', component: EpisodesComponent },
  { path: 'location', component: LocationComponent },
  { path: 'details/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
