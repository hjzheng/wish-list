import React from 'react';
import { observer } from 'mobx-react';
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree';
import WishListItemEdit from './WishListItemEdit';

class WishListItemView extends React.Component {
    state = {
        isEditing: false
    }

    onToggleEdit = () => {
        this.setState({
            isEditing: true,
            clone: clone(this.props.item)
        });
    }

    onCancelEdit = () => {
        this.setState({
            isEditing: false
        });
    }

    onSaveEdit = () => {

        applySnapshot(this.props.item, getSnapshot(this.state.clone))

        this.setState({
            isEditing: false,
            clone: null
        });
    }

    renderEditable() {
        return (
            <li className="item">
                <WishListItemEdit item={this.state.clone} />
                <button title='cancel' onClick={this.onSaveEdit}>S</button>
                <button title='save' onClick={this.onCancelEdit}>X</button>
            </li>
        );
    }

    renderListItem() {
        const {item, readonly} = this.props;
        return (
            <li className="item">
                {item.image && <img src={item.image} />}
                <h3>{item.name}</h3>
                <span>{item.price} RMB</span>
                {!readonly && (
                    <span>
                        <button title='edit' onClick={this.onToggleEdit}>E</button>
                        <button title='remove' onClick={item.remove}>R</button>
                    </span>
                )}
            </li>
        );
    }

    render() {
        return (
            this.state.isEditing ? this.renderEditable() : this.renderListItem()
        )
    }
}

export default observer(WishListItemView);