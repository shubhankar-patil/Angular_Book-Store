import { appAction } from './app.actions';
import { createReducer, on } from '@ngrx/store';
import { Books } from '../Books';

export interface Initial {

  edit: boolean;
  new: boolean;
  delete: boolean;
  spinner: boolean;
  books: Books[];
}

var initial: Initial = {

  edit: false,
  new: false,
  delete: false,
  spinner: false,
  books: []
};

const _bookReducer = createReducer(
  initial,

  on(appAction.getAllBooksStart, (oldvalue, newvalue) => {
    // console.log("reducer");
    // console.log("Old Value",oldvalue);
    // console.log("New Value",newvalue)
    return {
      ...oldvalue,
      edit: false,
      new: false,
      delete: false,
      books: []
    };
  }),

  on(appAction.getAllBooksCompleted, (oldvalue, newvalue) => {
    // console.log("reducer");
    // console.log("Old Value",oldvalue);
    // console.log("New Value",newvalue)
    return {
      ...oldvalue,
      edit: false,
      new: false,
      delete: false,
      books: newvalue.books
    };
  }),

  on(appAction.editStart, (oldvalue, newvalue) => {
    // console.log("reducer ES");
    // console.log("Old Value ES",oldvalue);
    // console.log("New Value ES",newvalue)
    return {
      ...oldvalue,
      edit: true,
      new: false,
      delete: false,
      books: []
    };
  }),

  on(appAction.edited, (oldvalue, newvalue) => {
    // console.log("reducer E");
    // console.log("Old Value E",oldvalue);
    // console.log("New Value E",newvalue)
    return {
      ...oldvalue,
      edit: true,
      new: false,
      delete: false,
      books: newvalue.books
    };
  }),

  on(appAction.updateBooksStart, (oldvalue, newvalue) => {
    // console.log("reducer E");
    // console.log("Old Value E",oldvalue);
    // console.log("New Value E",newvalue)
    return {
      ...oldvalue,
      edit: true,
      new: false,
      delete: false,
      books: newvalue.books
    };
  }),

  on(appAction.deleteBooksStart, (oldvalue, newvalue) => {
    //console.log("delete reducer");
    // console.log("Old Value",oldvalue);
    // console.log("New Value",newvalue)
    return {
      ...oldvalue,
      edit: false,
      new: false,
      delete: true,
      books: []
    };
  }),

  on(appAction.newBookStart, (oldvalue, newvalue) => {
    // console.log("reducer");
    // console.log("new old",oldvalue);
    // console.log("New new",newvalue)
    return {
      ...oldvalue,
      edit: false,
      new: true,
      delete: false,
      books: []
    };
  }),

  on(appAction.showSpinner, (oldvalue, newvalue) => {
    // console.log("reducer");
    // console.log("Old Value",oldvalue);
    // console.log("New Value",newvalue)
    return {
      ...oldvalue,
      spinner: true
    };
  }),

  on(appAction.hideSpinner, (oldvalue, newvalue) => {
    // console.log("reducer");
    // console.log("Old Value",oldvalue);
    // console.log("New Value",newvalue)
    return {
      ...oldvalue,
      spinner: false
    };
  }),
);

export function bookReducer(state: any, action: any) {
  return _bookReducer(state, action);
}

