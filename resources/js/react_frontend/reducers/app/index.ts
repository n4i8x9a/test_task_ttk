import {isMobile, isTablet} from "react-device-detect";
import i18next from "i18next";

i18next
    .init({defaultNS: "common"})
    .then();
const InitialState = {
    headerText: '', title: '', language: i18next.language,
    windowSize: {width: window.innerWidth, height: window.innerHeight},
    isMobile: isMobile && !isTablet, searchButton: {button: false, panel: false}
};

export default function appReducer(state = InitialState, action: any) {
    switch (action.type) {
        case 'TITLE_UPDATE':
            return {...state, title: action.payload.title}
        case 'HEADER_TEXT_UPDATE':
            return {...state, headerText: action.payload.headerText}

        case 'CHANGE_LANGUAGE':
            return {...state, language: i18next.language}
        case 'SEARCH_BUTTON_SHOW':
            return {...state, searchButton: {button: action.payload.button, panel: state.searchButton.panel}}

        case 'SEARCH_BUTTON_VALUE':
            return {...state, searchButton: {button: state.searchButton.button, panel: action.payload.panel}}
        case 'WINDOW_RESIZE':
            return {...state, windowSize: {width: action.payload.width, height: action.payload.height}}
        default:
            return state
    }
}