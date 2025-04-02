import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RickmortyapiService {
  constructor(private http: HttpClient) {}

  getCharacters(params: { page?: number; name?: string } = {}) {
    let httpParams = new HttpParams();

    if (params.page) {
      httpParams = httpParams.append('page', params.page.toString());
    }

    if (params.name) {
      httpParams = httpParams.append('name', params.name);
    }

    return this.http.get(`${environment.baseUrl}${environment.character}`, {
      params: httpParams,
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
