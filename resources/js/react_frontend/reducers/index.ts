import bookReducer from "./book";
import {combineReducers} from 'redux'
import {connect} from "react-redux";
import appReducer from "./app";

export default combineReducers({
    bookReducer,
    appReducer
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