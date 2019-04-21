import { types, flow, applySnapshot, onSnapshot, getSnapshot } from 'mobx-state-tree';
import { WishList } from './WishList';

export const User = types.model({
    id: types.identifier,
    name: types.string,
    gender: types.enumeration("gender", ["m", "f"]),
    wishList: types.optional(WishList, {}),
    recipient: types.maybe(types.reference(types.late(() => User)))
})
.actions(self => ({
    getSuggestions: flow(function *() {
        const res = yield window.fetch(`http://localhost:3001/suggestion_${self.gender}`)
        const suggestions = yield res.json()
        self.wishList.items.push(...suggestions);
    }),
    save: flow(function* save() {
        try {
            yield window.fetch(`http://localhost:3001/users/${self.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(getSnapshot(self))
            })
        } catch (e) {
            console.error("Uh oh, failed to save: ", e)
        }
    }),
    afterCreate() {
        onSnapshot(self, self.save)
    }
}))

export const Group = types.model({
    users: types.map(User)
})
.actions(self => {
    let controller = null;

    return {
        afterCreate() {
            self.load();
        },
        load: flow(function *() {
            controller = window.AbortController && new window.AbortController();
            try {
                const response = yield window.fetch(`http://localhost:3001/users`, {
                    signal: controller && controller.signal
                });
                // self.users = yield response.json();
                const users = yield response.json();
                applySnapshot(self.users, users.reduce((map, user) => ({ ...map, [user.id]: user }), {}))
                console.log("success")
            } catch (e) {
                console.log("aborted", e.name)
            }
        }),
        reload() {
            if (controller) controller.abort()
            self.load()
        },
        beforeDestroy() {
            if (controller) controller.abort()
        },
        drawLots() {
            const allUsers = Array.from(self.users.values())

            // not enough users, bail out
            if (allUsers.length <= 1) return

            // not assigned lots
            let remaining = allUsers.slice();

            allUsers.forEach(user => {
                // edge case: the only person without recipient
                // is the same as the only remaining lot
                // swap lot's with some random other person
                if (remaining.length === 1 && remaining[0] === user) {
                    const swapWith = allUsers[Math.floor(Math.random() * (allUsers.length - 1))]
                    user.recipients = swapWith.recipient
                    swapWith.recipient = self
                } else {
                    while (!user.recipient) {
                        // Pick random lot from remaing list
                        let recipientIdx = Math.floor(Math.random() * remaining.length)

                        // If it is not the current user, assign it as recipient
                        // and remove the lot
                        if (remaining[recipientIdx] !== user) {
                            user.recipient = remaining[recipientIdx]
                            remaining.splice(recipientIdx, 1)
                        }
                    }   
                }
            })
        }   
    }
})