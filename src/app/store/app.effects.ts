import { Injectable } from '@angular/core';
import { BookService } from '../books.services';
import { appAction } from './app.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { EMPTY, pipe } from 'rxjs';
import { Books } from '../Books';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable()
export class bookEffects {
    constructor(private action$: Actions, private bookService: BookService) { }

    allBookStart$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.getAllBooksStart),
            //tap(data=>(console.log("insideEffects", data))),
            map((data) => data),
            concatMap((data) => [appAction.showSpinner(), appAction.getAllBooks()])
        )
    );

    allBooks$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.getAllBooks),
            //tap(data => (console.log("insideEffects getall books", data))),
            exhaustMap(() => this.bookService.getBooks().pipe(
                map((books: any) => appAction.getAllBooksCompleted({ books: books }))
            )))
    );

    allBookCompleted$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.getAllBooksCompleted),
            //tap(data=>(console.log("insideEffects completed", data))),
            map((data) => data),
            concatMap((data) => [appAction.hideSpinner()])
        )
    );


    loadBookStart$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.editStart),
            //tap(data=>(console.log("insideEffects edit start", data))),
            map((data) => data.id),
            concatMap((data) => [appAction.showSpinner(), appAction.editBook({ id: data })])
        )
    );

    loadBook$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.editBook),
            //tap(data => (console.log("insideEffects edit", data))),
            exhaustMap((data) => this.bookService.getBooksById(data.id).pipe(
                map((books: any) => appAction.edited({ books }))
            )))
    );

    loadBookCompletedt$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.edited),
            //tap(data=>(console.log("insideEffects edit completed", data))),
            map((data) => data),
            concatMap((data) => [appAction.hideSpinner()])
        )
    );

    updateBookStart$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.updateBooksStart),
            //tap(data=>(console.log("insideEffects updateBookStart", data))),
            map((data) => data),
            concatMap((data) => [appAction.showSpinner(), appAction.updateBook({ books: data.books })])
        )
    );

    updateBook$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.updateBook),
            //tap(data=>(console.log("insideEffects updateBook", data))),
            concatMap((data) => this.bookService.updateBook(data.books).pipe(
                map((books: any) => appAction.updateBookscompleted({ books: data.books }))
            )))
    );

    updateBookCompleted$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.updateBookscompleted),
            //tap(data=>(console.log("insideEffects updateBookCompleted", data))),
            map((data) => data),
            concatMap((data) => [appAction.hideSpinner(), appAction.getAllBooksStart()])
        )
    );

    deleteBookStart$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.deleteBooksStart),
            //tap(data=>(console.log("insideEffects", data))),
            map((data) => data),
            concatMap((data) => [appAction.showSpinner(), appAction.deleteBook({ id: data.id })])
        )
    );

    deleteBook$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.deleteBook),
            //tap(data => (console.log("insideEffects", data))),
            concatMap((data) => this.bookService.deleteBook(data.id).pipe(
                map((books: any) => appAction.getAllBooks())
            )))
    );

    deleteBookCompleted$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.deleteBookscompleted),
            //tap(data=>(console.log("insideEffects", data))),
            map((data) => data),
            concatMap((data) => [appAction.hideSpinner(), appAction.getAllBooksStart()])
        )
    );

    newBookStart$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.newBookStart),
            //tap(data=>(console.log("insideEffects", data))),
            map((data) => data),
            concatMap((data) => [appAction.showSpinner(), appAction.newBookscompleted()])
        )
    );

    newBookCompleted$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.newBookscompleted),
            //tap(data=>(console.log("insideEffects", data))),
            map((data) => data),
            concatMap((data) => [appAction.hideSpinner()])
        )
    );


    postBookStart = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.postBookStart),
            //tap(data=>(console.log("insideEffects", data))),
            map((data) => data),
            concatMap((data) => [appAction.showSpinner(), appAction.postNewBook({ books: data.books })])
        )
    );

    postBook$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.postNewBook),
            //tap(data=>(console.log("insideEffects", data))),
            concatMap((data) => this.bookService.postBook(data.books).pipe(
                map((books: any) => appAction.postBookCompleted())
            )))
    );

    postBookCompleted$ = createEffect(() =>
        this.action$.pipe(
            ofType(appAction.postBookCompleted),
            //tap(data=>(console.log("insideEffects", data))),
            map((data) => data),
            concatMap((data) => [appAction.hideSpinner(), appAction.getAllBooksStart()])
        )
    );
}


