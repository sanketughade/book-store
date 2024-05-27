import { Component, OnInit } from '@angular/core';
import { BookService } from '../books/book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data.slice(0, 10);
    });
  }

  searchBooks(query: string) {
    if (!query) {
      return;
    }
    this.bookService.searchBooks(query).subscribe((data: Book[]) => {
      this.books = data;
    });
  }
}
