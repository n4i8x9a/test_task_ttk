interface authData {
    authorized: boolean,
    token: string | null,
    userID: number | null,
    role: string
}

export function AuthInitAction(authData: authData) {

    return {type: "AUTH_INIT", payload: authData};

}


export function AuthLoginAction(authData: authData) {

    return {type: "LOGIN", payload: authData};

}

export function AuthLogoutAction() {

    return {type: "LOGOUT", payload: {authorized: false, token: null, userID: null, role: "guest"}};

}
