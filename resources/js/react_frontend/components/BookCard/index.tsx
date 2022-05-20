import React, {useState} from 'react';
import {connectElem} from "../../reducers";
import {IconButton, Rating, RatingSize} from '@fluentui/react';

import {Link} from "react-router-dom";
//import RatingComponent from "../RatingComponent";
import {useTranslation} from "react-i18next";

interface BookCardProps {
    book: any,
    state: any,
    dispatch: any
}


function BookCard(props: BookCardProps) {
    const {t, i18n} = useTranslation('common');

    const starIcon = () => {
        /*
        if (props.book.favorites) {
            return 'FavoriteStarFill'
        } else {
        */

            return 'FavoriteStar';
        };


    const linkStyle = {color: "rgb(0, 120, 212)", textDecoration: "none"}
    return (
        <div className={'book_card'}>
            <img src={ props.book.image} width={100} height={150}></img>
            <div className={'book_info'}>
                <Link style={linkStyle} to={`/books/${props.book.id}`}><h3>{props.book.title}</h3></Link>
                <p><span className={'bold_text'}>{t('mainPage.author')}</span></p>
                <p>{props.book.author.name}</p>
                <p><span className={'bold_text'}>{t('mainPage.year')}</span></p>
                <p>{props.book.year}</p>

            </div>


        </div>
    )
}

export default connectElem(BookCard);
