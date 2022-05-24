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
import Cookies from "js-cookie";


interface LoginFormProps {
    state: any,
    dispatch: any
}

function LoginForm(props: LoginFormProps) {


    const {t, i18n} = useTranslation('common');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);
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
            Cookies.set('auth_token', response.access_token);
            return {authorized: true, token: response.access_token, userID: response.user.id, role: response.role};
        } else {
            return {authorized: false, token: null, userID: null, role: "guest"};
        }
    }

    const registerRequest = async () => {
        let req = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },
            body: JSON.stringify({"email": email, "password": password, "name": name})
        });
        if (req.ok) {
            let response = await req.json();

            return {success: true};
        } else {
            return {success: false};
        }
    }
    return (
        <div>
            <LinkF onClick={() => {
                setRegister(!register)
                setConfPassword('');
                setName('');
                setPassword('');
                setEmail('');
            }}>{register ? "Sign UP" : "Login"}</LinkF>
            {register ?
                <>
                    <TextField label="name" value={name} onChange={(e, newValue) => {
                        if (typeof newValue == 'string') {
                            setName(newValue);
                        }
                    }}/>
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
                    <TextField label="confirm password"
                               type={'password'}
                               value={confPassword} onChange={(e, newValue) => {
                        if (typeof newValue == 'string') {
                            setConfPassword(newValue);
                        }
                    }}/>

                    <PrimaryButton text="SIGN UP" allowDisabledFocus
                                   disabled={email.length == 0 || name.length < 2 || password.length < 8 || confPassword.length < 8 ||password!==confPassword}
                                   onClick={() => registerRequest().then(v => {
                                       if (v.success) {
                                           setConfPassword('');
                                           setName('');
                                           setPassword('');
                                           setEmail('');
                                           alert("Success register!");
                                       } else {
                                           alert("Not registered!!!!");
                                       }
                                   })}
                    />
                </>
                :
                <>
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

                    <PrimaryButton text="LOGIN"
                                   disabled={email.length==0 ||password.length<8}
                                   onClick={() => {
                        loginRequest().then(value => {
                            if (value.authorized) {
                                props.dispatch(AuthLoginAction(value));
                            }
                        })

                    }} allowDisabledFocus
                    />
                </>
            }
        </div>
    );
}

export default connectElem(LoginForm);
