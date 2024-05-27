import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private googleBooksApiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    const url = `${this.googleBooksApiUrl}?q=bestsellers&maxResults=10`;
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        return response.items.map((item: any) => {
          return {
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors
              ? item.volumeInfo.authors.join(', ')
              : 'Unknown Author',
            image: item.volumeInfo.imageLinks
              ? item.volumeInfo.imageLinks.thumbnail
              : 'https://via.placeholder.com/128x192.png?text=No+Image',
          };
        });
      })
    );
  }

  searchBooks(query: string): Observable<Book[]> {
    const url = `${this.googleBooksApiUrl}?q=${query}`;
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        return response.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors
            ? item.volumeInfo.authors.join(', ')
            : 'Unknown Author',
          image: item.volumeInfo.imageLinks
            ? item.volumeInfo.imageLinks.thumbnail
            : 'https://via.placeholder.com/128x192.png?text=No+Image',
        }));
      })
    );
  }

  getBookDetails(id: string): Observable<Book> {
    const url = `${this.googleBooksApiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors
          ? item.volumeInfo.authors.join(', ')
          : 'Unknown Author',
        image: item.volumeInfo.imageLinks
          ? item.volumeInfo.imageLinks.thumbnail
          : 'https://via.placeholder.com/128x192.png?text=No+Image',
        publisher: item.volumeInfo.publisher,
        publishedDate: item.volumeInfo.publishedDate,
      }))
    );
  }

  addBook(book: any): Observable<any> {
    console.log('Adding book', book);
    return of(book);
  }

  updateBook(book: any) {
    console.log('Updating book', book);
    return of(book);
  }
}
