const { Model, DataTypes } = require('sequelize');
const { hash, compare } = require('bcrypt');
const db = require('../db/connection');


class User extends Model { }

User.init({
  email: {
    type: DataTypes.STRING,
    unique: true, // users can't reuse emails when signing up
    allowNull: false,
    validate: {
      isEmail: true // makes sure it is an email
    }
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      min: 6 //here you can create a regular expression to make users include certain things in their passwords like numbers and special chars
    }
  }
}, {
  sequelize: db,
  modelName: 'user',
  hooks: {
    beforeCreate(user) {
      hash(user.password, 10, (err, hash) => {
        if (err) return console.log(err);

        user.password = hash;
      });
    }
  }
});

module.exports = User;