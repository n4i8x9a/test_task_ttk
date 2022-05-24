import React, {useState} from "react";
import AuthorCard from "../AuthorCard";
import {connectElem} from "../../reducers";

interface AuthorsProps {
    state: any,
    dispatch: any,
    authors: any,
    loading: boolean
}


function Authors(props: AuthorsProps) {


    let key = 0;
    let elArr = [];
    let authorArr = props.authors;
    for (let author of authorArr) {
        elArr.push(
            // @ts-ignore
            <AuthorCard key={key} author={author}/>
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

export default connectElem(Authors);
