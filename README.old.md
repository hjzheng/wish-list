# wish-list
react, mobx and mobx-state-tree

step 1: npx create-react-app my-app

step 2: npm install mobx mobx-react mobx-state-tree

step 3: create model in WishList.js and WishList.test.js

step 4: Models in mobx-state-tree are, by default, `read-only. Actions are the only way to modify the properties of a model.`

step 5: snapshot by mobx-state-tree // TODO function ?

step 6: View can defined derived information, we should keep your store as small as possible

step 7: Use mobx-state-tree Models in React

step 8: WishListItemEdit (use mobx-state-tree API -> clone, getSnapshot, applySnapshot)