import React from 'react';
import ReactDOM from 'react-dom';
import { addMiddleware } from 'mobx-state-tree';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Group } from "./model/Group"


let initialState = {
    users: {}
}

let group = Group.create(initialState);

addMiddleware(group, (call, next) => {
    console.log(`[${call.type}] ${call.name}`)
    next(call)
})

function renderApp() {
    ReactDOM.render(<App group={group} />, document.getElementById('root'));
}

renderApp()


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
