import {store} from "../../index";

export function initAction(books: any) {


    return {type: "INIT", payload: {books: books}};
}


