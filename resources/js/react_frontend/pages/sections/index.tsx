import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {searchButtonShowAction, updateHeaderTextAction, updateTitleAction} from "../../actions/app";
import {SearchBox} from "@fluentui/react/lib/SearchBox";
import Books from "../../components/Books";
import {connectElem} from "../../reducers";
// @ts-ignore
import Pagination from 'office-ui-fabric-react-pagination';
import Sections from "../../components/Sections";
interface SectionsPageProps {
    state: any,
    dispatch: any
}

export function SectionsPage(props: SectionsPageProps) {
    const {t, i18n} = useTranslation('common');
    const [sections, setSections] = useState([]);
    const [take, setTake] = useState(5);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(true);
    const fetchData = async (take: number, offset: number) => {
        let req = await fetch('/api/sections/list', {
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
            setSections(v.sections)
            ;
            setCount(v.count);
            setLoading(false);
        })
    }, [offset,take]);
    return (
        <div className={'books_page'}>

            <div className={'books_left'}>


            </div>
            <div className={'books_right'}>

                <Sections
                    //@ts-ignore
                    loading={loading}
                    //@ts-ignore
                    sections={sections}/>
                { count>0 &&
                <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(count / take)}
                    onChange={(pa: number) => {
                        setPage(pa);
                        setLoading(true);
                        fetchData(take, take * (pa - 1)).then(v => {
                            setSections(v.books)
                            ;
                            setCount(v.count);
                            setLoading(false);
                        })
                    }}
                />
                }
            </div>

        </div>
    )

}

export default connectElem(SectionsPage);
