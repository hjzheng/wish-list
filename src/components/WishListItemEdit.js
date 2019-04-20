import React from 'react';
import { observer } from 'mobx-react';

class WishListItemEdit extends React.Component {
    
    render() {
        const { item } = this.props;
        return (
            <div className="item-edit">
                <div>Things: <input value={item.name} type="text" onChange={this.onNameChange} /></div>
                <div>Price: <input value={item.price} type="text" onChange={this.onPriceChange} /></div>
                <div>Image: <input value={item.image} type="text" onChange={this.onImageChange} /></div>
            </div>
        )
    }

    onNameChange = (e) => {
        this.props.item.changeName(e.target.value);
    }

    onPriceChange = (e) => {
        const price = parseInt(e.target.value);
        if (!isNaN(price)) this.props.item.changePrice(price);
    }

    onImageChange = (e) => {
        this.props.item.changeImage(e.target.value);
    }

}

export default observer(WishListItemEdit);