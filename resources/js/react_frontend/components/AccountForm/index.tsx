import {useTranslation} from "react-i18next";
import React, {useState, useEffect} from "react";
import {PrimaryButton, TextField} from "@fluentui/react";
import {AuthLoginAction} from "../../actions/auth";
import {connectElem} from "../../reducers";


interface AccountFormProps {
    state: any,
    dispatch: any
}

function AccountForm(props: AccountFormProps) {


    const {t, i18n} = useTranslation('common');

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const fetchData = async () => {

        let req = await fetch('/api/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${props.state.authReducer.token}`
            }
        });
        if (req.ok) {
            let response = await req.json();
            return response;
        } else {
            return false;
        }
    }
    useEffect(() => {
        if (props.state.authReducer.authorized) {
            fetchData().then(v => {
                if (v != false) {

                        setEmail(v.user.email);


                        setName(v.user.name);



                        setRole(v.role);



                }
            })
        }
    }, [ props.state.authReducer.authorized]);
    return (
        <div>
            <TextField label="email" value={email} readOnly
            />

            <TextField label="name" readOnly

                       value={name}/>

            <TextField label="role" readOnly

                       value={role}/>


        </div>
    );
}

export default connectElem(AccountForm);
