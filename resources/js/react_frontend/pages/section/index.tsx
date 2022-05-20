import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {searchButtonShowAction, updateHeaderTextAction, updateTitleAction} from "../../actions/app";
import {SearchBox} from "@fluentui/react/lib/SearchBox";
import Books from "../../components/Books";
import {connectElem} from "../../reducers";
import {
    useParams, Redirect
} from "react-router-dom";
interface SectionPageProps {
    state: any,
    dispatch: any
}
// @ts-ignore
import Pagination from 'office-ui-fabric-react-pagination';
export function SectionPage(props: SectionPageProps) {
    const {t, i18n} = useTranslation('common');
    let {id}=useParams<{id:string}>();
    const [secName,setSecName]=useState('');
    const [description,setDescription]=useState('');
    const [books, setBooks] = useState([]);
    const [take, setTake] = useState(5);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(true);
    const fetchData = async (take: number, offset: number) => {
        let req = await fetch(`/api/sections/${id}/books`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${props.state.authReducer.token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({take: take, offset: offset})
        });
        if (req.ok) {
            return await req.json();
        }
    }
    useEffect(() => {
        props.dispatch(updateTitleAction('mainPage.header'));
        props.dispatch(updateHeaderTextAction('mainPage.header'));

        if (props.state.appReducer.isMobile) {
            props.dispatch(searchButtonShowAction(true));
        }

    }, [props.state.appReducer.title, props.state.appReducer.headerText])

    useEffect(() => {
        fetchData(take, offset).then(v => {
            setBooks(v.books)
            ;
            setSecName(v.section.name);
            setDescription(v.section.description);
            setCount(v.count);
            setLoading(false);
        })
    }, [offset,take]);
    return (
        <div className={'books_page'}>

            <div className={'books_left'}>

                <h1>{secName}</h1>
                <h3>{description}</h3>
            </div>
            <div className={'books_right'}>

                <Books
                    //@ts-ignore
                    loading={loading}
                    //@ts-ignore
                    books={books}/>
                { count>0 &&
                <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(count / take)}
                    onChange={(pa: number) => {
                        setPage(pa);
                        setLoading(true);
                        fetchData(take, take * (pa - 1)).then(v => {
                            setBooks(v.books)
                            ;
                            setCount(v.count);
                            setSecName(v.section.name);
                            setDescription(v.section.description);
                            setLoading(false);
                        })
                    }}
                />
                }
            </div>

        </div>
    )

}

export default connectElem(SectionPage);
