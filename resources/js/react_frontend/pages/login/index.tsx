import React, {useEffect, useState} from 'react';
import {connectElem} from "../../reducers";
import {searchButtonShowAction, updateHeaderTextAction, updateTitleAction} from "../../actions/app";
import {useTranslation} from "react-i18next";
import Books from "../../components/Books";
import LoginForm from "../../components/LoginForm";
import {Redirect} from 'react-router-dom';

interface LoginProps {
    state: any,
    dispatch: any
}

export function Login(props: LoginProps) {
    const {t, i18n} = useTranslation('common');

    useEffect(() => {
        props.dispatch(updateTitleAction('loginPage.header'));
        props.dispatch(updateHeaderTextAction('loginPage.header'));

        if (props.state.appReducer.isMobile) {
            props.dispatch(searchButtonShowAction(true));
        }

    }, [props.state.appReducer.title, props.state.appReducer.headerText])


    return <>
        {props.state.authReducer.authorized ?
            <Redirect to={'/'}/>
            :
            <LoginForm/>
        }
    </>

}

export default connectElem(Login);
