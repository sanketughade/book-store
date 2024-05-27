import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  constructor(private bookService: BookService, private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.bookService.addBook(form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
