import React from 'react';
import ReactDOM from 'react-dom';
import { onSnapshot, getSnapshot } from 'mobx-state-tree';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { WishList } from './model/WishList';

let initState = {
    items: [
        {
            name: 'PS4 Pro',
            price: 2900,
            image: 'https://img13.360buyimg.com/n7/jfs/t16036/67/2094126919/86623/cfc23459/5a8fd450Nc2b99eb2.jpg'
        },
        {
            name: 'Xbox One',
            price: 2800,
            image: 'https://img13.360buyimg.com/n7/jfs/t10279/271/1299114967/61173/303a46ce/59df12b4Nb065f949.jpg'
        },
        {
            name: 'Switch',
            price: 1999,
            image: 'https://img14.360buyimg.com/n7/jfs/t24280/355/809346995/58119/d9407f0e/5b442f74N23caa058.jpg'
        }
    ]
}

if (localStorage.getItem('wishlist')) {
    const json = JSON.parse(localStorage.getItem('wishlist'));
    if (WishList.is(json)) initState = json;
}

let wishList = WishList.create(initState);

onSnapshot(wishList, (snapshot) => {
    localStorage.setItem('wishlist', JSON.stringify(snapshot));
})

function renderApp() {
    ReactDOM.render(<App wishList={wishList} />, document.getElementById('root'));
}

renderApp()

if (module.hot) {
    module.hot.accept(["./App"], () => {
        // new components
        renderApp()
    })

    module.hot.accept(["./model/WishList"], () => {
        // new model definitions
        const snapshot = getSnapshot(wishList)
        wishList = WishList.create(snapshot)
        renderApp()
    })
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
