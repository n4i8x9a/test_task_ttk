import {store} from "../../index";

export function initAction(books: any) {
    let favorites: any = localStorage.getItem('favorites');
    let rating: any = localStorage.getItem('rating');
    if (favorites == null) {
        favorites = [];
    } else {
        favorites = JSON.parse(favorites)
    }
    if (rating == null) {
        rating = [];
        for (let book of books) {
            book = {...book, rating: 0};
            rating.push({id: book.id, rating: 0});
        }
    } else {
        rating = JSON.parse(rating)
    }
    let i = 0;
    while (i < rating.length) {
        if (books.find((item: any, index: any) => {
            if (item.id === rating[i].id) {
                return true;
            }
        }) !== undefined) {
            i++;
        } else {
            rating.splice(i, 1)
        }
    }
    i = 0;
    while (i < favorites.length) {
        if (books.find((item: any, index: any) => {
            if (item.id === favorites[i]) {
                return true;
            }
        }) !== undefined) {
            i++;
        } else {
            favorites.splice(i, 1)
        }
    }
    for (i = 0; i < books.length; ++i) {
        let r = rating.find((item: any, index: any) => {
            if (item.id === books[i].id) {
                return true;
            }
        });
        if (r !== undefined) {
            books[i] = {...books[i], rating: r.rating};
        } else {
            books[i] = {...books[i], rating: 0};
            rating.push({id: books[i].id, rating: 0});
        }

        if (favorites.find((item: any, index: any) => {
            if (item === books[i].id) {
                return true;
            }
        }) !== undefined) {
            books[i] = {...books[i], favorites: true};
        } else {
            books[i] = {...books[i], favorites: false};
        }
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('rating', JSON.stringify(rating));

    return {type: "INIT", payload: {books: books}};
}


export function ratingAction(bookID: number, rating: number) {
    let r: any = localStorage.getItem('rating');
    r = JSON.parse(r);

    let rIndex = r.findIndex((item: any, index: any) => {
        if (item.id === bookID) {
            return true;
        }
    })
    r[rIndex].rating += rating;

    let books = store.getState().bookReducer.books;

    rIndex = books.findIndex((item: any, index: any) => {
        if (item.id === bookID) {
            return true;
        }
    })
    books[rIndex].rating += rating;
    localStorage.setItem('rating', JSON.stringify(r));

    return {type: "RATING", payload: {books: books}};

}

export function favoriteAction(bookID: number, favorite: boolean) {
    let books = store.getState().bookReducer.books;
    let FAV: any = localStorage.getItem('favorites');
    FAV = JSON.parse(FAV);
    let ind;

    if (favorite) {
        ind = FAV.findIndex((item: any, index: any) => {
            if (item === bookID) {
                return true;
            }
        })
        if (ind === -1) {
            FAV.push(bookID);
        }

        ind = books.findIndex((item: any, index: any) => {
            if (item.id === bookID) {
                return true;
            }
        })
        books[ind].favorites = true;
    } else {
        ind = FAV.findIndex((item: any, index: any) => {
            if (item === bookID) {
                return true;
            }
        })
        if (ind > -1) {
            FAV.splice(ind, 1);
        }
        ind = books.findIndex((item: any, index: any) => {
            if (item.id === bookID) {
                return true;
            }
        })
        books[ind].favorites = false;
    }

    localStorage.setItem('favorites', JSON.stringify(FAV));

    return {type: "FAVORITE", payload: {books: books}};
}