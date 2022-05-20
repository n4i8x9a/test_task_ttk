import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Main from "./pages/main/";

import './i18n/index'
import Header from "./components/Header/";
import {initializeIcons} from '@fluentui/font-icons-mdl2';
import {createStore} from 'redux'
import reducer from './reducers/index'
import {Provider} from 'react-redux'
import Book from "./pages/book";
import {windowResizeAction} from "./actions/app";
import i18next from "i18next";
import {AuthInitAction} from "./actions/auth";
import Login from "./pages/login/";
import Account from "./pages/account";
import BooksPage from "./pages/books";
import SectionsPage from "./pages/sections";
import SectionPage from "./pages/section";
import AuthorsPage from "./pages/authors";
import AuthorPage from "./pages/author";

export const store = createStore(reducer);


initializeIcons();
i18next
    .init({defaultNS: "common"})
    .then();

interface checkTokenResponse {
    auth: boolean,
    role: string
    user_id: number
}

async function checkToken() {
    let token: any = localStorage.getItem('auth_token');
    if (token == null) {
        return {authorized: false, token: null, userID: null, role: "guest"};
    }
    let req = await fetch('/api/auth/check', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (req.ok) {
        let response: checkTokenResponse = await req.json();
        return {authorized: true, token: token, userID: response.user_id, role: response.role}
    } else {
        localStorage.removeItem('auth_token');
        return {authorized: false, token: null, userID: null, role: "guest"};
    }
}

checkToken().then(value => {
    store.dispatch(AuthInitAction(value));
    console.log(store.getState());
});




function setTitle() {
    if (document.title !== store.getState().appReducer.title) {
        document.title = i18next.t(store.getState().appReducer.title);
    }
}


store.subscribe(setTitle);

window.addEventListener(`resize`, event => {
    store.dispatch(windowResizeAction());
}, false);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <>
                <Router>

                    <Header/>

                    <div className={'content'}>


                        <Switch>
                            <Route exact path="/">
                                <Main/>
                            </Route>

                            <Route exact path="/books/:id">
                                <Book/>
                            </Route>
                            <Route exact path="/sections/:id">
                                <SectionPage/>
                            </Route>
                            <Route exact path="/books">
                                <BooksPage/>
                            </Route>

                            <Route exact path="/sections">
                                <SectionsPage/>
                            </Route>

                            <Route exact path="/authors">
                                <AuthorsPage/>
                            </Route>
                            <Route exact path="/authors/:id">
                                <AuthorPage/>
                            </Route>
                            <Route exact path="/login">
                                {store.getState().authReducer.authorized ?
                                    <Redirect to={'/'}/> :
                                    <Login/>
                                }
                            </Route>

                            <Route exact path="/account">

                                    <Account/>
                            </Route>

                        </Switch>
                    </div>

                </Router>
            </>
        </Provider>
    </React.StrictMode>,
    document.getElementById('react-root')
);



