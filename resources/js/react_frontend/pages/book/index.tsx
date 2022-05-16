import React, {useEffect} from 'react';
import {
    useParams, Redirect
} from "react-router-dom";
import {connectElem} from "../../reducers";
import BookCardBig from "../../components/BookCardBig";
import {searchButtonShowAction, updateHeaderTextAction, updateTitleAction} from "../../actions/app";
import {useTranslation} from "react-i18next";


interface BookProps {
    state: any,
    dispatch: any
}

function Book(props: BookProps) {

    const {t, i18n} = useTranslation('common');
    let params: any = useParams();


    let book: any = props.state.bookReducer.books.find((item: any, index: any) => {
        if (item.id === Number(params.id)) {
            return true;
        }
    });
    useEffect(() => {
        props.dispatch(updateTitleAction('bookPage.header'));
        props.dispatch(updateHeaderTextAction('bookPage.header'));
        props.dispatch(searchButtonShowAction(false))

    }, [props.state.appReducer.title,

        props.state.appReducer.headerText, book])
    if (book === undefined) {

        return <div><h3>{t('bookPage.notFound')}</h3></div>
    } else {
        return (
            <>
                <BookCardBig
                    // @ts-ignore
                    book={book}/>
            </>
        );
    }
}

export default connectElem(Book);