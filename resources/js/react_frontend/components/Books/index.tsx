import React, {useState} from 'react';
import {connectElem} from "../../reducers";
import {useTranslation} from "react-i18next";
import BookCard from "../BookCard";

import SearchContainer from "../SearchContainer";

interface BooksProps {
    state: any,
    dispatch: any,
    books: any
}


function Books(props: BooksProps) {

    const [sortedBooks, setSortedBooks] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    let key = 0;
    let elArr = [];
    let bookArr = sortedBooks.length === 0 && !isSearch ? props.books : sortedBooks;

    for (let book of bookArr) {
        elArr.push(
            // @ts-ignore
            <BookCard key={key} book={book}/>
        );
        key++;
    }
    return (
        <>
            <div className={'main_page'}>
                <SearchContainer
                    //@ts-ignore
                    books={props.books} setBooks={(value: any, isSearch: boolean) => {

                    setSortedBooks(value);
                    setIsSearch(isSearch);

                }}/>
                <div className={'cont'}>
                    {elArr}

                </div>


            </div>
        </>
    );

}

export default connectElem(Books);