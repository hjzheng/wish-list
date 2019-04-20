import { WishListItem, WishList } from './WishList';
import { getSnapshot, onSnapshot, onPatch} from "mobx-state-tree"
import { reaction } from 'mobx';

it('can create WishLisItem', () => {
    const item = WishListItem.create({
        "name": "Chronicles of Narnia Box Set",
        "price": 28.73,
        "image": "https://images-na.ssl/....png"
    })

    expect(item.name).toBe("Chronicles of Narnia Box Set");
    expect(item.price).toBe(28.73);

    item.changeName('Harry Zheng');

    expect(item.name).toBe('Harry Zheng');
})


it('can create WishList', () => {
    const list = WishList.create({
        items: [{
            "name": "Chronicles of Narnia Box Set",
            "price": 28.73,
        }]
    })

    expect(list.items[0].name).toBe("Chronicles of Narnia Box Set");
    expect(list.items.length).toBe(1);
})

it('add new item', () => {
    const list = WishList.create()
    list.addItem(WishListItem.create({
        name: 'Harry Zheng',
        price: 22
    }))

})

it('use getSnapshot', () => {
    const list = WishList.create()
    
    list.addItem(WishListItem.create({
        name: 'Xbox One',
        price: 3600
    }))

    expect(getSnapshot(list)).toEqual({
        items: [{
            name: 'Xbox One',
            price: 3600,
            image: ''
        }]
    })
    
    expect(getSnapshot(list)).toMatchSnapshot()

})

it('use onSnapshot', () => {
    const list = WishList.create()

    const states = []

    onSnapshot(list, snapshot => {
        states.push(snapshot)
    })
    
    list.addItem(WishListItem.create({
        name: 'PS 4',
        price: 2800
    }))

    expect(states).toMatchSnapshot()
})

it("use onPatch", () => {
    const list = WishList.create()
    const patches = []
    onPatch(list, patch => {
        patches.push(patch)
    })

    list.addItem({
        name: "Chesterton",
        price: 10
    })

    list.items[0].changeName("Book of G.K. Chesterton")

    expect(patches).toMatchSnapshot()
})

it('computed total price', () => {
    const list = WishList.create({
        items: [
            {
                name: "PS4",
                price: 2800
            },
            {
                name: "Xbox One with kinect",
                price: 3600
            },
        ]
    })

    expect(list.totolPrice).toBe(6400);

    let change = 0;

    reaction(() => list.totolPrice, () => change++)

    expect(change).toBe(0);

    list.items[0].changePrice(2900);

    expect(change).toBe(1);

    list.items[0].changeName('PS4 Pro');

    expect(change).toBe(1);
})