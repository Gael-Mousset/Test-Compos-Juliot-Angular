import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiURL = 'https://anapioficeandfire.com/api';

  constructor(private http: HttpClient) { }

  getBooks(){
    return this.http.get(`${this.apiURL}/books`);
  }

  getBookById(id: string) {
    return this.http.get(`${this.apiURL}/books/${id}`);
  }
  getCharactersByBookId(bookId: string) {
    return this.http.get(`${this.apiURL}/books/${bookId}`).pipe(
      map((book: any) => {
        return book.characters.map((characterUrl: string) => {
          return this.http.get(characterUrl);
        });
      }),
      switchMap((characterRequests: Observable<any>[]) => {
        return forkJoin(characterRequests);
      })
    );
  }
}