import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiURL = 'https://anapioficeandfire.com/api/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get<any>(this.apiURL);
  }

  getBookById(id: string): Observable<any> {
    return this.http.get<any>(this.apiURL + '/' + id);
  }

  getCharactersByBookId(bookId: string): Observable<any> {
    return this.http.get<any>(this.apiURL + '/' + bookId + '/characters');
  }
}