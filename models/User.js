const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


// create our User model
class User extends Model {
  // instance method to check password property of each user
  checkPassword(PWData) {
      return bcrypt.compareSync(PWData, this.password);
  }
}

// define table columns and their configuration
User.init(
  {
      // define the id column
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      // define the user column
      username: {
          type: DataTypes.STRING,
          allowNull: false
      },
      // define the password column
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              // require a minimum length of 8 characters for the user's password
              len: [8]
          }
      }
  },
  {
      // set up hook functionality
      hooks: {
          async beforeCreate(newUserData) {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
          },
          async beforeUpdate(updatedUserData) {
              updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
              return updatedUserData;
          }
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
  }
);

module.exports = User;