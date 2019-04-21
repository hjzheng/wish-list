import React from 'react';
import ReactDOM from 'react-dom';
import { addMiddleware } from 'mobx-state-tree';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Group } from "./model/Group"


let initialState = {
    users: {
        "a342": {
            id: "a342",
            name: "Harry Zheng",
            gender: "f"
        },
        "5fc2": {
            id: "5fc2",
            name: "Song Da Ning",
            gender: "m"
        },
        "663b": {
            id: "663b",
            name: "Xuan Sir",
            gender: "f"
        },
        "65aa": {
            id: "65aa",
            name: "Rick",
            gender: "f"
        },
        "ba32": {
            id: "ba32",
            name: "Morty",
            gender: "f"
        }
    }
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
