const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

class Product {
  constructor(title, price, description, imageURL, _id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageURL = imageURL;
    this._id = _id ? new ObjectId(_id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      dbOperation = db.collection('products')
        .updateOne({_id: (this._id)}, {$set: this} );
    } else {
      
      dbOperation =  db.collection('products')
        .insertOne(this)
    }
    return dbOperation
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products')
    .find()
    .toArray()
    .then(products => {
      return products;
    })
    .catch(err => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products')
      .find({ _id:mongoDb.ObjectId(prodId) })
      .next()
      .then(product => {
        return product
      })
      .catch(err => console.log(err));
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products')
      .deleteOne({_id: new mongoDb.ObjectId(prodId)})
      .then(result => {
        console.log('deleted');
      })
      .catch(err => console.log(err));
  }
}

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageURL: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

//module.exports = Product;