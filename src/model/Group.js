import { types, flow } from 'mobx-state-tree';
import { WishList } from './WishList';

export const User = types.model({
    id: types.string,
    name: types.string,
    gender: types.enumeration("gender", ["m", "f"]),
    wishList: types.optional(WishList, {})
})
.actions(self => ({
    // async getSuggestions() {
    //     const res = await window.fetch(`http://localhost:3001/suggestion_${self.gender}`)
    //     const suggestions = await res.json()
    //     self.addSuggestions(suggestions);
    // },
    // addSuggestions(items) {
    //     self.wishList.items.push(...items);
    // }
    getSuggestions: flow(function *() {
        const res = yield window.fetch(`http://localhost:3001/suggestion_${self.gender}`)
        const suggestions = yield res.json()
        self.wishList.items.push(...suggestions);
    })
}))

export const Group = types.model({
    users: types.map(User)
})