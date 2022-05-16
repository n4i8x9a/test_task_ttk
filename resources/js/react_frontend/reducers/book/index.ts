const InitialState = {books: []};

export default function bookReducer(state = InitialState, action: any) {
    switch (action.type) {
        case 'INIT':
            return {books: action.payload.books}
        case 'RATING':
            return {books: action.payload.books}
        case 'FAVORITE':
            return {books: action.payload.books}
        default:
            return state
    }
}