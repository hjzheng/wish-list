import React from 'react';
import { observer } from 'mobx-react';
import WishListItemView from './WishListItemView';
import TotalProceView from './TotalPriceView';
import WishListItemEntry from './WishListItemEntry';

// TODO: idx should change to uniqueid

const WishListView = ({wishList, readonly}) => (
    <div className="list">
        <ul>{wishList.items.map((item, idx) => <WishListItemView readonly={readonly} key={idx} item={item} />)}</ul>
        <TotalProceView totolPrice={wishList.totolPrice} />
        {!readonly && <WishListItemEntry wishList={wishList} />}
    </div>
)

export default observer(WishListView);