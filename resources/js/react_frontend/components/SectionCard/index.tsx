import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {connectElem} from "../../reducers";
import React from "react";

interface SectionCardProps {
    section: any,
    state: any,
    dispatch: any
}


function SectionCard(props:SectionCardProps) {
    const {t, i18n} = useTranslation('common');



    const linkStyle = {color: "rgb(0, 120, 212)", textDecoration: "none"}
    return (
        <div className={'book_card'}>

            <div className={'book_info'}>
                <div className={'book_info__'}>
                    <Link style={linkStyle} to={`/sections/${props.section.id}`}><h3>{props.section.name}</h3></Link>
                </div>

                <div className={'book_info__'}>
                    <p><span className={'bold_text'}>{'description :'}</span></p>
                    <p>{props.section.description}</p>
                </div>

            </div>


        </div>
    )
}

export default connectElem(SectionCard);
