import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Books } from './Books';
import { error } from '@angular/compiler/src/util';

@Injectable({ providedIn: 'root' })
export class BookService{
    errorMessage:string='';
    error:any;
    constructor(private http: HttpClient){}

    booksUrl:string= 'https://60cafc1f21337e0017e43751.mockapi.io/books/books';
    
    getBooks():Observable<Books[]> {
        return this.http.get<any>(this.booksUrl);
    }

    getBooksById(id:string):Observable<Books[]> {
        return this.http.get<Books[]>(this.booksUrl+'/'+id);
    }

    deleteBook(id:string){
        return this.http.delete(this.booksUrl+'/'+id);
    }

    updateBook(books:Books){
        console.log(books.id);
        return this.http.put<Books[]>(this.booksUrl+'/'+books.id, books);
    }
       
    postBook(books:Books){
        console.log(books);
        return this.http.post<any>(this.booksUrl, books);
    }
}