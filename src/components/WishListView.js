import React from 'react';
import { observer } from 'mobx-react';
import WishListItemView from './WishListItemView';
import TotalProceView from './TotalPriceView';
import WishListItemEntry from './WishListItemEntry';

// TODO: idx should change to uniqueid

const WishListView = ({wishList}) => (
    <div className="list">
        <ul>{wishList.items.map((item, idx) => <WishListItemView key={idx} item={item} />)}</ul>
        <TotalProceView totolPrice={wishList.totolPrice} />
        <WishListItemEntry items={wishList}/>
    </div>
)

export default observer(WishListView);