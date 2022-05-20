import React, {useEffect, useState} from 'react';
import {connectElem} from "../../reducers";
import {Link, IconButton, Rating, RatingSize} from "@fluentui/react";
import {Link as LinkRouter} from "react-router-dom";
//import {favoriteAction, ratingAction} from "../../actions/book";
//import RatingComponent from "../RatingComponent";
import {useTranslation} from "react-i18next";

interface BookCardProps {
    id: string,
    state: any,
    dispatch: any
}

interface bookProps
{
    "id": number,
    "title": string,
    "year": number,
    "description": string,
    "image": string,
    "author_id": number,
    "section_id": number,
    "created_at": string,
    "updated_at": string,
    "user_id": number,
    "visible": true,
    "author": {
        "id": number,
        "name": string,
        "country": string,
        "comment": string,
        "created_at": string,
        "updated_at": string
    },
    "section": {
        "id": number,
        "name": string,
        "description": string,
        "created_at": string,
        "updated_at": string,
        "visible": boolean
    }
}
function BookCardBig(props: BookCardProps) {
    const {t, i18n} = useTranslation('common');

    const [fetched,setFetched]=useState(false);
    const [book,setBook]=useState<bookProps>();
    const fetchData = async () => {
        let req = await fetch(`/api/books/${props.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${props.state.authReducer.token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },

        });
        if (req.ok) {
            return await req.json();
        }
    }
    useEffect(()=>{
        fetchData().then(v=>{

            setBook(v);
            setFetched(true);
        })
    },[fetched]);

    return (
    <>
        { fetched ?
    <div className={'book_card_big'}>

        <div className={'book_info_big'}>
            <img src={book?.image} width={160} height={240}></img>
            <div className={'text_info'}>

                <h2>{book?.title}</h2>

                <p><span className={'bold_text'}>{t('mainPage.author')}</span></p>
                <p>{book?.author.name}</p>
                <p><span className={'bold_text'}>{"section"}</span></p>
                <p><LinkRouter to={`/sections/${book?.section.id}`}>{book?.section.name}</LinkRouter></p>

                <p><span className={'bold_text'}>{t('mainPage.year')}</span></p>
                <p>{book?.year}</p>
                {
                    props.state.authReducer.authorized && (book?.user_id==props.state.authReducer.userID
                        ||props.state.authReducer.role=="admin") &&
                    <div>Can edit</div>
                }

            </div>

        </div>

        <div className={'book_description'}>
            <p>{book?.description}</p>
        </div>
    </div>
            :
            <h3>Loading</h3>
            }
        </> )
};


export default connectElem(BookCardBig);
