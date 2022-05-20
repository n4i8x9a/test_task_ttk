import {useTranslation} from "react-i18next";
import React, {useEffect} from "react";
import {searchButtonShowAction, updateHeaderTextAction, updateTitleAction} from "../../actions/app";
import {Redirect} from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import {connectElem} from "../../reducers";
import AccountForm from "../../components/AccountForm";

interface AccountProps {
    state: any,
    dispatch: any
}

export function Account(props: AccountProps) {
    const {t, i18n} = useTranslation('common');

    useEffect(() => {
        props.dispatch(updateTitleAction('accountPage.header'));
        props.dispatch(updateHeaderTextAction('accountPage.header'));

        if (props.state.appReducer.isMobile) {
            props.dispatch(searchButtonShowAction(true));
        }

    }, [props.state.appReducer.title, props.state.appReducer.headerText])


    return <>

            <AccountForm/>


    </>

}

export default connectElem(Account);
