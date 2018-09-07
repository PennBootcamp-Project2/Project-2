// const db = require(".")
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
  User.associate = function(models){
    User.belongsToMany(models.Book, { 
        through: 'UserBooks'
    });
}
  return User;
    
  // User.belongsToMany(Book, 
  //   { 
  //     through: UsersBooks,
  //     foreignKey: 'books.id',
  //     otherKey: 'users.id'
  //   } );
};