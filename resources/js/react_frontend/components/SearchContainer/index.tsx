import React, {useEffect, useState} from 'react';
import {connectElem} from "../../reducers";
import {isMobile, isTablet} from "react-device-detect";
import {Dropdown, IDropdownOption, IDropdownStyles} from "@fluentui/react/lib/Dropdown";

import {Panel} from "@fluentui/react/lib/Panel";
import {useTranslation} from "react-i18next";
import {useBoolean} from "@fluentui/react-hooks";
import {SearchBox, ISearchBoxStyles} from '@fluentui/react/lib/SearchBox';
import {searchButtonValueAction} from "../../actions/app";


interface searchProps {
    state: any,
    dispatch: any,
    books: any,
    setBooks: (value: [], isSearch: boolean) => any

}

function SearchContainer(props: searchProps) {
    const {t, i18n} = useTranslation('common');
    const [isOpen, {setTrue: openPanel, setFalse: dismissPanel}] = useBoolean(false);
    const dropdownStyles: Partial<IDropdownStyles> = {dropdown: {width: 150}};
    const dropdownStylesMobile: Partial<IDropdownStyles> = {dropdown: {width: 230}};


    const [search, setSearch] = useState('')

    const TitleSort = [

        {key: 'az', text: t('mainPage.az')},
        {key: 'za', text: t('mainPage.za')},
        {key: 'none', text: t('mainPage.noneSort')},

    ];
    const yearsSort = [
        {key: 'asc', text: t('mainPage.asc')},
        {key: 'desc', text: t('mainPage.desc')},
        {key: 'none', text: t('mainPage.noneSort')},

    ]
    const ratingSort = [
        {key: 'asc', text: t('mainPage.asc')},
        {key: 'desc', text: t('mainPage.desc')},
        {key: 'none', text: t('mainPage.noneSort')},

    ]
    const [selectedTitleSort, setSelectedTitleSort] = React.useState<IDropdownOption>(TitleSort[2]);
    const [selectedYearsSort, setSelectedYearsSort] = React.useState<IDropdownOption>(yearsSort[2]);
    const [selectedRatingSort, setSelectedRatingSort] = React.useState<IDropdownOption>(ratingSort[2]);
    const onChangeTitleSort = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {

        setSelectedTitleSort(item);

    };
    const onChangeYearsSort = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {

        setSelectedYearsSort(item);

    };

    const onChangeRatingSort = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {


        setSelectedRatingSort(item);

    };


    let authors = [], publishers = [], years = [];
    for (let book of props.books) {
        if (authors.find((item: any, index: any) => {
            if (item.key === book.author) {
                return true;
            }
        }) === undefined) {
            authors.push({key: book.author, text: book.author})
        }

        if (publishers.find((item: any, index: any) => {
            if (item.key === book.publisher) {
                return true;
            }
        }) === undefined) {
            publishers.push({key: book.publisher, text: book.publisher})
        }

        if (years.find((item: any, index: any) => {
            if (item.key === book.year) {
                return true;
            }
        }) === undefined) {
            years.push({key: book.year, text: book.year})
        }

    }
    const [selectedAuthors, setSelectedAuthors] = React.useState<string[]>([]);
    const [selectedPublishers, setSelectedPublishers] = React.useState<string[]>([]);
    const [selectedYears, setSelectedYears] = React.useState<number[]>([]);

    const onChangeAuthors = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        if (item) {
            setSelectedAuthors(
                item.selected ? [...selectedAuthors, item.key as string] :
                    selectedAuthors.filter(key => key !== item.key),
            );
        }
    };

    const onChangePublishers = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        if (item) {
            setSelectedPublishers(
                item.selected ? [...selectedPublishers, item.key as string] :
                    selectedPublishers.filter(key => key !== item.key),
            );
        }
    };

    const onChangeYears = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        if (item) {
            setSelectedYears(
                item.selected ? [...selectedYears, item.key as number] :
                    selectedYears.filter(key => key !== item.key),
            );
        }
    };

    let bookArr: [] = [];
    for (let book of props.books) {

        if (!(selectedAuthors.length === 0 || selectedAuthors.find((item: any, index: any) => {
            if (item === book.author) {
                return true;
            }
        }) !== undefined)) {
            continue;
        }

        if (!(selectedYears.length === 0 || selectedYears.find((item: any, index: any) => {
            if (item === book.year) {
                return true;
            }
        }) !== undefined)) {
            continue;
        }

        if (!(selectedPublishers.length === 0 || selectedPublishers.find((item: any, index: any) => {
            if (item === book.publisher) {
                return true;
            }
        }) !== undefined)) {
            continue;
        }


        if (!(search === '' || book.title.toLowerCase().includes(search.toLowerCase()))) {

            continue;
        }
        //@ts-ignore
        bookArr.push(book);
    }

    if (selectedTitleSort.key !== 'none') {
        bookArr.sort(function (a: any, b: any) {
            let titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase()
            if (titleA < titleB) {
                return -1
            }
            if (titleA > titleB) {
                return 1
            }
            return 0
        })

        if (selectedTitleSort.key === 'za') {
            bookArr.reverse();
        }
    }

    if (selectedYearsSort.key !== 'none') {
        bookArr.sort(function (a: any, b: any) {
            return a.year - b.year;
        })

        if (selectedYearsSort.key === 'desc') {
            bookArr.reverse();
        }
    }

    if (selectedRatingSort.key !== 'none') {
        bookArr.sort(function (a: any, b: any) {
            return a.rating - b.rating;
        })

        if (selectedRatingSort.key === 'desc') {
            bookArr.reverse();
        }
    }

    useEffect(() => {
        //@ts-ignore
        props.setBooks(bookArr, search.length > 0);
    }, [selectedYears, selectedAuthors, selectedPublishers,
        selectedRatingSort, selectedYearsSort, selectedTitleSort, search])


    return <>

        {

            !isMobile || isTablet ?
                <div className={'search_box'}>

                    <SearchBox placeholder={t('mainPage.search')}
                               value={search}
                               onChange={(event, newValue) => {
                                   setSearch(String(newValue))
                               }}

                               onSearch={newValue => setSearch(newValue)}/>
                    <div className={'philters_box'}>
                        <Dropdown
                            style={{margin: "1% 0.5%"}}
                            label={t('mainPage.authorsPhilter')}
                            selectedKeys={selectedAuthors}
                            // eslint-disable-next-line react/jsx-no-bind
                            // @ts-ignore
                            onChange={onChangeAuthors}
                            multiSelect
                            options={authors}
                            styles={dropdownStyles}

                        />

                        <Dropdown
                            style={{margin: "1% 0.5%"}}
                            label={t('mainPage.publishersPhilter')}
                            selectedKeys={selectedPublishers}
                            // eslint-disable-next-line react/jsx-no-bind
                            // @ts-ignore
                            onChange={onChangePublishers}
                            multiSelect
                            options={publishers}
                            styles={dropdownStyles}


                        />

                        <Dropdown
                            style={{margin: "1% 0.5%"}}
                            label={t('mainPage.yearsPhilter')}
                            selectedKeys={selectedYears}
                            // eslint-disable-next-line react/jsx-no-bind
                            // @ts-ignore
                            onChange={onChangeYears}
                            multiSelect
                            options={years}
                            styles={dropdownStyles}


                        />


                        <Dropdown
                            style={{margin: "1% 0.5%"}}
                            label={t('mainPage.titleSort')}
                            selectedKey={selectedTitleSort ? selectedTitleSort.key : undefined}
                            // eslint-disable-next-line react/jsx-no-bind
                            // @ts-ignore
                            onChange={onChangeTitleSort}
                            options={TitleSort}
                            styles={dropdownStyles}

                        />
                        <Dropdown
                            style={{margin: "1% 0.5%"}}
                            label={t('mainPage.yearsSort')}
                            selectedKey={selectedYearsSort ? selectedYearsSort.key : undefined}
                            // eslint-disable-next-line react/jsx-no-bind
                            // @ts-ignore
                            onChange={onChangeYearsSort}
                            options={yearsSort}
                            styles={dropdownStyles}

                        />

                        <Dropdown
                            style={{margin: "1% 0.5%"}}
                            label={t('mainPage.ratingSort')}
                            selectedKey={selectedRatingSort ? selectedRatingSort.key : undefined}
                            // eslint-disable-next-line react/jsx-no-bind
                            // @ts-ignore
                            onChange={onChangeRatingSort}
                            options={ratingSort}
                            styles={dropdownStyles}

                        />
                    </div>
                </div> :
                <>

                    <Panel
                        headerText={t('mainPage.search')}
                        isOpen={props.state.appReducer.searchButton.panel}
                        onDismiss={() => {
                            props.dispatch(searchButtonValueAction(false))
                        }}
                        closeButtonAriaLabel="Close"
                    >
                        <div className={'search_box'}
                             style={{borderBottom: "none", background: "white", justifyContent: "center"}}>

                            <SearchBox

                                placeholder={t('mainPage.search')}
                                value={search}
                                onChange={(event, newValue) => {
                                    setSearch(String(newValue))
                                }}
                                onSearch={newValue => {
                                    setSearch(newValue)
                                }}/>
                            <div className={'philters_box'} style={{background: "white", justifyContent: "center"}}>
                                <Dropdown
                                    style={{margin: "1% 0.5%"}}
                                    label={t('mainPage.authorsPhilter')}
                                    selectedKeys={selectedAuthors}
                                    // eslint-disable-next-line react/jsx-no-bind
                                    // @ts-ignore
                                    onChange={onChangeAuthors}
                                    multiSelect
                                    options={authors}
                                    styles={dropdownStylesMobile}

                                />

                                <Dropdown
                                    style={{margin: "1% 0.5%"}}
                                    //placeholder={t('mainPage.publishersPhilter')}
                                    label={t('mainPage.publishersPhilter')}
                                    selectedKeys={selectedPublishers}
                                    // eslint-disable-next-line react/jsx-no-bind
                                    // @ts-ignore
                                    onChange={onChangePublishers}
                                    multiSelect
                                    options={publishers}
                                    styles={dropdownStylesMobile}


                                />

                                <Dropdown
                                    style={{margin: "1% 0.5%"}}
                                    label={t('mainPage.yearsPhilter')}
                                    selectedKeys={selectedYears}
                                    // eslint-disable-next-line react/jsx-no-bind
                                    // @ts-ignore
                                    onChange={onChangeYears}
                                    multiSelect
                                    options={years}
                                    styles={dropdownStylesMobile}


                                />


                                <Dropdown
                                    style={{margin: "1% 0.5%"}}
                                    label={t('mainPage.titleSort')}
                                    selectedKey={selectedTitleSort ? selectedTitleSort.key : undefined}
                                    // eslint-disable-next-line react/jsx-no-bind
                                    // @ts-ignore
                                    onChange={onChangeTitleSort}
                                    options={TitleSort}
                                    styles={dropdownStylesMobile}

                                />
                                <Dropdown
                                    style={{margin: "1% 0.5%"}}
                                    label={t('mainPage.yearsSort')}
                                    selectedKey={selectedYearsSort ? selectedYearsSort.key : undefined}
                                    // eslint-disable-next-line react/jsx-no-bind
                                    // @ts-ignore
                                    onChange={onChangeYearsSort}
                                    options={yearsSort}
                                    styles={dropdownStylesMobile}

                                />

                                <Dropdown
                                    style={{margin: "1% 0.5%"}}
                                    label={t('mainPage.ratingSort')}
                                    selectedKey={selectedRatingSort ? selectedRatingSort.key : undefined}
                                    // eslint-disable-next-line react/jsx-no-bind
                                    // @ts-ignore
                                    onChange={onChangeRatingSort}
                                    options={ratingSort}
                                    styles={dropdownStylesMobile}

                                />
                            </div>
                        </div>
                    </Panel>
                </>
        }


    </>
}

export default connectElem(SearchContainer);