const mongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongoDb.ObjectId;

class User {
    constructor(username, email, cart, _id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = _id ? new ObjectId(_id) : null;
    }

    save() {
        const db = getDb();
        let dbUser;
        if (this._id) {
           dbUser = db.collection('users').updateOne(this, {_id: this._id});
        } else {
            dbUser = db.collection('users').insertOne(this);
        }
        return dbUser.
            then(result => {
                consol.log(result);
            })
            .catch(err => {
                consol.log(err);
            })
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity +1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new ObjectId(product._id), 
                quantity: newQuantity
            });
        }
        const updatedCart = {
            items: updatedCartItems
        } 
        const db = getDb();
        return db.collection('users')
            .updateOne(
                {_id: new ObjectId(this._id)},
                {$set: {cart: updatedCart}
            }
        );
    }

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map(i => {
            return i.productId;
        });
        return db.collection('products')
            .find({_id: {$in: productIds}})
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p, 
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString()
                        }).quantity
                    };
                });
            })
            .catch(err => {
                consol.log(err);
            });
    }

    deleteItemFromCart(productId) {
        const db = getDb();
        const updatedCart = this.cart.items.filter(p => {
            return p.productId.toString() !== productId.toString()
        });
        return db.collection('users')
            .updateOne(
                {_id: this._id},
                {$set: {cart: {items: updatedCart}}}
            );
    }

    addOrder() {
        const db = getDb();
        return this.getCart().then(products => {
            const order = {
                items: products,
                user: {
                    _id: new ObjectId(this._id),
                    name: this.username,
                    email: this.email
                }
            }; 
            return db.collection('orders')
                .insertOne(order);
        })  
           .then(result => {
                this.cart = {items: []};
                return db
                    .collection('users')
                    .updateOne(
                        {_id: this._id},
                        {$set: {cart: {items: []}}}
                    );
            });
    }

    getOrders() {
        const db = getDb();
        return db.collection('orders')
            .find({'user._id': new Object(this._id)})
            .toArray()
            .then(result => {
                console.log(result);
                return result
            });
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users')
            .find({_id: new ObjectId(userId) })
            .next()
            .then(user => {
                console.log(user); 
                return user;
            })
            .catch(err => {
                consol.log(err);
            })
    }
}


// const User = sequelize.define('user',{
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

module.exports = User;
