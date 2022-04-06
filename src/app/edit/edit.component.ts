import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Books } from '../Books';
import {BookService} from '../books.services';
import { appAction } from '../store/app.actions';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  constructor( private formBuilder: FormBuilder,
    private store:Store<{ books: any }>,
    private service:BookService){}

  
  bookForm = this.formBuilder.group({
    id: new FormControl({value: '', disabled: true}),
    name: '',
    author: new FormControl({value: '', disabled: true}),
    price: new FormControl({value: '', disabled: true}),
  });

  change:boolean=true;

  books:any;
  entity={
    id:'',
    name: '',
    author:'',
    price:  ''
  }


  ngOnInit() {
     this.store.select('books').subscribe(data =>{
      //console.log('this is edit', data);
      this.books=data.books;
      
        this.bookForm.controls.id.setValue(this.books?.id);
        this.bookForm.controls.name.setValue(this.books?.name);
        this.bookForm.controls.author.setValue(this.books?.author);
        this.bookForm.controls.price.setValue(this.books?.price);
  
      //console.log('this is book', this.books.id);
      //console.log(this.bookForm.controls.id.value);
    })
  }

  onUpdate(){
    this.entity.id=this.bookForm.controls.id.value;
    this.entity.name=this.bookForm.controls.name.value;
    this.entity.author=this.bookForm.controls.author.value;
    this.entity.price=this.bookForm.controls.price.value;
    //this.service.updateBook(this.entity);
    this.store.dispatch(appAction.updateBooksStart({books:this.entity}))
   }


   Cancel(){
     this.store.dispatch(appAction.getAllBooks());
   }
}
