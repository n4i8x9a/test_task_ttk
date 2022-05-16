import React, {useState} from 'react';
import {connectElem} from "../../reducers";
import {Link, IconButton, Rating, RatingSize} from "@fluentui/react";
import {favoriteAction, ratingAction} from "../../actions/book";
import RatingComponent from "../RatingComponent";
import {useTranslation} from "react-i18next";

interface BookCardProps {
    book: any,
    state: any,
    dispatch: any
}

function BookCardBig(props: BookCardProps) {
    const {t, i18n} = useTranslation('common');

    const starIcon = () => {
        if (props.book.favorites) {
            return 'FavoriteStarFill'
        } else {
            return 'FavoriteStar';
        }
    }


    return <div className={'book_card_big'}>

        <div className={'book_info_big'}>
            <img src={'/data/pictures/' + props.book.picture} width={160} height={240}></img>
            <div className={'text_info'}>

                <h2>{props.book.title}</h2>

                <p><span className={'bold_text'}>{t('mainPage.author')}</span></p>
                <p>{props.book.author}</p>
                <p><span className={'bold_text'}>{t('mainPage.year')}</span></p>
                <p>{props.book.year}</p>
                <p><span className={'bold_text'}>{t('mainPage.publisher')}</span></p>
                <p>{props.book.publisher}</p>
            </div>
            <div className={'book_btns'}>
                <div className={'rating_big'}>
                    <RatingComponent
                        //@ts-ignore
                        book={props.book}/>

                </div>

                <IconButton style={{zoom: "150%"}} iconProps={{iconName: starIcon()}}

                            onClick={() => {
                                props.dispatch(favoriteAction(props.book.id, !props.book.favorites))
                            }}
                />
                <Link href={props.book.file}>{t('bookPage.download')}</Link>
            </div>
        </div>

        <div className={'book_description'}>
            <p>{props.book.description}</p>
        </div>
    </div>
};


export default connectElem(BookCardBig);