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

type BookURLparams = { id: string };

function Book(props: BookProps) {

    const {t, i18n} = useTranslation('common');


    let {id} = useParams<BookURLparams>();


    useEffect(() => {
        props.dispatch(updateTitleAction('bookPage.header'));
        props.dispatch(updateHeaderTextAction('bookPage.header'));
        props.dispatch(searchButtonShowAction(false))

    }, [props.state.appReducer.title,

        props.state.appReducer.headerText])

    return (
        <>
            <BookCardBig
                // @ts-ignore
                id={id}
                //book={book}
            />
        </>
    );

}

export default connectElem(Book);
