const { Model, DataTypes } = require('sequelize');
const db = require('../db/connection');

class User extends Model { }

User.init({
  email: {
    type: DataTypes.STRING,
    unique: true, // users can't reuse emails when signing up
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
  modelName: 'user'
});

module.exports = User;