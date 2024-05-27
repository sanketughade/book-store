import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  bookForm: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const bookId = params.get('id');
      if (bookId) {
        this.bookService.getBookDetails(bookId).subscribe((book: Book) => {
          this.bookForm = this.fb.group({
            title: [book.title, Validators.required],
            author: [book.author, Validators.required],
            image: [book.image],
            description: [book.description],
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm && this.bookForm.valid) {
      this.bookService.updateBook(this.bookForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
