import React, {useState} from 'react';
import {connectElem} from "../../reducers";
import {useTranslation} from "react-i18next";
import BookCard from "../BookCard";



interface BooksProps {
    state: any,
    dispatch: any,
    books: any,
    loading:boolean
}


function Books(props: BooksProps) {


    let key = 0;
    let elArr = [];

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
