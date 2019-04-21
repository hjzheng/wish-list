import React, { Component } from "react"
import { observer } from 'mobx-react'
import './App.css'
import logo from './asset/ram.jpg'

import WishListView from "./components/WishListView";

const User = observer(({ user }) => (
  <div>
      <WishListView wishList={user.wishList} />
      <button onClick={user.getSuggestions}>Suggestions</button>
      <hr />
      <h2>{user.recipient ? user.recipient.name : ""}</h2>
      {user.recipient && <WishListView wishList={user.recipient.wishList} readonly />}
  </div>
))

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
                <button onClick={group.drawLots}>Draw lots</button>
                {selectedUser && <User user={selectedUser} />}
            </div>
        )
    }
}



export default App