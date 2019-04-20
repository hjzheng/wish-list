import React, { Component } from "react"
import './App.css'
import logo from './asset/ram.jpg'

import WishListView from "./components/WishListView";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Wish List</h1>
                </header>
                <WishListView wishList={this.props.wishList} />
            </div>
        )
    }
}

export default App