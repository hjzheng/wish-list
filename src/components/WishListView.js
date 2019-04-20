import React from 'react';
import { observer } from 'mobx-react';
import WishListItemView from './WishListItemView';
import TotalProceView from './TotalPriceView';

// TODO: idx should change to uniqueid

const WishListView = ({wishList}) => (
    <div classname="list">
        <ul>{wishList.items.map((item, idx) => <WishListItemView key={idx} item={item} />)}</ul>
        <TotalProceView totolPrice={wishList.totolPrice} />
    </div>
)

export default observer(WishListView);