const InitialState = {authorized: false, token: null, userID: null, role: "guest"};

export default function authReducer(state = InitialState, action: any) {
    switch (action.type) {
        case 'AUTH_INIT':
            return {...action.payload}
        case 'LOGIN':
            return {...action.payload}
        case 'LOGOUT':
            return {...action.payload}
        case 'TOKEN_EXPIRED':
            return {...action.payload}
        default:
            return state
    }
}
