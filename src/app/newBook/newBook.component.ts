import { Component, OnInit } from '@angular/core';
import {BookService} from '../books.services';
import {Books} from '../Books';
import { Router } from '@angular/router';
import { appAction } from '../store/app.actions';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


@Component({
  selector: 'app-newBook',
  templateUrl: './newBook.component.html',
  styleUrls: ['./newBook.component.css']
})
export class NewBookComponent implements OnInit{

    constructor( private formBuilder: FormBuilder,
        private store:Store<{ books: any }>,
        private service:BookService){}
    
      books:Books[]=[];

      entity={
        id:'',
        name: '',
        author:'',
        price:  ''
      }

      bookForm = this.formBuilder.group({
        name: '',
        author:'',
        price:  ''
      });
    
      ngOnInit() {}
      onPost(){
         
        this.entity.name=this.bookForm.controls.name.value;
        this.entity.author=this.bookForm.controls.author.value;
        this.entity.price=this.bookForm.controls.price.value;
        this.store.dispatch(appAction.postBookStart({books:this.entity}));
        //this.service.postBook(this.entity);
        this.bookForm.reset();
        //this.store.dispatch(appAction.getAllBooks());
        //console.log("here");
       } 

      Cancel(){
        this.store.dispatch(appAction.getAllBooks());
      }
}