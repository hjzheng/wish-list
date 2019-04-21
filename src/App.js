import React, { Component } from "react"
import './App.css'
import logo from './asset/ram.jpg'

import WishListView from "./components/WishListView";

class App extends Component {
    state = {
      selectedUser: ''
    }

    onSelectUser = (e) => {
      this.setState({selectedUser: e.target.value});
    }

    render() {
        const { group } = this.props;
        const selectedUser = group.users.get(this.state.selectedUser)
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Wish List</h1>
                </header>
                <select onChange={this.onSelectUser}>
                  <option>- Select user -</option>
                  {Array.from(group.users.values()).map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                  ))}
                </select>
                {selectedUser && <WishListView wishList={selectedUser.wishList} />}
                {selectedUser && <button onClick={selectedUser.getSuggestions}>suggestion</button>}
            </div>
        )
    }
}

export default App