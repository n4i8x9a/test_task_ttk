import React, {useState} from 'react';
import {connectElem} from "../../reducers";
import {useTranslation} from "react-i18next";
import BookCard from "../BookCard";

import SearchContainer from "../SearchContainer";

interface BooksProps {
    state: any,
    dispatch: any,
    books: any,
    loading:boolean
}


function Books(props: BooksProps) {

    const [sortedBooks, setSortedBooks] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    let key = 0;
    let elArr = [];
    //let bookArr = sortedBooks.length === 0 && !isSearch ? props.books : sortedBooks;
    let bookArr=props.books;
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

                <div className={'cont'}>
                    {props.loading ?
                        <div>Loading</div> :
                        <>
                            {elArr}
                        </>
                    }
                </div>


            </div>
        </>
    );

}

export default connectElem(Books);