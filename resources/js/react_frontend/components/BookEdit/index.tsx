import React, {useEffect, useState} from 'react';
import {connectElem} from "../../reducers";

import {Link as LinkRouter} from "react-router-dom";

import {useTranslation} from "react-i18next";
import {Button, Dropdown, PrimaryButton, TextField} from "@fluentui/react";

interface BookEditProps {
    book?: any,
    state: any,
    dispatch: any,
    callBack: () => any
}


function BookEdit(props: BookEditProps) {
    const {t, i18n} = useTranslation('common');

    const [imBlob, setImblob] = useState(props.book.image);

    const [id, setId] = useState<number>(props.book.id);
    const [title, setTitle] = useState<string>(props.book.title);
    const [year, setYear] = useState<number>(props.book.year);
    const [description, setDescription] = useState<string>(props.book.description);
    const [author, setAuthor] = useState<{ key: number, text: string }>({
        key: props.book.author.id,
        text: props.book.author.name
    });
    const [section, setSection] = useState<{ key: number, text: string }>({
        key: props.book.section.id,
        text: props.book.section.name
    });
    const [authors, setAuthors] = useState<Array<{ key: number, text: string }>>();
    const [sections, setSections] = useState<Array<{ key: number, text: string }>>();
    const [fetched, setFetched] = useState(false);
    const uploadImage = async (img: File) => {
        let formData = new FormData();
        formData.append('id', String(id));
        formData.append('image', img);
        let req = await fetch('/api/books/image', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${props.state.authReducer.token}`,

            },
            body: formData
        });
        if (req.ok) {
            return await req.json();
        }

    }
    const initFetch = async () => {
        let req1 = await fetch('/api/authors/list', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${props.state.authReducer.token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({take: -1, offset: 0})
        });
        let authors = await req1.json();
        authors = authors.authors;
        let req2 = await fetch('/api/sections/list', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${props.state.authReducer.token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({take: -1, offset: 0})
        });
        let sections = await req2.json();
        sections = sections.sections;
        // @ts-ignore
        authors = authors.map((author: object) => {
            return {
                // @ts-ignore
                key: author.id,
                // @ts-ignore
                text: author.name
            }
        });
        // @ts-ignore
        sections = sections.map((section: object) => {
            return {
                // @ts-ignore
                key: section.id,
                // @ts-ignore
                text: section.name
            }
        });
        return {authors: authors, sections: sections};


    }
    const update = async () => {
        let data = {
            id: id,
            title: title,
            year: year,
            author_id: author.key,
            section_id: section.key,
            description: description
        }
        let req = await fetch(`/api/books/`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${props.state.authReducer.token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        });

        if (req.ok) {
            return await req.json();
        }
    }
    useEffect(() => {
        initFetch().then(v => {
            setAuthors(v.authors);
            setSections(v.sections);
            setFetched(true);
        })
    }, [fetched]);
    // @ts-ignore
    return (<>
            <div className={'book_edit'}>
                <div style={{flexDirection: "column", display: "flex"}}>
                    <img src={imBlob} width={160} height={240}></img>
                    <PrimaryButton text={"UPLOAD"}
                                   onClick={() => {
                                       // @ts-ignore
                                       document.getElementById("raised-button-file").click()
                                   }}
                    >
                    </PrimaryButton>
                </div>
                <div>
                    <Dropdown
                        label="Author"
                        // @ts-ignore
                        selectedKey={author}
                        // eslint-disable-next-line react/jsx-no-bind
                        // @ts-ignore
                        onChange={(e, author) => setAuthor(author)}
                        // @ts-ignore
                        placeholder={author.text}
                        // @ts-ignore
                        options={authors}
                        //styles={dropdownStyles}
                    />

                    <Dropdown
                        label="Section"
                        // @ts-ignore
                        selectedKey={section}
                        // eslint-disable-next-line react/jsx-no-bind
                        // @ts-ignore
                        onChange={(e, section) => setSection(section)}
                        // @ts-ignore
                        placeholder={section.text}
                        // @ts-ignore
                        options={sections}
                        //styles={dropdownStyles}
                    />

                    <TextField label="Title"
                               value={title}
                               onChange={(e, titl) => {
                                   // @ts-ignore
                                   setTitle(titl)
                               }}
                    />

                    <TextField label="Year"
                               value={String(year)}
                               onChange={(e, yea) => {
                                   // @ts-ignore
                                   if (yea.match("[0-9]")) {
                                       // @ts-ignore
                                       setYear(Number(yea));
                                   } else {
                                       setYear(0);
                                   }

                               }}
                    />
                </div>
                <TextField label="Description"
                           value={description}
                           multiline
                           rows={5}
                           onChange={(e, descr) => {
                               // @ts-ignore
                               setDescription(descr)
                           }}
                />


                <input
                    accept="image/jpg, image/jpeg, image/png"
                    style={{display: 'none'}}
                    id="raised-button-file"

                    type="file"
                    onChange={(event) => {
                        let files = event.target.files;
                        const reader = new FileReader();
                        reader.addEventListener('load', (event) => {
                            // @ts-ignore
                            setImblob(event.target.result);
                        });
                        // @ts-ignore
                        if (files != null) {
                            if (files[0].size <= 1024 * 500) {
                                uploadImage(files[0]).then(v => {
                                    alert(v)
                                });
                                reader.readAsDataURL(files[0]);
                            }
                        }
                    }}
                />


            </div>
            <div>
                <PrimaryButton text={"UPDATE"} onClick={() => update().then(v => alert(v))}/>
                <PrimaryButton text={"BACK"}
                               onClick={() => {
                                   // @ts-ignore
                                   props.callBack();
                               }}
                >
                </PrimaryButton>
            </div>
        </>
    )

};


export default connectElem(BookEdit);
