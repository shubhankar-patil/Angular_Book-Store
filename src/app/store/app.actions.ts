import { createAction, props } from "@ngrx/store";
import { Books } from "../Books";

export const appAction={

    getAllBooksStart: createAction('[All Books Start]'),
    getAllBooks:createAction('[Get All Books]'),
    getAllBooksCompleted: createAction('[All Books Completed]', props<{ books:any }>()),

    editStart:createAction('[Edit start]', props<{ id:string }>()),
    editBook:createAction('[Edit Book]', props<{ id:string }>()),
    edited:createAction('[Edited True]', props<{ books:any}>()),

    updateBooksStart: createAction('[Updates Books Start]', props<{ books:any }>()),
    updateBook: createAction('[Update New Book]',  props<{ books:any}>()),
    updateBookscompleted: createAction('[updated Books Completed]', props<{ books:any }>()),

    deleteBooksStart: createAction('[Delete Books Start]', props<{ id:string }>()),
    deleteBook:createAction('[Delete Books]', props<{id:string}>()),
    deleteBookscompleted: createAction('[Delete Books Completed]'),

    newBookStart:createAction('[New Books Start]'),
    //newBook: createAction('[Add Book]'),
    newBookscompleted: createAction('[New Books Completed]'),

    postBookStart:createAction('[new Book Start]', props<{ books:any }>()),
    postNewBook: createAction('[Add New Book]',  props<{ books:any}>()),
    postBookCompleted: createAction('[new Books Completed]'),

    showSpinner:createAction('[Show Spinner]'),
    hideSpinner:createAction('[Hide Spinner]'),
}
