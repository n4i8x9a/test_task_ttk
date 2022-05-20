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

    const [sortedBooks, setSortedBooks] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    let key = 0;
    let elArr = [];
    //let bookArr = sortedBooks.length === 0 && !isSearch ? props.books : sortedBooks;
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
