import React, {useState} from 'react';
import {connectElem} from "../../reducers";
import {Link, IconButton, Rating, RatingSize} from "@fluentui/react";
//import {favoriteAction, ratingAction} from "../../actions/book";
//import RatingComponent from "../RatingComponent";
import {useTranslation} from "react-i18next";

interface BookCardProps {
    book: any,
    state: any,
    dispatch: any
}

function BookCardBig(props: BookCardProps) {
    const {t, i18n} = useTranslation('common');



    return <div className={'book_card_big'}>

        <div className={'book_info_big'}>
            <img src={props.book.image} width={160} height={240}></img>
            <div className={'text_info'}>

                <h2>{props.book.title}</h2>

                <p><span className={'bold_text'}>{t('mainPage.author')}</span></p>
                <p>{props.book.author.name}</p>
                <p><span className={'bold_text'}>{t('mainPage.year')}</span></p>
                <p>{props.book.year}</p>

            </div>

        </div>

        <div className={'book_description'}>
            <p>{props.book.description}</p>
        </div>
    </div>
};


export default connectElem(BookCardBig);
