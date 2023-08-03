import {v4 as uuidv4} from 'uuid';


type Item = {
    id:string
    name: string
    price: number
    description: string
    quantity: number
};

type User = {
    id:string
    name: string
    age: number
    cart: Item[]
};


function createUser(name: string, age:number):User {
    const id = uuidv4();
    const cart: Item[] = [];
    return {id, name, age, cart};
};

function createItem(name: string, price:number, description:string, quantity:number):Item{
    const id = uuidv4();
    return {id, name, price, description, quantity};
};

function addToCart(item: Item, user: User, quantity: number): void {
    const existingItem = user.cart.find((cartItem) => cartItem.id === item.id);
  
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ ...item, quantity });
    }
  };

function removeAllFromCart(item:Item, user:User):void{
    user.cart = user.cart.filter((cartItem) => cartItem.id !== item.id)
}

function removeFromCart(item:Item, user: User, quantity: number): void {
    let count = quantity;
    user.cart = user.cart.filter((cartItem) => {
        if (cartItem.id === item.id) {
        if (count > 0) {
            count-= quantity;
            return false;
        }
        }
        return true;
    });
}

function cartTotal(user: User): number {
    const totalPrice = user.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    console.log(`${user.name}'s total price: $${totalPrice}`);
    return totalPrice;
  }
  
  


function printCart(user: User): void {
    console.log(`${user.name}'s Cart: `)
    user.cart.forEach((item) => {
        console.log(`${item.name} (Quantity: ${item.quantity}, Price: $${item.price*item.quantity})\n`)
    })
}


/////////////////////////////////////////////////////////////
///////// ==> USERS, ITEMS, AND TESTING <== /////////////////
/////////////////////////////////////////////////////////////

const user = createUser("Link", 26)


const itemC = createItem("Apple", 5, 'good for eating, better for cooking, even works as a projectile if needed', 1)
const itemB = createItem("Arrows", 15, 'a bundle of x5 arrows, good for keeping pesky Chuchus at a safe distance', 1)
const itemA = createItem("Hylian Shield", 50, 'a sturdy shield to keep you alive a little longer out there', 1)


addToCart(itemA, user, 1)
printCart(user)
console.log(`${user.name}'s total = $${cartTotal(user)}`)


console.log('')
console.log('=============')
console.log('')

addToCart(itemB, user, 3)
printCart(user)
cartTotal(user)

console.log('')
console.log('=============')
console.log('')

addToCart(itemC, user, 3)
printCart(user)
cartTotal(user)

console.log('')
console.log('=============')
console.log('')

removeAllFromCart(itemB, user)
printCart(user)
cartTotal(user)

console.log('')
console.log('=============')
console.log('')

removeFromCart(itemC, user, 2)
printCart(user)
cartTotal(user)

console.log('')
console.log('=============')
console.log('')



