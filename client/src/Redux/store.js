
// en este archivo se crea el store estado global
import { applyMiddleware, legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducer";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";


export const store = legacy_createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));


// utilizamos thunk para hacer acciones con promesas
// const store = legacy_createStore(reducer, applyMiddleware(thunk));


// export default store;