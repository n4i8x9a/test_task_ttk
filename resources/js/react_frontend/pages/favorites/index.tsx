import React, {useEffect} from 'react';
import {connectElem} from "../../reducers";
import {searchButtonShowAction, updateHeaderTextAction, updateTitleAction} from "../../actions/app";
import {useTranslation} from "react-i18next";
import Books from "../../components/Books";

interface FavoritesProps {
    state: any,
    dispatch: any
}

function Favorites(props: FavoritesProps) {
    const {t, i18n} = useTranslation('common');

    useEffect(() => {
        props.dispatch(updateTitleAction('favoritesPage.header'));
        props.dispatch(updateHeaderTextAction('favoritesPage.header'));
        if (props.state.appReducer.isMobile) {
            props.dispatch(searchButtonShowAction(true));
        }
    }, [props.state.appReducer.title, props.state.appReducer.headerText])

    let booksArr = [];

    for (let book of props.state.bookReducer.books) {
        if (book.favorites) {
            booksArr.push(
                book
            );

        }
    }

    return (
        <Books
            //@ts-ignore
            books={booksArr}
        />
    );

}

export default connectElem(Favorites);