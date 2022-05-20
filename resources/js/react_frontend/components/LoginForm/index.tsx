import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link as LinkF, PrimaryButton, TextField} from "@fluentui/react";
import {Link} from "react-router-dom";
import {connectElem} from "../../reducers";
import {Icon} from '@fluentui/react/lib/Icon';
import {changeLanguageAction, searchButtonValueAction} from "../../actions/app";
import {Panel} from '@fluentui/react/lib/Panel';
import {Dropdown, IDropdownOption} from '@fluentui/react/lib/Dropdown';
import {AuthLoginAction} from "../../actions/auth";


interface LoginFormProps {
    state: any,
    dispatch: any
}

function LoginForm(props: LoginFormProps) {


    const {t, i18n} = useTranslation('common');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginRequest = async () => {
        let req = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },
            body: JSON.stringify({"email": email, "password": password})
        });
        if (req.ok) {
            let response = await req.json();
            localStorage.setItem('auth_token', response.access_token);
            return {authorized: true, token: response.access_token, userID: response.user.id, role: response.role};
        } else {
            return {authorized: false, token: null, userID: null, role: "guest"};
        }
    }
    return (
        <div>
            <TextField label="email" value={email} onChange={(e, newValue) => {
                if (typeof newValue == 'string') {
                    setEmail(newValue);
                }
            }}/>

            <TextField label="password"
                       type={'password'}
                       value={password} onChange={(e, newValue) => {
                if (typeof newValue == 'string') {
                    setPassword(newValue);
                }
            }}/>

            <PrimaryButton text="LOGIN" onClick={() => {
                loginRequest().then(value => {
                    if (value.authorized) {
                        props.dispatch(AuthLoginAction(value));
                    }
                })

            }} allowDisabledFocus
            />

        </div>
    );
}

export default connectElem(LoginForm);
