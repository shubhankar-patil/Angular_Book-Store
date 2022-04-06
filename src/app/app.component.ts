import { Component, OnInit } from '@angular/core';
import { BookService } from './books.services';
import { Books } from './Books';
import { Router } from '@angular/router';
import { appAction } from './store/app.actions';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  constructor(private booksService: BookService,
    private store: Store<{ books: any }>,
    private spinner: NgxSpinnerService) { }

  books: Books[] = [];
  edit: boolean = false;
  new: boolean = false;
  delete: boolean = false;

  displayedColumns: string[] = ['id', 'name', 'author', 'price', 'action'];
  check: boolean = false;
  
  ngOnInit() {

    this.store.dispatch(appAction.getAllBooksStart());

    this.store.select('books').subscribe(data => {
      console.log('this is new', data);
      this.edit = data.edit;
      this.new = data.new;
      this.delete = data.delete;

      if (this.new == false && this.edit == false && this.delete == false) {

        this.books = data.books;
      }

      if (data.spinner) {
        this.spinner.show(undefined, { fullScreen: false });
      }
      else {
        this.spinner.hide();
      }
    })
  }

  editBook(row: Books) {
    console.log("Edit"); 
    this.store.dispatch(appAction.editStart({ id: row.id }));
  }

  deleteBook(row: Books) {
    console.log("Delete");
    //this.booksService.deleteBook(book.id);
    this.store.dispatch(appAction.deleteBooksStart({ id: row.id }));
  }

  newBook() {
    this.store.dispatch(appAction.newBookStart());
  }
}

