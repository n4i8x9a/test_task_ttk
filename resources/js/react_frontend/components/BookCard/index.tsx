import React, {useState} from 'react';
import {connectElem} from "../../reducers";
import {IconButton, Rating, RatingSize} from '@fluentui/react';
import {Link as LinkRouter} from "react-router-dom";
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
            <img src={ props.book.image} width={100} height={70}></img>
            <div className={'book_info'}>
                <div className={'book_info__'}>
                <Link style={linkStyle} to={`/books/${props.book.id}`}><h3>{props.book.title}</h3></Link>
                </div>
                <div className={'book_info__'}>
                <p><span className={'bold_text'}>{t('mainPage.author')}</span></p>

                <p>{props.book.author.name}</p>
                </div>
                <div className={'book_info__'}>
                    <p><span className={'bold_text'}>{"секция :"}</span></p>

                    <p><LinkRouter to={`/sections/${props.book.section.id}`}>{props.book.section.name}</LinkRouter></p>
                </div>
                <div className={'book_info__'}>
                <p><span className={'bold_text'}>{t('mainPage.year')}</span></p>
                <p>{props.book.year}</p>
                </div>

            </div>


        </div>
    )
}

export default connectElem(BookCard);
