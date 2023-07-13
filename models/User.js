const { Model, DataTypes } = require('sequelize');
const { hash, compare } = require('bcrypt');
const db = require('../db/connection');
const Thought = require('./Thought');


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
    async beforeCreate(user) {
      const hashPassword = await hash(user.password, 10);

      user.password = hashPassword;
    },
  }
});

// De-crypt user hash to compare to login pass
User.prototype.validatePass = async function(formPassword) {
  const isValid = await compare(formPassword, this.password)

  return isValid;
}

User.hasMany(Thought);
Thought.belongsTo(User);

module.exports = User;