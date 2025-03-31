import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RickmortyapiService {
  constructor(private http: HttpClient) {}

  getCharacters(params: any) {
    return this.http.get(environment.baseUrl + environment.character, {
      params,
    });
  }

  getEpisodes(params: any) {
    return this.http.get(environment.baseUrl + environment.episodes, {
      params,
    });
  }

  getLocation(params: any) {
    return this.http.get(environment.baseUrl + environment.location, {
      params,
    });
  }

  getCharactersById(id: string) {
    return this.http.get(environment.baseUrl + environment.character + id);
  }
}
