import { types, destroy, getParent } from 'mobx-state-tree';

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
    remove() {
        getParent(self, 2).remove(self);
    }
}))

export const WishList = types.model('WishList', {
    items: types.optional(types.array(WishListItem), [])
})
.actions(self => ({
    addItem(item) {
        self.items.push(item);
    },
    remove(item) {
        // self.items.splice(self.items.indexOf(item), 1)
        destroy(item);
    }
}))
.views(self => ({
    get totolPrice() {
        return self.items.reduce((sum, item) => sum + item.price, 0);
    }
}))