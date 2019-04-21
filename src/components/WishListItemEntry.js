import React, { Component } from 'react';
import WishListItemEdit from './WishListItemEdit';
import { WishListItem } from '../model/WishList';

class WishListItemEntry extends Component {
    
    state = {
        entry: WishListItem.create({
            name: '',
            price: 0
        })
    }

    addItem = () => {
        this.props.wishList.addItem(this.state.entry);
        this.setState({
            entry: WishListItem.create({ name: "", price: 0 })
        })
    }

    render() {
        return (
            <div>
                <WishListItemEdit item={this.state.entry} />
                <button title='add' onClick={this.addItem}>Add to List</button>
            </div>
        );
    }
}

export default WishListItemEntry;