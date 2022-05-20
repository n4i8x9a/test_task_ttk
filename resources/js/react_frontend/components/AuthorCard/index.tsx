import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {connectElem} from "../../reducers";
import React from "react";

interface AuthorCardProps {
    author: any,
    state: any,
    dispatch: any
}


function AuthorCard(props:AuthorCardProps) {
    const {t, i18n} = useTranslation('common');



    const linkStyle = {color: "rgb(0, 120, 212)", textDecoration: "none"}
    return (
        <div className={'book_card'}>

            <div className={'book_info'}>
                <div className={'book_info__'}>
                    <Link style={linkStyle} to={`/authors/${props.author.id}`}><h3>{props.author.name}</h3></Link>
                </div>

                <div className={'book_info__'}>
                    <p><span className={'bold_text'}>{'country :'}</span></p>
                    <p>{props.author.country}</p>
                </div>

            </div>


        </div>
    )
}

export default connectElem(AuthorCard);
