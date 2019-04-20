import { types } from 'mobx-state-tree';

// const data = {
//     "name": "Chronicles of Narnia Box Set",
//     "price": 28.73,
//     "image": "https://images-na.ssl/....png"
// }

export const WishListItem = types.model('WishListItem', {
    name: types.string,
    price: types.number,
    image: types.optional(types.string, '')
})
.actions(self => ({
    changeName(newName) {
        self.name = newName
    },
    changePrice(newPrice) {
        self.price = newPrice;
    },
    changeImage(newImage) {
        self.image = newImage;
    },
}))

export const WishList = types.model('WishList', {
    items: types.optional(types.array(WishListItem), [])
})
.actions(self => ({
    addItem(item) {
        self.items.push(item);
    }
}))
.views(self => ({
    get totolPrice() {
        return self.items.reduce((sum, item) => sum + item.price, 0);
    }
}))