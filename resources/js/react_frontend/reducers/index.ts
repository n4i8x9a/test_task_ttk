import bookReducer from "./book";
import {combineReducers} from 'redux'
import {connect} from "react-redux";
import appReducer from "./app";
import authReducer from "./auth";

export default combineReducers({
    bookReducer,
    appReducer,
    authReducer
})


const mapStateToProps = (state: any) => ({
    state: state
});

const mapDispatchToProps = (dispatch: any) => ({
    dispatch
});


export const connectElem = (elem: any) => (connect(
    mapStateToProps,
    mapDispatchToProps
)(elem));
