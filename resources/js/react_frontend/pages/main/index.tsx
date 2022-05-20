import React, {useEffect, useState} from 'react';
import {connectElem} from "../../reducers";
import {searchButtonShowAction, updateHeaderTextAction, updateTitleAction} from "../../actions/app";
import {useTranslation} from "react-i18next";
import Books from "../../components/Books";
import {Link} from "react-router-dom";

interface MainProps {
    state: any,
    dispatch: any
}

export function Main(props: MainProps) {
    const {t, i18n} = useTranslation('common');

    useEffect(() => {
        props.dispatch(updateTitleAction('mainPage.header'));
        props.dispatch(updateHeaderTextAction('mainPage.header'));

        if (props.state.appReducer.isMobile) {
            props.dispatch(searchButtonShowAction(true));
        }

    }, [props.state.appReducer.title, props.state.appReducer.headerText])


    return (
        <div>
            <Link to={'/books'}>Books</Link>
            <br/>
            <Link to={'/sections'}>Sections</Link>
            <br/>
            <Link to={'/authors'}>Authors</Link>
        </div>
    );
}

export default connectElem(Main);
