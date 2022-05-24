import React, {useState} from "react";
import BookCard from "../BookCard";
import {connectElem} from "../../reducers";
import SectionCard from "../SectionCard";

interface SectionsProps {
    state: any,
    dispatch: any,
    sections: any,
    loading:boolean
}


function Sections(props: SectionsProps) {



    let key = 0;
    let elArr = [];
    let secArr=props.sections;
    for (let section of secArr) {
        elArr.push(
            // @ts-ignore
            <SectionCard key={key} section={section}/>
        );
        key++;
    }
    return (
        <>
            <div className={'main_page'}>

                <div className={'cont'}>
                    {props.loading ?
                        <div>Loading</div> :
                        <>
                            {elArr}
                        </>
                    }
                </div>


            </div>
        </>
    );

}

export default connectElem(Sections);
