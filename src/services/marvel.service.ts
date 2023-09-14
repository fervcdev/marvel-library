import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Data, Root} from '../models/character';
import { environment } from 'src/environments/environments.dev';
@Injectable({
  providedIn: 'root'
})
export class MarvelService {


  constructor(private http: HttpClient) {}

  searchCharacters(
    name: string,
    limit: number,
    offset: number
  ): Observable<Root> {
    const nameStartsWith = name ? `&nameStartsWith=${name}` : '';
    return this.http
      .get<Root>(
        `${environment.apiUrl}/characters?apikey=${environment.apiKey}&hash=${environment.hash}&ts=${environment.ts}${nameStartsWith}&limit=${limit}&offset=${offset}`
      )
      .pipe(
        (response) => response,
        (error) => error
      );
  }

  getCharacterById(id: number): Observable<Root> {
    return this.http.get<Root>(
      `${environment.apiUrl}/characters/${id}?apikey=${environment.apiKey}&hash=${environment.hash}&ts=${environment.ts}`
    );
  }
}
