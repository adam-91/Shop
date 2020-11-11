const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
                quantity: {type: Number, required: true}
            }
        ]
    }
});

userSchema.methods.addToCart = function(product) {
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
            productId: product._id, 
            quantity: newQuantity
        });
    }
    const updatedCart = {
        items: updatedCartItems
    } 
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.removeFromCart = function(productId) {
    const updatedCart = this.cart.items.filter(p => {
        return p.productId.toString() !== productId.toString()
    });
   this.cart.items = updatedCart;
   return this.save();
}

userSchema.methods.clearCart = function() {
    this.cart = {items: []};
    return this.save();
}

module.exports = mongoose.model('User', userSchema);

   
//     static findById(userId) {
//         const db = getDb();
//         return db.collection('users')
//             .find({_id: new ObjectId(userId) })
//             .next()
//             .then(user => {
//                 console.log(user); 
//                 return user;
//             })
//             .catch(err => {
//                 consol.log(err);
//             })
//     }
// }


// // const User = sequelize.define('user',{
// //     id: {
// //         type: Sequelize.INTEGER,
// //         autoIncrement: true,
// //         allowNull: false,
// //         primaryKey: true
// //     },
// //     name: {
// //         type: Sequelize.STRING,
// //         allowNull: false
// //     },
// //     email: {
// //         type: Sequelize.STRING,
// //         allowNull: false
// //     }
// // });

// module.exports = User;
