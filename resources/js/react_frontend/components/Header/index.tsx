import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link as LinkF} from "@fluentui/react";
import {Link} from "react-router-dom";
import {connectElem} from "../../reducers";
import {Icon} from '@fluentui/react/lib/Icon';
import {changeLanguageAction, searchButtonValueAction} from "../../actions/app";
import {Panel} from '@fluentui/react/lib/Panel';
import {Dropdown, IDropdownOption} from '@fluentui/react/lib/Dropdown';
import {AuthLogoutAction} from "../../actions/auth";


interface HeaderProps {
    state: any,
    dispatch: any
}

function Header(props: HeaderProps) {
    const Languages = [

        {key: 'ru', text: 'Русский'},
        {key: 'en', text: 'English'},

    ];
    const signOut = async () => {
        let req = await fetch('/api/auth/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${props.state.authReducer.token}`
            },

        });
        if (req.ok || req.status == 401) {

            localStorage.removeItem('auth_token');
            return true;
        } else {
            return false;
        }
    }
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


                    <LinkF
                        onClick={() => {
                            setLanguagePanel(true)
                        }}
                    ><Icon iconName={"Globe"}
                           style={{zoom: "140%"}}

                    /></LinkF>
                    {
                        props.state.authReducer.authorized ?
                            <>
                            <Link
                                to='/account'
                            ><Icon iconName={"FollowUser"}
                                   style={{zoom: "140%"}}

                            /></Link>
                            <LinkF
                                onClick={() => {
                                    signOut().then(value => {
                                        if (value) {
                                            props.dispatch(AuthLogoutAction());
                                        } else {
                                            alert('can`t logout');
                                        }
                                    })
                                }}
                            ><Icon iconName={"SignOut"}
                                   style={{zoom: "140%"}}

                            /></LinkF> </>:
                            <Link
                                to='/login'
                            ><Icon iconName={"Signin"}
                                   style={{zoom: "140%"}}

                            /></Link>
                    }


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
