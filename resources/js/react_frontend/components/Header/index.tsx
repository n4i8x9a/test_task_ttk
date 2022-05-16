import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link as LinkF} from "@fluentui/react";
import {Link} from "react-router-dom";
import {connectElem} from "../../reducers";
import {Icon} from '@fluentui/react/lib/Icon';
import {changeLanguageAction, searchButtonValueAction} from "../../actions/app";
import {Panel} from '@fluentui/react/lib/Panel';
import {Dropdown, IDropdownOption} from '@fluentui/react/lib/Dropdown';


interface HeaderProps {
    state: any,
    dispatch: any
}

function Header(props: HeaderProps) {
    const Languages = [

        {key: 'ru', text: 'Русский'},
        {key: 'en', text: 'English'},

    ];

    const {t, i18n} = useTranslation('common');
    const [homeIcon, setHomeIcon] = useState("Home");
    const [favIcon, setFavIcon] = useState("FavoriteStar");
    const [languagePanel, setLanguagePanel] = useState(false);
    const onChangeLanguage = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {

        props.dispatch(changeLanguageAction(String(item.key)));
    };
    return (
        <>
            <div className={'header'}>
                <div>
                    <h2>{t(props.state.appReducer.headerText)}</h2>
                </div>
                <div className={'navigation'}>
                    {
                        props.state.appReducer.searchButton.button &&
                        <LinkF
                            onClick={() => {
                                props.dispatch(searchButtonValueAction(true))
                            }}>
                            <Icon iconName='Search'
                                  style={{zoom: "140%"}}
                            /></LinkF>
                    }
                    <Link to='/'><Icon
                        style={{zoom: "140%"}}
                        iconName={homeIcon}
                        onMouseEnter={() => setHomeIcon('HomeSolid')}
                        onMouseLeave={() => setHomeIcon('Home')}
                    /></Link>
                    <Link to='/favorites'><Icon iconName={favIcon}
                                                style={{zoom: "140%"}}

                                                onMouseEnter={() => setFavIcon('FavoriteStarFill')}
                                                onMouseLeave={() => setFavIcon('FavoriteStar')}
                    /></Link>

                    <LinkF
                        onClick={() => {
                            setLanguagePanel(true)
                        }}
                    ><Icon iconName={"Globe"}
                           style={{zoom: "140%"}}

                    /></LinkF>

                </div>
            </div>

            <Panel
                headerText={t('chooseLanguage')}
                isOpen={languagePanel}
                onDismiss={() => {
                    setLanguagePanel(false)
                }}
                closeButtonAriaLabel="Close"

            >

                <Dropdown
                    label=""
                    defaultSelectedKey={props.state.appReducer.language}
                    //@ts-ignore
                    onChange={onChangeLanguage}
                    options={Languages}

                />

            </Panel>
        </>
    );
}

export default connectElem(Header);